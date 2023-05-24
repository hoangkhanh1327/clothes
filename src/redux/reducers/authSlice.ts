import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { AuthUser } from '../../interfaces'
import { AuthServices, UserServices } from '../../services'
import { RootState } from '../store'
import { history } from '~/utils'

export enum StatusTypes {
  SUCCESS = 'success',
  ERROR = 'error',
  LOADING = 'loading'
}

export const signinAsync = createAsyncThunk('signin', async (user: { username: string; password: string }) => {
  const response = await AuthServices.login(user.username, user.password)
  return response.data
})

export const getCurrentUserAsync = createAsyncThunk('/user/me', async () => {
  const response = await UserServices.getCurrentUser()
  return response.data
})

export const signOutAsync = createAsyncThunk('signout', async () => {
  AuthServices.logout()
})

export interface AuthState {
  user: AuthUser | null
  isLoggedIn: boolean
  status?: StatusTypes
  error?: string
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: true
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null
      state.isLoggedIn = false
      history.navigate('/')
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signinAsync.pending, (state) => {
      state.status = StatusTypes.LOADING
    })
    builder.addCase(signinAsync.fulfilled, (state, action) => {
      state.user = action.payload.user
      state.isLoggedIn = true
      state.status = StatusTypes.SUCCESS
    })
    builder.addCase(signinAsync.rejected, (state, action) => {
      state.user = null
      state.status = StatusTypes.ERROR
      state.error = action.error.message
      state.isLoggedIn = false
    })

    builder.addCase(getCurrentUserAsync.pending, (state) => {
      state.status = StatusTypes.LOADING
    })
    builder.addCase(getCurrentUserAsync.fulfilled, (state, action) => {
      state.user = action.payload.user
    })
    builder.addCase(getCurrentUserAsync.rejected, (state, action) => {
      state.user = null
      state.status = StatusTypes.ERROR
      state.error = action.error.message
      state.isLoggedIn = false
    })
  }
})

export const { signOut } = authSlice.actions

export const authState = (state: RootState) => state.auth

export default authSlice.reducer
