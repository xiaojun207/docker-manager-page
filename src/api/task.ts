import request from '@/utils/system/request'

export function getTasks(params:any) {
  return request({
    url: '/mgr/tasks',
    method: 'get',
    params
  })
}

export function delTask(data:any) {
  return request({
    url: '/mgr/task/del',
    method: 'post',
    data
  })
}
