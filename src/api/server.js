import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/mgr/servers',
    method: 'get',
    params
  })
}

export function getServerNames(params) {
  return request({
    url: '/mgr/serverNames',
    method: 'get',
    params
  })
}

export function refreshContainerList(data) {
  return request({
    url: '/mgr/containers/update',
    method: 'post',
    data
  })
}

export function refreshContainerStats(data) {
  return request({
    url: '/mgr/stats/update',
    method: 'post',
    data
  })
}
