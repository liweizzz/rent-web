import request from '@/utils/request1'

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
