import request from '@/utils/request'

export function getVersion() {
  return request({
    'url': '/base/version',
    'method': 'get'
  })
}
