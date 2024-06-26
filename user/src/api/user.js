import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}
export function regUser(data) {
  return request({
    url: '/api/regUser',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getInfo() {
  return request({
    url: '/my/userinfo',
    method: 'get'
  })
}



// 获取座位号
export function getSeat(param) {
  return request({
    url: '/seat/seatinfo?floor='+ param.floor + '&time='+ param.time,
    method: 'get'
  })
}
// 座位号获取座位预约信息
export function getSeatInfo(param) {
  return request({
    url: '/seat/seatinfo?id='+ param.id,
    method: 'get'
  })
}

// 修改用户信息
export function setUser(data) {
  return request({
    url: '/my/updateUserInfo',
    method: 'post',
    data
  })
}
// 更改密码第一步
export function forgetPassword(data) {
  return request({
    url: '/api/forgot-password',
    method: 'post',
    data
  })
}
// 更改密码第二步
export function changePassword(data) {
  return request({
    url: '/api/change-password',
    method: 'post',
    data
  })
}

// 预约
export function setSeat(data) {
  return request({
    url: '/seat/insertreservation',
    method: 'post',
    data
  })
}

// 修改密码
export function setPassword(data) {
  return request({
    url: '/my/updatePwd',
    method: 'post',
    data
  })
}


// 重置密码
export function resetPassword(param) {
  return request({
    url: '/my/reset-password?id=' + param.userid,
    method: 'get'
  })
}
// 所有预约记录
export function getSeatReserveList(param) {
  return request({
    url: '/seat/getyuyuejilu?seatId=' + param.seatId,
    method: 'get'
  })
}
// 取消预约
export function cancelAppointment(param) {
  return request({
    url: '/seat/cancelAppointment?id=' + param.id,
    method: 'get'
  })
}
// 取消预约
export function seatStatistic(param) {
  return request({
    url: '/seat/seatStatistic',
    method: 'get'
  })
}
export function reserveDays(param) {
  return request({
    url: '/seat/reserveDays',
    method: 'get'
  })
}

// 所有预约记录
export function getList() {
  return request({
    url: '/seat/getyuyuejilu?userid=' + sessionStorage.getItem('userId'),
    method: 'get'
  })
}

// 登出
export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
