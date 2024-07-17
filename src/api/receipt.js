import request from '@/utils/request'

export function getReceiptList(query) {
  return request({
    url: '/receipt/list',
    method: 'get',
    params: query
  })
}

export function createRecepitBatch(data) {
  return request({
    url: '/receipt/createBatch',
    method: 'post',
    data
  })
}

export function delReceipt(id) {
  return request({
    url: '/receipt/del?id=' + id,
    method: 'delete'
  })
}

export function getReceipt(id) {
  return request({
    url: '/receipt/getReceipt?id=' + id,
    method: 'get'
  })
}

export function getReceiptImg(id) {
  return request({
    url: '/receipt/getReceiptImg?id=' + id,
    method: 'get'
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

export function downloadReport(query) {
  return request({
    url: '/report/download',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}
