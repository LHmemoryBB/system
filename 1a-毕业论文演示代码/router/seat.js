const express = require('express');
const seat_handler = require('../router-hanlder/seat');
const router = express.Router();


//获取座位信息
router.get('/getyuyuejilu', seat_handler.getSeatYuYueJILU)

//获取座位信息
router.get('/seatinfo', seat_handler.getSeatInfo)
router.get('/seatList', seat_handler.getSeatList)
//更新座位信息
router.post('/updateseat', seat_handler.updateSeatInfo)

//取消预约
router.get('/cancelAppointment', seat_handler.cancelAppointment)


// 首页统计
router.get('/seatStatistic', seat_handler.seatStatistic)
router.get('/reserveDays', seat_handler.reserveDays)
//获取预约信息
router.get('/reservation', seat_handler.getreservation)
//更新预约信息
router.post('/insertreservation', seat_handler.insertreservation)
//根据id获取预约信息
router.post('/reservationbyid', seat_handler.getreservationbyid)
//获取申请人信息
router.post('/applicantinfo', seat_handler.getapplicantinfo)
//拒绝申请
router.post('/refuse', seat_handler.refuse)
//接受申请
router.post('/accept', seat_handler.accept)
module.exports = router;
