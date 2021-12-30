import request from '@/utils/request'

export function sendCode(data) {
  return request({
    'url': '/base/sendCode',
    'method': 'post',
    data
  })
}
