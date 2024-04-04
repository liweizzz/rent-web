import request from '@/utils/request1'

export function listRoomFromApartment(apartmentId) {
  return request({
    url: '/room/listRoomFromApartment',
    method: 'get',
    params: apartmentId
  })
}

export function saveOrUpdateRoom(data) {
  return request({
    url: '/room/saveOrUpdateRoom',
    method: 'post',
    data
  })
}
