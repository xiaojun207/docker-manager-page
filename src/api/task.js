import request from '@/utils/request'

export function getTasks(params) {
  return request({
    'url': '/mgr/tasks',
    'method': 'get',
    params
  })
}
