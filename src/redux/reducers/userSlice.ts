import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { UserAddress, WishlistItem } from '../../interfaces'
import { UserServices } from '../../services'
import { RootState } from '../store'

export enum StatusTypes {
  SUCCESS = 'success',
  ERROR = 'error',
  LOADING = 'loading'
}

export const getWishList = createAsyncThunk('getWishList', async () => {
  const response = await UserServices.getWishList({ page: 1, page_size: 1000 })
  return response.data
})

export const addItemToWishlistAsync = createAsyncThunk('addWishlist', async (id: string) => {
  const response = await UserServices.addItemToWishlist(id)
  return response.data
})

export const removeItemFromWishlistAsync = createAsyncThunk('removeWishlist', async (ids: string[]) => {
  const response = await UserServices.removeItemFromWishlist(ids)
  return response.data
})

export const getUserAddress = createAsyncThunk('getUserAddress', async () => {
  const res = await UserServices.getUserAddress({ page: 1, page_size: 1000 })
  return res.data
})

export const createUserAddress = createAsyncThunk('createUserAddress', async (params: any) => {
  const res = await UserServices.createUserAddress(params)
  return res.data
})
export interface UserState {
  wishlist: WishlistItem[]
  status?: StatusTypes
  address: UserAddress[]
  error?: string
  userAddressLoading?: boolean
  userAddressError?: {
    type: 'success' | 'info' | 'warning' | 'error'
    message: string
    description?: string
  }
}

const initialState: UserState = {
  wishlist: [],
  address: []
}

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWishList.fulfilled, (state, action) => {
      state.wishlist = action.payload
    })
    builder.addCase(getWishList.rejected, (state) => {
      state.wishlist = []
    })
    builder.addCase(addItemToWishlistAsync.fulfilled, (state, action) => {
      state.wishlist = [...state.wishlist, action.payload]
    })
    builder.addCase(removeItemFromWishlistAsync.fulfilled, (state, action) => {
      const removedIds = action.payload
      state.wishlist = state.wishlist.filter((item) => !removedIds.includes(item.id))
    })
    builder.addCase(getUserAddress.fulfilled, (state, action) => {
      state.address = action.payload || []
    })
    builder.addCase(createUserAddress.pending, (state) => {
      state.userAddressLoading = true
      state.userAddressError = undefined
    })
    builder.addCase(createUserAddress.fulfilled, (state, action) => {
      state.userAddressLoading = false
      state.userAddressError = {
        type: 'success',
        message: 'Đã thêm mới địa chỉ.'
      }
      state.address = [action.payload, ...state.address]
    })
    builder.addCase(createUserAddress.rejected, (state, action) => {
      ;(state.userAddressLoading = false),
        (state.userAddressError = {
          type: 'error',
          message: `Không thể tạo mới địa chỉ`,
          description: action.error.message
        })
    })
  }
})

export const userState = (state: RootState) => state.user

export default userSlice.reducer
