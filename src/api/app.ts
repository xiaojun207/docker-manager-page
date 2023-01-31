import request from '@/utils/system/request'

export function getAppGroup(params) {
  return request({
    url: '/mgr/app/group',
    method: 'get',
    params
  })
}

export function saveApp(data) {
  return request({
    url: '/mgr/app/group/saveApp',
    method: 'post',
    data
  })
}

export function delGroup(data) {
  return request({
    url: '/mgr/app/group/del',
    method: 'post',
    data
  })
}

export function getAppList(params) {
  return request({
    url: '/mgr/app/list',
    method: 'get',
    params
  })
}

export function delApp(data) {
  return request({
    url: '/mgr/app/del',
    method: 'post',
    data
  })
}

export function updateApp(data) {
  return request({
    url: '/mgr/app/update',
    method: 'post',
    data
  })
}
