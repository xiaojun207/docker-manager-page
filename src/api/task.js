import request from '@/utils/request'

export function getTasks(params) {
  return request({
    'url': '/mgr/tasks',
    'method': 'get',
    params
  })
}

export function delTask(data) {
  return request({
    'url': '/mgr/task/del',
    'method': 'post',
    data
  })
}
