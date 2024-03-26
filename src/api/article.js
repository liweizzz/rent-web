import request from '@/utils/request'
import request1 from '@/utils/request1'

export function fetchList(query) {
  return request1({
    url: '/user/list',
    method: 'get',
    params: query
  })
}

export function getAllAreas() {
  return request1({
    url: '/province/getAllAreas',
    method: 'get'
  })
}

export function saveLandlord(data) {
  return request1({
    url: '/user/saveOrUpdate',
    method: 'post',
    data
  })
}

export function delLandlord(id) {
  return request1({
    url: '/user/del',
    method: 'delete',
    params: { id }
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
