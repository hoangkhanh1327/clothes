import { createSlice, current } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { CartItem } from '../../interfaces'
import { checkObjectIsEqual, getJSONStringFromObject } from '~/utils'

export interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action): void => {
      // Check if the item already exists in cart
      const existsCartItems = state.items.filter((item) => item.id === action.payload.id)

      if (!existsCartItems.length) {
        // Case 1:
        state.items = [
          ...state.items,
          {
            ...action.payload,
            keyInCart: getJSONStringFromObject(action.payload)
          }
        ]
      } else {
        // find the item in the cart which will be updated
        let itemWillBeUpdatedKey: string = ''
        existsCartItems.forEach((item) => {
          if (checkObjectIsEqual(item, action.payload, ['quantity', 'keyInCart'])) {
            itemWillBeUpdatedKey = item.keyInCart
          }
        })
        if (itemWillBeUpdatedKey) {
          state.items = state.items.map((item) => {
            if (item.keyInCart === itemWillBeUpdatedKey) {
              item.quantity += 1
            }
            return item
          })
        } else {
          state.items = [
            ...state.items,
            {
              ...action.payload,
              keyInCart: getJSONStringFromObject(action.payload)
            }
          ]
        }
      }
    },
    updateItemQuantity: (state, action): void => {
      state.items = state.items.map((item) => {
        if (item.keyInCart === action.payload.keyInCart) {
          item.quantity = action.payload.quantity
        }
        return item
      })
    },
    removeItemFromCart: (state, action): void => {
      state.items = state.items.filter((item) => item.keyInCart !== action.payload)
    },
    clearCart: (state): void => {
      state.items = []
    }
  },
  extraReducers: (builder) => {}
})

export const cartState = (state: RootState) => state.cart
export const { addItemToCart, updateItemQuantity, removeItemFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer
