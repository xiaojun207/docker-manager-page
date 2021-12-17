import request from '@/utils/request'


export function getContainers(params) {
  return request({
    url: '/mgr/container/list',
    method: 'get',
    params: params
  })
}

export function getContainer(params) {
  return request({
    url: '/mgr/container/detail',
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
