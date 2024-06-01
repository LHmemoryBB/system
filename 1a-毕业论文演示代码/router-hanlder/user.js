const db = require("../db/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const sendEmail = require("../router/emailSender");
const { expressjwt } = require("express-jwt");
let verificationCodes = {};
// 注册用户函数
exports.regUser = function (req, res) {
  const userInfo = req.body;
  console.log("发送的数据:", {
    username: userInfo.username,
    password: userInfo.password,
    email: userInfo.email,
    nickname: userInfo.nickname,
    studentid: userInfo.studentid,
    major: userInfo.major,
    class: userInfo.classn,
  });
  const sql = "SELECT * FROM ev_users WHERE studentid=?";

  // 密码用户名不为空
  if (!userInfo.username || !userInfo.password) {
    return res.send({
      status: 1,
      message: "用户名或者密码不能为空！",
    });
  }

  db.query(sql, userInfo.studentid, (err, results) => {
    if (err) {
      return res.send({ status: 1, message: err.message });
    }

    if (results.length > 0) {
      return res.send({ status: 1, message: "学号已经存在！" });
    }

    // 调用bcryptjs对密码加密(使用md5：每次生成的值是一样的，一些网站可以破解。使用bcryptjs：每次生成的值是不一样的)
    userInfo.password = bcrypt.hashSync(userInfo.password, 10);

    const insertSql = "INSERT INTO ev_users SET ?";

    db.query(
      insertSql,
      {
        username: userInfo.username,
        password: userInfo.password,
        email: userInfo.email,
        nickname: userInfo.nickname,
        studentid: userInfo.studentid,
        major: userInfo.major,
        class: userInfo.classn,
      },
      (err, results) => {
        if (err) {
          return res.send({ status: 1, message: err.message });
        }

        if (results.affectedRows !== 1) {
          return res.send({ status: 1, message: "注册失败，请稍后重试！" });
        }

        res.send({ status: 0, message: "注册成功", success: true });
      }
    );
  });
};

//登录系统
exports.login = function (req, res) {
  const userInfo = req.body;
  const sql = "SELECT * FROM ev_users WHERE studentid=?";
  if (!userInfo.studentid || !userInfo.password) {
    return res.send({ status: 1, message: "用户名或者密码不能为空！" });
  }

  db.query(sql, userInfo.studentid, (err, results) => {
    if (err) {
      return res.send({ status: 1, message: err.message });
    }
    console.log(results);
    if (results.length !== 1) {
      return res.send({ status: 1, message: "学号不存在！" });
    }

    // 判断密码是否正确
    const compareResult = bcrypt.compareSync(
      userInfo.password,
      results[0].password
    );
    if (!compareResult) {
      return res.send({ status: 1, message: "密码错误！" });
    }

    // 剔除密码和头像
    const user = { ...results[0], password: "", user_pic: "" };
    // 生成token字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: config.expiresIn,
    });

    res.send({
      status: 0,
      message: "登录成功！",
      token: "Bearer " + tokenStr,
      userid: results[0].id,
    });
  });
};

//更新全部用户
exports.getUserAll = (req, res) => {
  const sql =
    "select id,username,nickname,email,studentid,class,major from ev_users";

  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: "获取全部用户成功",
      data: results,
    });
  });
};

//根据id删除用户
exports.delUser = (req, res) => {
  const sql = "DELETE FROM ev_users WHERE id = ?";

  db.query(sql, req.query.id, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: "删除成功",
      data: results,
    });
  });
};

// 忘记密码，找回密码 1.发送邮件验证码
exports.forgotPassword = async (req, res) => {
  const { email, studentid } = req.body;
  const sql = "SELECT * FROM ev_users WHERE studentid = ? AND email = ?;";
  db.query(sql, [studentid, email], async (error, results) => {
    console.log(results);
    if (error || results.length == 0) {
      console.log(error);
      res.send({
        status: 1,
        message: "系统不存在此学号，请前往注册",
      });
    } else if (results.length > 0) {
      const generatedCode = generateVerificationCode(); // 生成验证码
      const currentTime = Date.now();
      verificationCodes[email] = {
        storedCode: generatedCode,
        timestamp: currentTime,
      };
      const mailOptions = {
        to: email,
        subject: "修改密码",
        html: `<p>尊敬的用户：</p>
              <p>您好！您收到这封邮件是因为您请求了重置密码。重置密码的验证码为：</p>
              <h1 style="text-align:center">${generatedCode}</h1>
              <p>如果您没有请求重置密码，请忽略此邮件。</p>
              <p>祝您使用愉快！</p>`,
      };
      sendEmail(mailOptions).then(()=>{
        res.send({
          status: 0,
          message: "邮件发送成功，请前往邮箱查收",
        });
      }).catch(()=>{
        res.send({
          status: 1,
          message: "发送邮件失败，请检查邮箱或联系管理员",
        });
      })
      // console.log(mailRes);
      // if (mailRes.success) {
        
      // } else {
        
      // }
    }
  });
};

// 忘记密码，找回密码 2.验证   验证码
exports.changePassword = async (req, res) => {
  const { email, code } = req.body;
  const storedData = verificationCodes[email];
  console.log(storedData);
  if (!storedData) {
    return res.send({
      status: 1,
      message: "状态码无效",
    });
  }

  const { storedCode, timestamp } = storedData;
  const currentTime = Date.now();
  const tenMinutes = 10 * 60 * 1000;

  if (currentTime - timestamp > tenMinutes) {
    return res.send({
      status: 1,
      message: "状态码过期",
    });
  }
  if (code == storedCode) {
    // 验证码验证成功
    const { studentid } = req.body;
    const newPassword = bcrypt.hashSync(req.body.newPassword, 10);
    let sql = "UPDATE ev_users SET password = ? WHERE studentid = ?";
    db.query(sql, [newPassword, studentid], (error, results) => {
      if (error) {
      } else {
        res.send({
          status: 0,
          message: "验证码验证成功，密码已更改。",
        });
      }
    });

    delete verificationCodes[email]; // 验证成功后删除验证码
  } else {
    res.status(400).send("验证码不正确。");
  }
};

// 生成验证码
function generateVerificationCode() {
  const min = 100000; // 最小值（包含）
  const max = 999999; // 最大值（包含）
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
