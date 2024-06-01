const db = require('../db/index');
const bcrypt = require("bcryptjs");

//获取用户id
//更新个人用户
exports.getUserInfo = (req, res) => {
    const sql = 'select id,username,nickname,email,studentId,class,major from ev_users where id=?';
    db.query(sql, req.auth.id, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('获取用户信息失败！')
        res.send({
            status: 0,
            message: '获取用户信息成功！',
            data: results[0]
        })
    })
}


//获取管理员
//更新管理员账户
exports.getUserInfoAdmin = (req, res) => {
    const sql = 'select id,username,password from admin where id=?';
    db.query(sql, req.auth.id, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('获取用户信息失败！')
        res.send({
            status: 0,
            message: '获取用户信息成功！',
            data: results[0]
        })
    })
}
// 更新用户信息
exports.updateUserInfo = (req, res) => {
    console.log(req.body);
    const sql = 'UPDATE ev_users SET ? WHERE id = ?';
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) return res.send({ status: 1, message: err.message })
        if (results.affectedRows !== 1) return res.send({ status: 1, message: '更新用户信息失败！' })
        res.send({ status: 0, message: '更新用户信息成功！' })
    });
}



//管理员更新用户信息
exports.adminUpdateUserInfo = (req, res) => {
    const sql = 'update ev_users set ? where id=?';
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) return res.send({ status: 1, message: err.message })
        if (results.affectedRows !== 1) return res.send({ status: 1, message: '更新用户信息失败！' })
        res.send({ status: 0, message: '更新用户信息成功！' })
    });
}
//管理员删除用户信息
exports.admindeleteuser = (req, res) => {
    const sql = 'delete from ev_users where id=?'
    db.query(sql, req.body.id, (err, results) => {
        if (err)
            return res.send({ status: 1, message: err.message })
        res.send({ status: 0, message: '删除用户成功' })
    })
}

//重置密码
exports.resetPassword = (req, res) => {
    console.log(req.query);
    const newPassword = bcrypt.hashSync('123456', 10);
    let sql = "UPDATE ev_users SET password = ? WHERE id = ?";
    db.query(sql, [newPassword, req.query.id], (err, results) => {
        if (err) return res.send({ status: 1, message: err.message })
        res.send({ status: 0, message: '重置密码成功' })
    })
}

// 更新密码
exports.updatePassword = (req, res) => {
    const sql = 'select * from ev_users where id=?';
    db.query(sql, req.auth.id, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('用户不存在！');
        console.log(req.body);
        const compareResult = require('bcryptjs').compareSync(req.body.oldPwd, results[0].password);

        if (!compareResult) return res.cc('原密码错误！');
        const sql = 'update ev_users set password=? where id=?';
        const newPwd = require('bcryptjs').hashSync(req.body.newPwd, 10);
        db.query(sql, [newPwd, req.auth.id], (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows !== 1) return res.cc('更新密码失败！');
            res.send({ status: 0, message: '更新密码成功！' })
        })
    })
}

//我的预约
exports.myReservation = (req, res) => {
    const sql = 'select * from reservations where user_id=?';
    db.query(sql, req.auth.id, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('获取预约信息失败！')
        res.send({
            status: 0,
            message: '获取预约信息成功！',
            data: results[0]
        })
    })
}
//取消预约
exports.cancelReservation = (req, res) => {
        //更新座位信息
        const sql = 'update reservations set status=2 where id=?';
        db.query(sql, req.body.id, (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows !== 1) return res.cc('更新座位信息失败！')
            res.send({
                status: 0,
                message: '取消预约成功！',
            })
        })
}

