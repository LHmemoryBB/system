const express = require('express');
const userinfo_handler = require('../router-hanlder/userinfo');
const router = express.Router();

// 获取用户信息
router.get('/userinfo', userinfo_handler.getUserInfo)
// 获取管理员的信息
router.get('/userinfoadmin', userinfo_handler.getUserInfoAdmin)

// 更新用户信息
router.post('/updateUserInfo', userinfo_handler.updateUserInfo)

// 更新密码
router.post('/updatepwd', userinfo_handler.updatePassword)
//我的预约
router.get('/reservation', userinfo_handler.myReservation)
//取消预约
router.post('/cancelreservation', userinfo_handler.cancelReservation)
//管理员更新用户信息
router.post('/adminupdateuserinfo', userinfo_handler.adminUpdateUserInfo)
//管理员删除用户信息
router.post('/admindeleteuser', userinfo_handler.admindeleteuser)

//重置密码
router.get('/reset-password', userinfo_handler.resetPassword)
module.exports = router;
