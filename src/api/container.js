import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/mgr/servers',
    method: 'get',
    params
  })
}

export function getServerNames(params) {
  return request({
    url: '/mgr/serverNames',
    method: 'get',
    params
  })
}

export function getContainers(params) {
  return request({
    url: '/mgr/containers',
    method: 'get',
    params: params
  })
}

export function getContainerInfos(params) {
  return request({
    url: '/mgr/containerInfos',
    method: 'get',
    params: params
  })
}

export function publishDocker(data) {
  return request({
    url: '/mgr/publish',
    method: 'post',
    data
  })
}

export function ContainerOperator(operator, data) {
  return request({
    url: '/mgr/container/' + operator,
    method: 'post',
    data
  })
}
