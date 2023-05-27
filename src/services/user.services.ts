import { AddItemToCartParams, UpdateItemInCartParams } from '~/interfaces'
import apiWithToken from './apiWithToken'

export const getCurrentUser = async () => {
  return apiWithToken.get('/users/me')
}

export const getWishList = (params: any) => {
  return apiWithToken.get('/users/wishlist', {
    params
  })
}

export const addItemToWishlist = (params: any) => {
  return apiWithToken.post('/users/wishlist', params)
}

export const removeItemFromWishlist = (params: any) => {
  return apiWithToken.delete('/users/wishlist', params)
}

export const getCartItems = () => {
  return apiWithToken.get('/cart')
}

export const addItemToCart = (params: AddItemToCartParams[]) => {
  return apiWithToken.put('/cart', params)
}

export const updateCartItemQuantity = (params: UpdateItemInCartParams[]) => {
  return apiWithToken.post('/cart', params)
}

export const removeItemFromCart = (cartItemId: string) => {
  return apiWithToken.delete(`/cart/${cartItemId}`)
}

export const removeAllItemsInCart = () => {
  return apiWithToken.delete('/cart')
}

export const checkout = () => {
  return apiWithToken.get('/checkout')
}
