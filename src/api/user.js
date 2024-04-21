import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/user/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/auth/user/logOut',
    method: 'post'
  })
}

export function getInfo() {
  return request({
    url: '/auth/user/info',
    method: 'get'
  })
}

export function getUsers(query) {
  return request({
    url: '/user/list',
    method: 'get',
    params: query
  })
}

export function getAllAreas() {
  return request({
    url: '/province/getAllAreas',
    method: 'get'
  })
}

export function getAllCityByProvince(code) {
  return request({
    url: '/city/getAllCitysByProvinceCode?provinceCode=' + code,
    method: 'get'
  })
}

export function saveUser(data) {
  return request({
    url: '/user/saveOrUpdate',
    method: 'post',
    data
  })
}

export function getUser(id) {
  return request({
    url: '/user/get',
    method: 'get',
    params: { id }
  })
}

export function delUser(id) {
  return request({
    url: '/user/del',
    method: 'delete',
    params: { id }
  })
}
