const db = require('../db/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

// 注册用户函数
exports.regUser = function (req, res) {
    const userInfo = req.body;
    console.log('发送的数据:', { username: userInfo.username, password: userInfo.password, email: userInfo.email, nickname: userInfo.nickname, studentid: userInfo.studentid, major: userInfo.major, class: userInfo.classn });
    const sql = 'SELECT * FROM ev_users WHERE studentid=?';

    // 密码用户名不为空
    if (!userInfo.username || !userInfo.password) {
        return res.send({
            status: 1,
            message: '用户名或者密码不能为空！'
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

        const insertSql = 'INSERT INTO ev_users SET ?';

        db.query(insertSql, { username: userInfo.username, password: userInfo.password, email: userInfo.email, nickname: userInfo.nickname, studentid: userInfo.studentid, major: userInfo.major, class: userInfo.classn }, (err, results) => {
            if (err) {
                return res.send({ status: 1, message: err.message });
            }

            if (results.affectedRows !== 1) {
                return res.send({ status: 1, message: "注册失败，请稍后重试！" });
            }

            res.send({ status: 0, message: "注册成功", success: true });
        });
    });
};

//登录系统
exports.login = function (req, res) {
    const userInfo = req.body;
    console.log('发送的数据:', { username: userInfo.username, password: userInfo.password });
    const sql = 'SELECT * FROM ev_users WHERE username=?';
    if (!userInfo.username || !userInfo.password) {
        return res.send({ status: 1, message: "用户名或者密码不能为空！" });
    }

    db.query(sql, userInfo.username, (err, results) => {
        if (err) {
            return res.send({ status: 1, message: err.message });
        }

        if (results.length !== 1) {
            return res.send({ status: 1, message: "用户名不存在！" });
        }

        // 判断密码是否正确
        const compareResult = bcrypt.compareSync(userInfo.password, results[0].password);
        if (!compareResult) {
            return res.send({ status: 1, message: "密码错误！" });
        }

        // 剔除密码和头像
        const user = { ...results[0], password: '', user_pic: '' };
        // 生成token字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })

        res.send({ status: 0, message: "登录成功！", token: 'Bearer ' + tokenStr, userid: results[0].id });
    });
}

//更新全部用户
exports.getUserAll = (req, res) => {
    const sql = 'select id,username,nickname,email,studentid,class,major from ev_users'

    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取全部用户成功',
            data: results
        })
    })
}

