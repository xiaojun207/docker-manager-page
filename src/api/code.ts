import request from '@/utils/system/request'

export function sendCode(data) {
  return request({
    url: '/base/sendCode',
    method: 'post',
    data
  })
}
