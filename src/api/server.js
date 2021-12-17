import request from '@/utils/request'


export function getServerList(params) {
  return request({
    url: '/mgr/server/list',
    method: 'get',
    params
  })
}

export function getServerNames(params) {
  return request({
    url: '/mgr/server/names',
    method: 'get',
    params
  })
}

export function getServer(params) {
  return request({
    url: '/mgr/server/detail',
    method: 'get',
    params
  })
}
