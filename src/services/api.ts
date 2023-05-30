import axios, { AxiosError } from 'axios'
import AuthServices from './auth.services'
import { config, history } from '../utils'
import { store } from '~/redux/store'
import { removeUser } from '~/redux/reducers/authSlice'
// axios.defaults.withCredentials = true
const instance = axios.create({
  baseURL: config.apiUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

instance.interceptors.response.use(
  (res) => {
    return res.data
  },
  async (error: AxiosError) => {
    const status = error.response?.status
    const errorData: any = error.response?.data
    console.log('status', status)
    if (status === 401) {
      // if (errorData?.error?.message == 'Unauthorized') {
      //   refreshToken = refreshToken ? refreshToken : AuthServices.refreshToken()
      // }
      localStorage.removeItem('user')
      console.log('vod ay')
      store.dispatch(removeUser(null))
      history.navigate('/')
    }

    if (status === 404) {
      return Promise.reject({
        message: 'Không tồn tại !'
      })
    }

    if (status === 500) {
      return Promise.reject({
        message: 'Server đã xảy ra lỗi !!'
      })
    }

    return Promise.reject(errorData?.error)
  }
)

export default instance
