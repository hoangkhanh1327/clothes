import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { AddItemToCartParams, CartItem } from '../../interfaces'
import { UserServices } from '~/services'

export const getCartItems = createAsyncThunk('getCartItems', async () => {
  const res = await UserServices.getCartItems()
  return res.data
})

export const addItemToCartAsync = createAsyncThunk('addItemToCart', async (params: AddItemToCartParams[]) => {
  const res = await UserServices.addItemToCart(params)
  return res.data
})

export const removeItemInCart = createAsyncThunk('removeItemInCart', async (cartItemId: string) => {
  const res = await UserServices.removeItemFromCart(cartItemId)
  return res.data
})

export interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      state.items = action.payload
    })
    builder.addCase(getCartItems.rejected, (state, action) => {
      console.log('get cart items error ', action.payload)
    })
    builder.addCase(addItemToCartAsync.fulfilled, (state, action) => {
      console.log('action', action.payload)
    })
    builder.addCase(addItemToCartAsync.rejected, (state, action) => {
      console.log('add item to cart error', action.payload)
    })
  }
})

export const cartState = (state: RootState) => state.cart
export const {} = cartSlice.actions

export default cartSlice.reducer
