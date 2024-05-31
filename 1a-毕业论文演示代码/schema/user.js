const joi = require('joi');
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
const username = joi.string().min(1).max(20).required()
const email = joi.string().pattern(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).required()
const nickname = joi.string().required()
const studentid = joi.string().required()
const major = joi.string().required()
const classn = joi.string().required()

exports.reg_login_schema = {
    body: {
        password,
        username,
        email,
        nickname,
        studentid,
        major,
        classn
    }
}
