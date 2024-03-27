import request from '@/utils/request1'

export function saveOrUpdateApartment(data) {
  return request({
    url: '/apartment/saveOrUpdate',
    method: 'post',
    data
  })
}

export function listApartment(query) {
  return request({
    url: '/apartment/listApartmentByUserId',
    method: 'get',
    params: query
  })
}

export function delApartment(id) {
  return request({
    url: '/apartment/del',
    method: 'post',
    params: id
  })
}
