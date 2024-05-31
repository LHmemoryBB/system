const db = require('../db/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

//登录系统
exports.login = function (req, res) {
  const userInfo = req.body;
  console.log('发送的数据:', { username: userInfo.username, password: userInfo.password });
  const sql = 'SELECT username,password FROM admin WHERE username=?';
  if (!userInfo.username || !userInfo.password) {
    return res.send({ status: 1, message: "用户名或者密码不能为空！" });

  }
  db.query(sql, userInfo.username, (err, results) => {
    if (err) {
      return res.send({ status: 1, message: err.message });

    }
    console.log(userInfo.username)
    if (results.length !== 1) {
      return res.send({ status: 1, message: "用户名不存在！" });
    }

    // 判断密码是否正确
    // const compareResult = bcrypt.compareSync(userInfo.password, results[0].password);
    if (userInfo.password != results[0].password) {
      return res.send({ status: 1, message: "密码错误！" });
    }

    // 剔除密码和头像
    const user = { ...results[0], password: '', user_pic: '' };
    // 生成token字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })

    res.send({ status: 0, message: "登录成功！", token: 'Bearer ' + tokenStr });
  });
}

//更新全部用户
exports.getUserAll = (req, res) => {
  const sql = 'select username,password FROM admin'

  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取全部用户成功',
      data: results
    })
  })
}