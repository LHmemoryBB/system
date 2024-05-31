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
  console.log("Received request for root path"); // 添加调试信息
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

app.listen(5050, function () {
  console.log("api listening on port on http://localhost:5050");
  // 定时任务，每隔 5 分钟清理过期的预约记录
  setInterval(() => {
    const now = new Date();
    const sql = "select * FROM reservations";
    db.query(sql, (err, results) => {
      if (err) return console.log(err.message);
      if (results.length === 0) return;
      else {
        results.forEach((res) => {
            console.log(res);
          const reservationEnd = new Date(res.end_time);
        //   reservationEnd.setHours(
        //     reservationEnd.getHours() + parseInt(res.reservation_time)
        //   );
          if (now > reservationEnd) {
            // 这个预约已经过期了
            // console.log(`预约已过期：${res.end_time}`);
            // 在这里加入你的过期记录处理逻辑
            const sql = "UPDATE reservations SET reservation_status = 1 WHERE id = ?";
            db.query(sql, res.id, (err, results) => {
                // console.log(results);
              if (err) return console.log("修改座位状态失败：" + err.message);
              if (results.affectedRows === 0)
                return console.log("修改座位状态失败");
              else {
                // console.log("已经将座位状态改为1");
              }
            });
          } else {
            // 这个预约还未过期
            // console.log(
            //   `预约未过期：${res.end_time} seat_id:${res.seat_id}`
            // );
          }
        });
      }
    });
  }, 1000 * 60 * 5);
});
