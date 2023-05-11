import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { RootState, StatusTypes } from '../store'
import {
  AccountType,
  AccountTypeType,
  CartItem,
  CreateAccountParamsType,
  CreateAccountTypeParamsType,
  UpdateAccountParamsType
} from '../../interfaces'
import { ListParams } from '../../interfaces/common.interfaces'

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
  extraReducers: (builder) => {}
})

export const accountState = (state: RootState) => state.cart
export const {} = cartSlice.actions

export default cartSlice.reducer
