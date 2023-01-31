import request from '@/utils/system/request'

export function getStatsList(params:any) {
  return request({
    url: '/mgr/stats/list',
    method: 'get',
    params
  })
}

export function getStats(params:any) {
  return request({
    url: '/mgr/stats/detail',
    method: 'get',
    params
  })
}
