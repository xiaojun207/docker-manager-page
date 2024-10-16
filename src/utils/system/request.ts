import axios, {AxiosError, AxiosRequestConfig, AxiosResponse, AxiosInstance, InternalAxiosRequestConfig} from 'axios'
import store from '@/store'
import { ElMessage, ElMessageBox } from 'element-plus'
const baseURL: any = import.meta.env.VITE_BASE_URL

const service: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 30000
})

// 请求前的统一处理
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    // JWT鉴权处理
    if (store.getters['user/token']) {
        // @ts-ignore
        config.headers.authorization = store.state.user.token
    }
    const lang = store.state.app.lang || navigator.language // 初次进入，采用浏览器当前设置的语言，默认采用中文
    config.headers['Accept-Language'] = lang

    return config
  },
  (error: AxiosError) => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use((response: AxiosResponse) => {
    const res = response.data
    if (res.code === "100200") {
      return res
    } else {
      showError(res)
      return Promise.reject(res)
    }
  },
  (error: AxiosError)=> {
    console.log(error) // for debug
    const badMessage: any = error.message || error
    const code = parseInt(badMessage.toString().replace('Error: Request failed with status code ', ''))
    showError({ code, message: badMessage })
    return Promise.reject(error)
  }
)

// 错误处理
function showError(error: any) {
    // 105101: Illegal token; 105101: Other clients logged in; 50014: Token expired;
    if (error.code === '105101') {
        // to re-login
        ElMessageBox.confirm('你已经离线，请重新登录', '登录检查', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            store.dispatch('user/loginOut').then(() => {
                location.reload()
            })
        })
    } else {
        ElMessage({
            message: error.msg || 'Error' || '服务异常',
            type: 'error',
            duration: 5 * 1000
        })
    }
}

export default service
