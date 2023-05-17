interface AuthUser {
  id: string
  username: string
  fullname: string
  email: string
  phoneNumber: string
  avatar: string
  address: string
  createdAt: string
  createdBy: string
  photo?: string
  updatedAt: string
  updatedBy: string
}

interface User {
  id: string
  fullname: string
  email: string
  photo?: string
  verified: boolean
  status: string
  created_at: string
  updated_at: string
}

interface WishlistItem {
  created_at: string
  id: string
  product_id: string
  status: string
  updated_at: string
  user_id: string
}

export type { AuthUser, User, WishlistItem }
