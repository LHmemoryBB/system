const express = require("express");
const userRouter = require("./router/user");
const userinfoRouter = require("./router/userinfo");
const seatRouter = require("./router/seat");
const adminRouter = require("./router/admin");
const db = require("./db/index");
const joi = require("joi");
const app = express();
const config = require("./config");
const { expressjwt: expressJWT } = require("express-jwt");
const path = require("path");

const bodyParser = require("body-parser");

const zuoweiRouter = require("./router/zuowei");
const sendEmail = require("./router/emailSender");

//配置解析表单数据的中间件
app.use(bodyParser.urlencoded({ extended: false }));
//配置解析json数据的中间件
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.cc = function (err, status = 1) {
    // console.log(3333)
    res.send({ status, message: err instanceof Error ? err.message : err });
  };
  next();
});

//cors 解决跨域问题
const cors = require("cors");
app.use(cors());

//配置token验证中间件当访问/api或/public或'/'开头的接口时，不会执行该中间件

app.use(
  expressJWT({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({
    path: [/^\/api/, /^\/public/, /^\/$/, /^\/adm/, /^\/admin/],
  })
);

//启动路由
app.use("/adm", adminRouter);
app.use("/api", userRouter);
app.use("/my", userinfoRouter);
app.use("/seat", seatRouter);
app.use("/zuowei", zuoweiRouter);

//配置前台路由
app.get("/", function (req, res) {
  // console.log("Received request for root path"); // 添加调试信息
  res.redirect(301, "/public/login/index.html"); // 使用 301 状态码
});

// 错误中间件
app.use(function (err, req, res, next) {
  if (err instanceof joi.ValidationError) {
    return res.cc(err);
  }
  if (err.name === "UnauthorizedError") {
    return res.cc("身份认证失败！", 9);
  }
  res.cc(err);
});

// 启动服务器

// 提前十分钟邮件通知
function checkStatus(seatId, status, callback) {
  db.query(
    "SELECT * FROM reservations WHERE end_time BETWEEN NOW() + INTERVAL 10 MINUTE AND NOW() + INTERVAL 20 MINUTE;",
    null,
    (error, results) => {
      // console.log(results);
      if (results.length > 0) {
        results.forEach((item) => {
          if (item.reservation_status == 3) {
            db.query(
              "SELECT * FROM ev_users WHERE studentid=?",
              [item.studentid],
              (err, res) => {
                if (res.length > 0) {
                  res.forEach((item) => {
                    const mailOptions = {
                      to: item.email,
                      subject: "温馨提示",
                      html: `<p>亲爱的同学：</p>
                    <p>您的座位时间即将到期，请您注意休息，劳逸结合哟</p>
                    <p>如果需要续约，请前往控制中心</p>
                    <p>祝您使用愉快！🥰</p>`,
                    };
                    sendEmail(mailOptions);
                  });
                }
              }
            );
          }
        });
      }
    }
  );
}
setInterval(() => {
  checkStatus();
}, 1000 * 60 * 5);

function updateSeatStatus(seatId, status, callback) {
  db.query(
    "UPDATE seats SET status = ? WHERE id = ?",
    [status, seatId],
    callback
  );
}

// 定时检查设置座位状态
function checkReservations(seatId, callback) {
  db.query(
    "SELECT reservation_status FROM reservations WHERE seat_id = ?",
    [seatId],
    (error, results) => {
      if (error) return callback(error);

      let status = 0;
      // some方法--至少有一条数据满足条件
      if (results.some((res) => res.reservation_status === 4)) {
        status = 2;
      } else if (results.some((res) => res.reservation_status === 3)) {
        status = 1;
      }
      callback(null, status);
    }
  );
}

//设置预约状态和座位状态
setInterval(() => {
  checkUserReserve();
}, 1000 * 5 * 60);

//定时检查座位预约状态到时间自动设置为占座
function checkUserReserve() {
  try {
    const sql =
    "UPDATE reservations SET reservation_status = 4 WHERE start_time < NOW() AND NOW() < end_time AND reservation_status = 3;";
  db.query(sql, (err, res) => {
    const sql2 =
      "UPDATE reservations SET reservation_status = 1 WHERE end_time < NOW() AND reservation_status = 4;";
    db.query(sql2, (err, res) => {
      console.log(err, res);
      db.query("SELECT id FROM seats", (error, seats) => {
        console.log(2222);
        if (error) {
          console.error("Error fetching seats:", error);
          return;
        }
        let completed = 0;
        seats.forEach((seat) => {
          checkReservations(seat.id, (error, status) => {
            if (error) {
              console.error(
                "Error checking reservations for seat:",
                seat.id,
                error
              );
              return;
            }
            updateSeatStatus(seat.id, status, (error) => {
              if (error) {
                console.error(
                  "Error updating seat status for seat:",
                  seat.id,
                  error
                );
              }
              completed++;
              if (completed === seats.length) {
                // console.log("Seat statuses updated successfully.");
              }
            });
          });
        });
      });
    });
  });
  } catch (error) {
    console.log(error, '执行过程中遇到错误');
  }
}

app.listen(5050, function () {
  console.log("api listening on port on http://localhost:5050");
});
