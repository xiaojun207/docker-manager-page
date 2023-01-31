import request from '@/utils/system/request'

export function sendCode(data:any) {
  return request({
    url: '/base/sendCode',
    method: 'post',
    data
  })
}
