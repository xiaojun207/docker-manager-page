import request from '@/utils/request'

export function getStatsList(params) {
  return request({
    url: '/mgr/stats',
    method: 'get',
    params
  })
}
