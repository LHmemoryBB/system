const express = require('express');
// 引入express的Router模块
const router = express.Router();
// 引入用户处理模块
const userHandler = require('../router-hanlder/user');
// 引入express-joi模块
const expressJoi = require('@escook/express-joi')
// 引入用户注册的schema
const { reg_login_schema } = require('../schema/user')
// 注册
router.post('/reguser', expressJoi(reg_login_schema), userHandler.regUser);

// 登录
router.post('/login', userHandler.login);
// 获取全部用户信息
router.get('/getuserall', userHandler.getUserAll)

module.exports = router;