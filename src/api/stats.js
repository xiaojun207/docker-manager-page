import request from '@/utils/request'

export function getStatsList(params) {
  return request({
    url: '/mgr/stats/list',
    method: 'get',
    params
  })
}

export function getStats(params) {
  return request({
    url: '/mgr/stats/detail',
    method: 'get',
    params
  })
}
