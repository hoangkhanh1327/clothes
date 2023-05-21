interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  size: string
  color: string
  keyInCart: string
  discount_amount?: number
  discount_percent?: number
}

interface CartParams {
  product_id: string
  quantity: number
}

export type { CartItem, CartParams }
