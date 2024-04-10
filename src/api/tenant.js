import request from '@/utils/request'

export function getTenantList(query) {
  return request({
    url: '/tenant/list',
    method: 'get',
    params: query
  })
}

export function delTenant(id) {
  return request({
    url: '/tenant/del?id=' + id,
    method: 'delete'
  })
}

export function saveOrUpdateTenant(data) {
  return request({
    url: '/tenant/saveOrUpdate',
    method: 'post',
    data
  })
}

export function getTenantInfo(id) {
  return request({
    url: '/tenant/getTenantInfo?id=' + id,
    method: 'get'
  })
}

export function saveTenantRentDetail(data) {
  return request({
    url: '/tenantRentDetail/saveOrUpdate',
    method: 'post',
    data
  })
}

export function getTenantRentDetailByTId(param) {
  return request({
    url: '/tenantRentDetail/getTRDByTId?tenantId=' + param,
    method: 'get'
  })
}

export function listAllUserFromApartment(apartmentId) {
  return request({
    url: '/tenant/listAllTenantFromApartment?apartmentId=' + apartmentId,
    method: 'get'
  })
}

