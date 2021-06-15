import request from '@/utils/request'

export function getTasks() {
  return request({
    'url': '/mgr/tasks',
    'method': 'get'
  })
}
