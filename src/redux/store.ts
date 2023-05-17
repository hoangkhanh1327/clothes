import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit'
import authReducer from './reducers/authSlice'
import accountReducer from './reducers/accountSlice'
import cartReducer from './reducers/cartSlice'
import appSlice from './reducers/appSlice'
import productSlide from './reducers/productSlide'
import userSlice from './reducers/userSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const cartPersistConfig = {
  key: 'cart',
  storage: storage
}

const userPersistConfig = {
  key: 'user',
  storage: storage
}

export enum StatusTypes {
  SUCCESS = 'success',
  ERROR = 'error',
  LOADING = 'loading'
}

const rootReducer = combineReducers({
  app: appSlice,
  auth: persistReducer(userPersistConfig, authReducer),
  user: userSlice,
  cart: persistReducer(cartPersistConfig, cartReducer),
  account: accountReducer,
  product: productSlide
})

export const store = configureStore({
  reducer: rootReducer
})
export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
