import request from '@/utils/request'

export function getAppGroup() {
  return request({
    'url': '/mgr/app/group',
    'method': 'get'
  })
}

export function getAppList() {
  return request({
    'url': '/mgr/app/list',
    'method': 'get'
  })
}

export function delApp(data) {
  return request({
    'url': '/mgr/app/del',
    'method': 'post',
    data
  })
}

export function updateApp(data) {
  return request({
    'url': '/mgr/app/update',
    'method': 'post',
    data
  })
}
