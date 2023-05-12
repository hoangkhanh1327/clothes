import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import accountReducer from './reducers/accountSlice'
import cartReducer from './reducers/cartSlice'
import appSlice from './reducers/appSlice'
import productSlide from './reducers/productSlide'

export enum StatusTypes {
  SUCCESS = 'success',
  ERROR = 'error',
  LOADING = 'loading'
}

export const store = configureStore({
  reducer: {
    app: appSlice,
    auth: authReducer,
    account: accountReducer,
    cart: cartReducer,
    product: productSlide
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
