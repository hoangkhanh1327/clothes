import instance from './api'

export const getProductCategory = (params: any) => {
  return instance.get('/category', {
    params
  })
}

export const getProductBrand = () => {
  return instance.get('/products/brands')
}

export const getProductTags = (params: any) => {
  return instance.get('/tags', {
    params
  })
}

export const getProducts = (params: any) => {
  return instance.get('/products', {
    params
  })
}

export const getDetailProduct = (id: string) => {
  return instance.get(`/product/${id}`)
}
