enum GenderEnnumType {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

interface ProductCategory {
  id: string | number
  name: string
  count: number
}

interface ProductState {
  productCategories: ProductCategory[]
  productTags: string[]
  products: ProductType[]
  totalProducts: number
  filters?: any
  loading: boolean
}

interface ProductType {
  id: string
  name: string
  tags: string[]
  types: string[]
  brand: string
  discount_amount?: number
  discount_percent?: number
  gender: GenderEnnumType
  price: number
  description: string
  photos: string[]
  avr_rate: number
}

export { GenderEnnumType }
export type { ProductType, ProductState }
