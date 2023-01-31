import request from '@/utils/system/request'

export function getVersion() {
  return request({
    url: '/base/version',
    method: 'get'
  })
}
