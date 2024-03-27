import request from '@/utils/request1'

export function listRoomFromApartment(id) {
  return request({
    url: '/room/listRoomFromApartment',
    method: 'get',
    params: id
  })
}

export function saveOrUpdateRoom(data) {
  return request({
    url: '/room/saveOrUpdateRoom',
    method: 'post',
    data
  })
}
