import request1 from '@/utils/request1'

export function listRoomFromApartment(id) {
  return request1({
    url: '/room/listRoomFromApartment',
    method: 'get',
    params: id
  })
}

export function saveOrUpdateRoom(data) {
  return request1({
    url: '/room/saveOrUpdateRoom',
    method: 'post',
    data
  })
}
