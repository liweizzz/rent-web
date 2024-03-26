import request from '@/utils/request1'

export function listDictionary() {
  return request({
    url: '/systemDictionary/listDic',
    method: 'get'
  })
}
