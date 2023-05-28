import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { AuthUser, WishlistItem } from '../../interfaces'
import { AuthServices, UserServices } from '../../services'
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
  console.log('?', response.data)
  return response.data
})

export interface UserState {
  wishlist: WishlistItem[]
  status?: StatusTypes
  error?: string
}

const initialState: UserState = {
  wishlist: []
}

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWishList.fulfilled, (state, action) => {
      state.wishlist = action.payload
    })
    builder.addCase(getWishList.rejected, (state, action) => {
      state.wishlist = []
    })
    builder.addCase(addItemToWishlistAsync.fulfilled, (state, action) => {
      state.wishlist = [...state.wishlist, action.payload]
    })
    builder.addCase(removeItemFromWishlistAsync.fulfilled, (state, action) => {
      const removedIds = action.payload
      state.wishlist = state.wishlist.filter((item) => !removedIds.includes(item.product_id))
    })
  }
})

export const userState = (state: RootState) => state.user

export default userSlice.reducer
