const db = require("../db/index");

//获取预约记录
exports.getSeatYuYueJILU = function (req, res) {
  let userid = req.query.userid;
  const seatid = req.query.seatId;
  let sql = "";
  if (userid) {
    sql = "SELECT * FROM reservations WHERE user_id = " + userid;
  } else if (seatid) {
    sql =
      "SELECT * FROM reservations WHERE seat_id = " +
      seatid +
      "  AND reservation_status IN (3, 4) ORDER BY start_time;";
  } else {
    res.cc({ status: 0, message: "缺少查询条件" });
  }
  db.query(sql, (err, results) => {
    if (err) {
      return res.cc(err);
    }
    res.send({ status: 0, message: "获取记录成功！", data: results });
  });
};

//获取座位信息
exports.getSeatInfo = function (req, res) {
  console.log(222);
  let floor = req.query.floor;
  let date = req.query.time;
  const startTime = `${date} 00:00:00`;
  const endTime = `${date} 23:59:59`;
  const seatStatuses = [];
  const promiseList = [];
  const sql = "SELECT * FROM seats WHERE floor = ? ";
  // if (time) {
  //   sql += 'AND start_time >= ? AND start_time <= ?'
  // }
  db.query(sql, floor, (err, results) => {
    if (err) {
      return res.cc(err);
    }
    results.forEach((seat) => {
      const promises = new Promise((resolve, reject) => {
        const seatId = seat.id;
        // 查询reservation_status等于3或4的记录
        const query = `
        SELECT *
        FROM reservations
        WHERE seat_id = ? AND start_time >= ? AND start_time <= ? AND reservation_status IN (3, 4)
      `;
        db.query(query, [seatId, startTime, endTime], (error, results2) => {
          if (error) {
            console.log(error, "baocuo");
          }
          let status = 0;
          if (results2.some((row) => row.reservation_status == 3)) {
            status = 1;
          } else if (results2.some((row) => row.reservation_status == 4)) {
            status = 2;
          }
          resolve({
            id: seatId,
            status: status,
          });
        });
      });
      promiseList.push(promises);
      // 默认状态为0
    });

    Promise.all(promiseList).then((result3) => {
      console.log(result3);
      // console.log(res);
      res.send({ status: 0, message: "获取座位信息成功！", data: result3 });
    }).catch(error =>{
      res.send({ status: 1, message: "获取座位信息失败！"});
    });
    // res.send({ status: 0, message: "获取座位信息成功！", data: results });
  });
};
//更新座位信息(座位状态)
exports.updateSeatInfo = function (req, res) {
  const sql = "UPDATE seats SET status=? WHERE id=?";
  db.query(sql, [req.body.status, req.body.id], (err, results) => {
    if (err) {
      return res.cc(err);
    }
    if (results.affectedRows !== 1) {
      return res.cc("更新座位信息失败！");
    }

    res.send({ status: 0, message: "更新座位信息成功！" });
  });
};

//获取预约信息
exports.getreservation = function (req, res) {
  //获取预约信息和预约的用户信息和座位的状态
  const sql =
    "SELECT reservations.*,ev_users.nickname,seats.status FROM reservations JOIN ev_users ON reservations.user_id=ev_users.id JOIN seats ON reservations.seat_id=seats.id";
  db.query(sql, (err, results) => {
    if (err) {
      return res.cc(err);
    }
    //console.log('预约信息=》', results)
    res.send({ status: 0, message: "获取预约信息成功！", data: results });
  });
};

//根据id获取预约信息
exports.getreservationbyid = function (req, res) {
  const sql = "SELECT * FROM seats WHERE id=?";
  db.query(sql, req.body.id, (err, results) => {
    if (err) {
      return res.cc(err);
    }
    if (results.length === 0) {
      return res.send({ status: 0, message: "获取预约成功", data: null });
    }
    res.send({ status: 0, message: "获取预约信息成功！", data: results });
  });
};

function hasOverlap(period1, period2) {
  return (
    period1.start_time < period2.end_time &&
    period1.end_time > period2.start_time
  );
}

//插入预约信息
exports.insertreservation = function (req, res) {
  const sql2 =
    "SELECT * FROM reservations WHERE seat_id = ? AND reservation_status = 3 ORDER BY start_time DESC LIMIT 1;";
  db.query(sql2, req.body.seat_id, (err, res1) => {
    const target = {
      start_time: req.body.startTime,
      end_time: req.body.endTime,
    };
    if (res1.length > 0) {
      const hasIntersection = res1.some((period) => hasOverlap(period, target));
      if (hasIntersection) {
        res.send({
          stauts: 1,
          message: "该时间段已被预约",
        });
      }
    }
    const sql =
      "INSERT INTO reservations SET seat_id=?,start_time=?,end_time=?,user_id=?,studentid=?,nickname=?,reservation_status=3 ";
    db.query(
      sql,
      [
        req.body.seat_id,
        req.body.startTime,
        req.body.endTime,
        req.auth.id,
        req.auth.studentid,
        req.auth.nickname,
      ],
      (err, results) => {
        if (err) {
          return res.cc(err);
        }
        if (results.affectedRows !== 1) {
          return res.cc("预约失败！");
        }
        const sql = "UPDATE seats SET status=1 WHERE id=?";
        db.query(sql, [req.body.seat_id], (err, results) => {
          if (err) {
            return res.cc(err);
          }
          if (results.affectedRows !== 1) {
            return res.cc("预约失败");
          }
          res.send({ status: 0, message: "预约成功！", data: results });
        });
      }
    );
  });
};

//获取预约记录列表
exports.getapplicantinfo = function (req, res) {
  const { page = 1, size = 10, reservation_status, studentid } = req.body;
  const offset = (page - 1) * size;

  let query = "SELECT * FROM reservations WHERE 1=1";
  let countQuery = "SELECT COUNT(*) as total FROM reservations WHERE 1=1";
  let queryParams = [];

  // 可选搜索条件
  if (reservation_status) {
    query += " AND reservation_status = ?";
    countQuery += " AND reservation_status = ?";
    queryParams.push(reservation_status);
  }

  if (studentid) {
    query += " AND studentid = ?";
    countQuery += " AND studentid = ?";
    queryParams.push(studentid);
  }

  query += " ORDER BY start_time LIMIT ? OFFSET ?";
  queryParams.push(parseInt(size), parseInt(offset));

  // 查询总数
  db.query(
    countQuery,
    queryParams.slice(0, queryParams.length - 2),
    (countError, countResults) => {
      if (countError) {
        console.error("Error executing count query:", countError);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      const total = countResults[0].total;

      // 查询分页数据
      db.query(query, queryParams, (error, results) => {
        if (error) {
          console.error("Error executing query:", error);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }

        res.json({
          page: parseInt(page),
          size: parseInt(size),
          total: total,
          data: results,
        });
      });
    }
  );
};

//拒绝申请
exports.refuse = function (req, res) {
  const sql = "UPDATE reservations SET reservation_status=2 WHERE user_id=?";
  db.query(sql, req.body.user_id, (err, results) => {
    if (err) {
      return res.cc(err);
    }
    if (results.affectedRows !== 1) {
      return res.cc("拒绝失败！");
    }
    res.send({ status: 0, message: "拒绝成功！" });
  });
};
//拒绝申请
exports.cancelAppointment = function (req, res) {
  const sql = "UPDATE reservations SET reservation_status=2 WHERE id=?";
  db.query(sql, req.query.id, (err, results) => {
    if (err) {
      return res.cc(err);
    }
    console.log(results, "12312312312312");
    if (results.affectedRows !== 1) {
      return res.cc("取消失败！");
    }
    // const sql = 'select * from reservations where'
    getReservationsById(req.query.id, (error, reservations) => {
      if (error) {
        console.error("Error fetching reservations:", error);
      } else {
        res.send({ status: 0, message: "取消成功" });
      }
    });
  });
};
function getReservationsById(id, callback) {
  // 先查找指定 id 的 seat_id
  db.query(
    "SELECT seat_id FROM reservations WHERE id = ?",
    [id],
    (error, results) => {
      if (error) return callback(error);

      if (results.length === 0) {
        return callback(
          new Error("No reservations found with the provided id.")
        );
      }

      const seatId = results[0].seat_id;

      // 使用获取到的 seat_id 查找所有相关的 reservations
      db.query(
        "SELECT * FROM reservations WHERE seat_id = ?",
        [seatId],
        (error, reservations) => {
          if (error) return callback(error);

          // 判断 reservations 数组中所有的 reservation_status 是否都不等于 3 并且不等于 4
          const allStatusesValid = reservations.every(
            (res) =>
              res.reservation_status !== 3 && res.reservation_status !== 4
          );

          if (allStatusesValid) {
            // 更新 seats 表中对应的 status 为 0
            db.query(
              "UPDATE seats SET status = 0 WHERE id = ?",
              [seatId],
              (error) => {
                if (error) return callback(error);
                callback(null, { message: "Seat status updated to 0" });
              }
            );
          } else {
            callback(null, { message: "No update needed" });
          }
        }
      );
    }
  );
}

//接受申请
exports.accept = function (req, res) {
  const sql = "UPDATE reservations SET reservation_status=3 WHERE user_id=?"; //reservation_status=3是通过
  db.query(sql, [req.body.user_id], (err, results) => {
    if (err) {
      return res.cc(err);
    }
    if (results.affectedRows !== 1) {
      return res.cc("接受失败！");
    }
    //如果时长为负数,就是占用座位，把座位状态改成2
    if (req.body.reservation_date === 9999) {
      const sql = "UPDATE seats SET status=2 WHERE id=?";
      db.query(sql, [req.body.seat_id], (err, results) => {
        if (err) {
          return res.cc(err);
        }
        if (results.affectedRows !== 1) {
          return res.cc("接受失败！");
        }
      });
    } else {
      const sql = "UPDATE seats SET status=1 WHERE id=?";
      db.query(sql, [req.body.seat_id], (err, results) => {
        if (err) {
          return res.cc(err);
        }
        if (results.affectedRows !== 1) {
          return res.cc("接受失败！");
        }
      });
    }
    res.send({ status: 0, message: "接受成功！" });
  });
};

//统计座位状态
exports.seatStatistic = function (req, res) {
  /**
   * 子查询：每个 SELECT COUNT(*) 是一个子查询，计算特定条件下的座位数。
    联合查询 (JOIN)：使用 LEFT JOIN 将 seats 表和 reservations 表连接起来，通过座位的 id 和预订的 seat_id 进行关联。
    最新状态：通过子查询获取每个座位的最新预订状态 (MAX(reservation_status))，并将其作为 latest_status。
   */
  const query = `
  SELECT 
      (SELECT COUNT(*) 
       FROM seats s
       LEFT JOIN (
           SELECT seat_id, MAX(reservation_status) AS latest_status
           FROM reservations
           GROUP BY seat_id
       ) r ON s.id = r.seat_id
       WHERE r.latest_status IS NULL OR r.latest_status NOT IN (3, 4)
      ) AS free_seats,
      
      (SELECT COUNT(*) 
       FROM seats s
       LEFT JOIN (
           SELECT seat_id, MAX(reservation_status) AS latest_status
           FROM reservations
           GROUP BY seat_id
       ) r ON s.id = r.seat_id
       WHERE r.latest_status = 3
      ) AS reserved_seats,
      
      (SELECT COUNT(*) 
       FROM seats s
       LEFT JOIN (
           SELECT seat_id, MAX(reservation_status) AS latest_status
           FROM reservations
           GROUP BY seat_id
       ) r ON s.id = r.seat_id
       WHERE r.latest_status = 4
      ) AS occupied_seats;
`;
  db.query(query, (error, results) => {
    if (error) {
      console.error("Query error: " + error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    res.send({
      status: 0,
      data: [
        results[0].free_seats,
        results[0].reserved_seats,
        results[0].occupied_seats,
      ], // 空闲，已预约，占用
    });
  });
};

//查询7天的预约数
exports.reserveDays = function (req, res) {
  const query = `
  SELECT 
  s.floor, 
  DATE(r.start_time) AS date, 
  COUNT(r.id) AS reservation_count
FROM 
  reservations r
JOIN 
  seats s ON r.seat_id = s.id
WHERE 
  r.start_time >= CURDATE() - INTERVAL 3 DAY
  AND r.start_time < CURDATE() + INTERVAL 4 DAY
GROUP BY 
  s.floor, DATE(r.start_time)
ORDER BY 
  s.floor, DATE(r.start_time);
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error("Query error: " + error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    const floors = [...new Set(results.map((row) => row.floor))];

    const data = floors.map((floor) => {
      const arr = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - 2 + i);
        const dateString = date.toISOString().split("T")[0];
        const reservation = results.find(
          (row) => row.floor === floor && row.date === dateString
        );
        return reservation ? reservation.reservation_count : 0;
      });
      return arr;
    });

    res.send({ status: 0, data: data });
  });
};
