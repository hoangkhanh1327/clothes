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
