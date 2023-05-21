import { CartParams } from '~/interfaces'
import instance from './api'

export const getWishList = (params: any) => {
  return instance.get('/users/wishlist', {
    params
  })
}

export const addItemToWishlist = (params: any) => {
  return instance.post('/users/wishlist', params)
}

export const removeItemFromWishlist = (params: any) => {
  return instance.delete('/users/wishlist', params)
}

export const getCartItems = () => {
  return instance.get('/cart')
}

export const addItemToCart = (params: CartParams[]) => {
  return instance.put('/cart', params)
}

export const updateCartItem = (params: CartParams[]) => {
  return instance.post('/cart', params)
}

export const removeItemFromCart = (id: string) => {
  return instance.delete(`/cart/${id}`)
}

export const removeAllCartItems = () => {
  return instance.delete('/cart')
}
