import request from '@/utils/request'

export function getDashboardSize() {
  return request({
    'url': '/mgr/dashboardSize',
    'method': 'get'
  })
}

export function getServerSize() {
  return request({
    'url': '/mgr/serverSize',
    'method': 'get'
  })
}

export function getContainerSize() {
  return request({
    'url': '/mgr/containerSize',
    'method': 'get'
  })
}

export function getImageSize() {
  return request({
    'url': '/mgr/imageSize',
    'method': 'get'
  })
}

export function getTaskSize() {
  return request({
    'url': '/mgr/taskSize',
    'method': 'get'
  })
}

export function getAppSize() {
  return request({
    'url': '/mgr/appSize',
    'method': 'get'
  })
}
