import request from '@/utils/request'

export function getImageList(params) {
  return request({
    url: '/mgr/image/list',
    method: 'get',
    params
  })
}

export function ImageOperator(operator, data) {
  return request({
    url: '/mgr/image/' + operator,
    method: 'post',
    data
  })
}

export function getImage(params) {
  console.log('getImage.params:', params)
  return request({
    url: '/mgr/image/detail',
    method: 'get',
    params
  })
}
