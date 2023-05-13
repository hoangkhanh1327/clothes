import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { AuthUser, WishlistItem } from '../../interfaces'
import { AuthServices, UserServices } from '../../services'
import { RootState } from '../store'

export enum StatusTypes {
  SUCCESS = 'success',
  ERROR = 'error',
  LOADING = 'loading'
}

export const geWishList = createAsyncThunk('getWishList', async () => {
  const response = await UserServices.getWishList({ page: 1, page_size: 1000 })
  return response.data
})

export const addItemToWishlistAsync = createAsyncThunk('addWishlist', async (id: string) => {
  // const response = await UserServices.addItemToWishlist({})
  return id
})

export const removeItemFromWishlistAsync = createAsyncThunk('removeWishlist', async (ids: string[]) => {
  // const response = await UserServices.removeItemFromWishlist({})
  return ids
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
    builder.addCase(geWishList.fulfilled, (state, action) => {
      state.wishlist = action.payload
    })
    builder.addCase(geWishList.rejected, (state, action) => {
      state.wishlist = []
    })
    builder.addCase(addItemToWishlistAsync.fulfilled, (state, action) => {
      state.wishlist = [
        ...state.wishlist,
        {
          id: 'test',
          product_id: action.payload,
          status: 'true',
          created_at: new Date().toString(),
          updated_at: new Date().toString(),
          user_id: '123'
        }
      ]
    })
    builder.addCase(removeItemFromWishlistAsync.fulfilled, (state, action) => {
      const removedIds = action.payload
      state.wishlist = state.wishlist.filter((item) => !removedIds.includes(item.product_id))
    })
  }
})

export const userState = (state: RootState) => state.user

export default userSlice.reducer
