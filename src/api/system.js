import request from '@/utils/request'

export function listDictionary() {
  return request({
    url: '/systemDictionary/listDic',
    method: 'get'
  })
}
