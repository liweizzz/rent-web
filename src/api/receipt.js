import request from '@/utils/request'

export function getReceiptList(query) {
  return request({
    url: '/receipt/list',
    method: 'get',
    params: query
  })
}

export function delReceipt(id) {
  return request({
    url: '/receipt/del',
    method: 'delete',
    params: id
  })
}

export function createReceipt(data) {
  return request({
    url: '/receipt/create',
    method: 'post',
    data
  })
}

export function getLastReceiptByRoom(id) {
  return request({
    url: '/receipt/getLastReceiptByRoom?roomNum=' + id,
    method: 'get'
  })
}
