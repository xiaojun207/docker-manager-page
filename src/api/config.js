import request from '@/utils/request'

export function getConfig() {
  return request({
    'url': '/mgr/config',
    'method': 'get'
  })
}

export function updateConfig(data) {
  return request({
    'url': '/mgr/config/update',
    'method': 'post',
    data
  })
}
