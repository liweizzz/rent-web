import request1 from '@/utils/request1'

export function saveOrUpdateApartment(data) {
  return request1({
    url: '/apartment/saveOrUpdate',
    method: 'post',
    data
  })
}

export function listApartment(query) {
  return request1({
    url: '/apartment/listApartmentByUserId',
    method: 'get',
    params: query
  })
}

export function delApartment(id) {
  return request1({
    url: '/apartment/del',
    method: 'post',
    params: id
  })
}
