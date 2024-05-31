const express = require('express');
// 引入express的Router模块
const router = express.Router();
// 引入用户处理模块
const userHandler = require('../router-hanlder/admin');



// 管理员登录
router.post('/login', userHandler.login);
// 获取全部用户信息
router.get('/getuserall', userHandler.getUserAll)

module.exports = router;