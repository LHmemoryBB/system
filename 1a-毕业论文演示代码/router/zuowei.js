const express = require('express');
// 引入express的Router模块
const router = express.Router();

const zuoweiHandler = require('../router-hanlder/zuowei')


// 添加
router.post('/add', zuoweiHandler.add);
// 删除
// zuoweiHandler.del
router.post('/remove', zuoweiHandler.del);
// 所有座位
router.get('/getall', zuoweiHandler.getAll)

module.exports = router;