import { store } from '~/redux/store'
import api from './api'
import { clearCart } from '~/redux/reducers/cartSlice'
import { removeUser } from '~/redux/reducers/authSlice'

export const refreshToken = () => {
  return api.get('/authentication/refreshToken')
}

export const login = async (email: string, password: string) => {
  const res: any = await api.post('/auth/sign-in', {
    email,
    password
  })
  if (res.data.access_token) {
    localStorage.removeItem('user')
    localStorage.setItem(
      'user',
      JSON.stringify({
        user: res.data.user,
        accessToken: res.data.access_token,
        refreshToken: res.data.refresh_token
      })
    )
  }
  return res
}

export const logout = () => {
  localStorage.removeItem('user')
  store.dispatch(removeUser())
  store.dispatch(clearCart())
}

export const register = ({
  fullname,
  email,
  password,
  password_confirm
}: {
  fullname: string
  email: string
  password: string
  password_confirm: string
}) => {
  return api.post(`/auth/sign-up`, {
    fullname,
    email,
    password,
    password_confirm
  })
}

const AuthServices = {
  login,
  logout,
  register,
  refreshToken
}

export default AuthServices
