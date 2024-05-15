import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'

const service = axios.create({
  // url = base url + request url
  baseURL: process.env.VUE_APP_SERVER + '/rent/',
  timeout: 5000
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const contentType = response.headers['content-type']
    const res = response.data
    if (contentType && contentType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
      // 如果Content-Type为文件流类型，则直接返回响应对象
      return response
    } else if (res.code === 200) {
      return res
    } else {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    }
  },
  error => {
    console.log(error)
    Message({
      message: error.response.data.message,
      type: 'error',
      duration: 5 * 1000
    })
    if (error.response.data.code === 1005) {
      removeToken()
      location.href = '/rent-ui/login'
    }
    return Promise.reject(error)
  }
)

export default service
