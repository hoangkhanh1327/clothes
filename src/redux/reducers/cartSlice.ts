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

export const updateCartItemQuantity = createAsyncThunk('updateCartItemQuantity', async (params: any) => {
  const res = await UserServices.updateCartItemQuantity(params)
  return res.data
})

export const removeItemInCart = createAsyncThunk('removeItemInCart', async (cartItemId: string) => {
  const res = await UserServices.removeItemFromCart(cartItemId)
  return res.data
})

export const removeAllItems = createAsyncThunk('removeAllItems', async () => {
  const res = await UserServices.removeAllItemsInCart()
  return res.data
})

export interface CartState {
  items: CartItem[]
  addLoading?: boolean
  deleteLoading?: boolean
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
    builder.addCase(addItemToCartAsync.pending, (state, action) => {
      state.addLoading = true
    })
    builder.addCase(addItemToCartAsync.fulfilled, (state, action) => {
      state.addLoading = false
      state.items = action.payload
    })
    builder.addCase(addItemToCartAsync.rejected, (state, action) => {
      state.addLoading = false
      console.log('add item to cart error', action.payload)
    })
    builder.addCase(removeAllItems.fulfilled, (state, action) => {
      state.items = []
    })
    builder.addCase(removeAllItems.rejected, (state, action) => {
      console.log('remove all item in cart error', action)
    })
    builder.addCase(removeItemInCart.pending, (state, action) => {
      state.deleteLoading = true
    })
    builder.addCase(removeItemInCart.fulfilled, (state, action) => {
      state.deleteLoading = false
      console.log('action', action.payload)
    })
    builder.addCase(removeItemInCart.rejected, (state, action) => {
      state.deleteLoading = false
      console.log('remove one item in cart error', action)
    })
  }
})

export const cartState = (state: RootState) => state.cart
export const {} = cartSlice.actions

export default cartSlice.reducer
