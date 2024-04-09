import request from '@/utils/request'

export function saveOrUpdateApartment(data) {
  return request({
    url: '/apartment/saveOrUpdate',
    method: 'post',
    data
  })
}

export function listApartmentByUserId(userId) {
  return request({
    url: '/apartment/listApartmentByUserId',
    method: 'get',
    params: userId
  })
}

export function delApartment(id) {
  return request({
    url: '/apartment/del?id=' + id,
    method: 'delete'
  })
}
