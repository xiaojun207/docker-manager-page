import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get'
    // params: { token }
  })
}

export function getUserList() {
  return request({
    url: '/user/userList',
    method: 'get'
    // params: { token }
  })
}

export function changeStatus(data) {
  return request({
    url: '/user/changeStatus',
    method: 'post',
    data
  })
}

export function addUser(data) {
  return request({
    url: '/user/addUser',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/user/deleteUser',
    method: 'post',
    data
  })
}

export function alterPassword(data) {
  return request({
    url: '/user/alterPassword',
    method: 'post',
    data
  })
}

export function resetPassword(data) {
  return request({
    url: '/user/resetPassword',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function forgetPassword(data) {
  return request({
    url: '/user/forgetPassword',
    method: 'post',
    data
  })
}
