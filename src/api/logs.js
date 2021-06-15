import request from '@/utils/request'

export function getLogStart(data) {
  console.log('getLogStart:', data)
  return request({
    'url': '/mgr/log/start',
    'method': 'post',
    data
  })
}

export function getLogClose(data) {
  return request({
    'url': '/mgr/log/close',
    'method': 'post',
    data
  })
}
