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
