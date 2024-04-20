import request from '@/utils/request'

export function getRoles() {
  return request({
    url: '/role/getRoles',
    method: 'get'
  })
}

export function getRole(id) {
  return request({
    url: '/role/getRole',
    method: 'get',
    params: { id }
  })
}

export function addOrUpdate(data) {
  return request({
    url: '/role/addOrUpdate',
    method: 'post',
    data
  })
}

export function changeStatus(id, status) {
  return request({
    url: `/role/changeStatus`,
    method: 'get',
    params: { id, status }
  })
}

export function deleteRole(id) {
  return request({
    url: `/role/delete`,
    method: 'delete',
    params: { id }
  })
}

export function getAllPrivileges() {
  return request({
    url: `/privilege/getAll`,
    method: 'get'
  })
}
