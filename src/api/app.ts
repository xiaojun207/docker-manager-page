import request from '@/utils/system/request'

export function getAppGroup(params:any) {
  return request({
    url: '/mgr/app/group',
    method: 'get',
    params
  })
}

export function saveApp(data:any) {
  return request({
    url: '/mgr/app/group/saveApp',
    method: 'post',
    data
  })
}

export function delGroup(data:any) {
  return request({
    url: '/mgr/app/group/del',
    method: 'post',
    data
  })
}

export function getAppList(params:any) {
  return request({
    url: '/mgr/app/list',
    method: 'get',
    params
  })
}

export function delApp(data:any) {
  return request({
    url: '/mgr/app/del',
    method: 'post',
    data
  })
}

export function updateApp(data:any) {
  return request({
    url: '/mgr/app/update',
    method: 'post',
    data
  })
}
