import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000, // request timeout
  headers: {
    'Content-Type': 'application/json'
  }
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['authorization'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log('error:', error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 100200, it is judged as an error.
    if (res.code !== '100200') {
      // 105101: Illegal token; 105101: Other clients logged in; 50014: Token expired;
      if (res.code === '105101') {
        // to re-login
        MessageBox.confirm('你已经离线，请重新登录', '登录检查', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      } else {
        Message({
          message: res.msg || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('request.err:', error) // for debug
    if (error + '' === 'Error: Request failed with status code 403') {
      console.log('request.err 403') // for debug
      Message({
        message: 'API禁用',
        type: 'error',
        duration: 5 * 1000
      })

    } else {
      Message({
        message: error.msg,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
