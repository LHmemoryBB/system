const { date } = require("joi");
const db = require("../db/index");

//获取预约记录
exports.getSeatYuYueJILU = function (req, res) {
  let userid = req.query.userid;
  const seatid = req.query.seatId;
  let sql = "";
  if (userid) {
    sql = "SELECT * FROM reservations WHERE user_id = " + userid;
  } else if (seatid) {
    sql = "SELECT * FROM reservations WHERE seat_id = " + seatid  + ' ORDER BY start_time';
  } else {
    res.cc({ status: 0, message: "缺少查询条件" });
  }
  console.log(sql);
  db.query(sql, (err, results) => {
    console.log(results, "查询数据");
    if (err) {
      return res.cc(err);
    }
    res.send({ status: 0, message: "获取记录成功！", data: results });
  });
};

//获取座位信息
exports.getSeatInfo = function (req, res) {
  console.log(req.query);
  let floor = req.query.floor;
  const sql = "SELECT * FROM seats WHERE floor = " + floor;
  db.query(sql, (err, results) => {
    if (err) {
      return res.cc(err);
    }
    res.send({ status: 0, message: "获取座位信息成功！", data: results });
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
//定时更新(座位状态)
exports.checkReservationsInterval = setInterval(() => {
  const sql =
    "SELECT * FROM reservations WHERE reservation_status = 3 AND reservation_date <= NOW()";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("定时任务查询失败:", err);
      return;
    }
    results.forEach((reservation) => {
      // 更新座位状态
      const seatUpdateSql = "UPDATE seats SET status=2 WHERE id=?";
      db.query(seatUpdateSql, [reservation.seat_id], (err, seatResults) => {
        if (err) {
          console.error("更新座位状态失败:", err);
          return;
        }
        if (seatResults.affectedRows !== 1) {
          console.error("更新座位状态失败，受影响行数不正确");
          return;
        }
        //console.log('座位状态更新成功');
      });
    });
  });
}, 1000); // 每隔60000毫秒（即1分钟）执行一次；1000就是1秒

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

//插入预约信息
exports.insertreservation = function (req, res) {
  console.log(req.body);
  const sql =
    "INSERT INTO reservations SET seat_id=?,start_time=?,end_time=?,user_id=?,reservation_status=3 ";
  db.query(
    sql,
    [req.body.seat_id, req.body.startTime, req.body.endTime, req.auth.id],
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
};

//获取申请人信息
exports.getapplicantinfo = function (req, res) {
  //在reservation表里面根据user_id获取申请人信息，还有座位信息
  const sql =
    "SELECT reservations.*,ev_users.nickname,ev_users.email,ev_users.studentId FROM reservations JOIN ev_users ON reservations.user_id=ev_users.id JOIN seats ON reservations.seat_id=seats.id WHERE reservations.reservation_status=1";
  db.query(sql, (err, results) => {
    if (err) {
      return res.cc(err);
    }
    if (results.length === 0) {
      return res.send({ status: 0, message: "获取申请人信息成功", data: null });
    }
    res.send({ status: 0, message: "获取申请人信息成功！", data: results });
  });
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
    if (results.affectedRows !== 1) {
      return res.cc("取消失败！");
    }
    res.send({ status: 0, message: "取消成功" });
  });
};

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
