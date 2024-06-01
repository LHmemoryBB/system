import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

export function delUser(data) {
  return request({
    url: '/api/delUser?id='+ data.id,
    method: 'get',
  })
}

// /seat/refuse
export function refuse(data) {
  return request({
    url: '/seat/refuse',
    method: 'post',
    data
  })
}

// 通过 /seat/accept
export function accept(data) {
  return request({
    url: '/seat/accept',
    method: 'post',
    data
  })
}

// /seat/applicantinfo
export function getBox(data) {
  console.log(data);
  return request({
    url: '/seat/applicantinfo',
    method: 'post',
    data
  })
}

// 获取全部用户
export function getUser() {
  return request({
    url: '/api/getuserall',
    method: 'get'
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
    url: '/seat/seatinfo?floor='+ param.floor,
    method: 'get'
  })
}
// 获取座位号
export function cancelAppointment(param) {
  return request({
    url: '/seat/cancelAppointment?id='+ param.id,
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


// 添加座位
export function addzuowei(data) {
  return request({
    url: '/zuowei/add?floor='+ data.floor,
    method: 'get'
  })
}

// 添加座位
export function delzuowei(data) {
  return request({
    url: '/zuowei/remove',
    method: 'post',
    data
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
