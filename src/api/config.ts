import request from '@/utils/system/request'

export function getConfig() {
  return request({
    url: '/mgr/config',
    method: 'get'
  })
}

export function updateConfig(data) {
  return request({
    url: '/mgr/config/update',
    method: 'post',
    data
  })
}

export function getWhiteList() {
  return request({
    url: '/mgr/config/whiteList',
    method: 'get'
  })
}

export function deleteWhiteIp(data) {
  return request({
    url: '/mgr/config/deleteWhiteIp',
    method: 'post',
    data
  })
}

export function addWhiteIp(data) {
  return request({
    url: '/mgr/config/addWhiteIp',
    method: 'post',
    data
  })
}

export function getForbiddenList() {
  return request({
    url: '/base/forbidden/log',
    method: 'get'
  })
}
