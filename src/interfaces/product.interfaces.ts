enum GenderEnnumType {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

interface ProductCategory {
  id: string | number
  name: string
  value: string
  count: number
}

interface ProductState {
  productCategories: ProductCategory[]
  productBrands: string[]
  productTags: string[]
  totalProducts: number
  filters?: any
  loading: boolean
  quickViewProductId?: string
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
