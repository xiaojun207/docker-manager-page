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

export function alterPassword(data) {
  return request({
    url: '/user/alterPassword',
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
