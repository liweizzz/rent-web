import request from '@/utils/request'
import request1 from '@/utils/request1'

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function getTenantList(query) {
  return request1({
    url: '/tenant/list',
    method: 'get',
    params: query
  })
}

export function delTenant(id) {
  return request1({
    url: '/tenant/del',
    method: 'delete',
    params: id
  })
}

export function saveOrUpdateTenant(data) {
  return request1({
    url: '/tenant/saveOrUpdate',
    method: 'post',
    data
  })
}

export function saveTenantRentDetail(data) {
  return request1({
    url: '/tenantRentDetail/saveOrUpdate',
    method: 'post',
    data
  })
}

export function listAllUserFromApartment(apartmentId) {
  return request1({
    url: '/tenant/listAllTenantFromApartment?apartmentId=' + apartmentId,
    method: 'get'
  })
}

