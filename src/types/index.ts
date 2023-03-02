export interface Product {
  name: string
  brand: string
  ingredients: string[]
  id: number
  type: string
}

export interface Day {
  day: string
  _id: string
  __v: number
  products: ScheduledProduct[]
}

export interface Schedule {
  days: Day[]
  user: User
}

export interface User {
  email: string
  id: number
  profile_id?: string
}

export interface DayFE {
  day: string
  id: string
  items: ScheduledProduct[]
}

export interface ScheduledProduct {
  id: string
  product_id: string
  user_id: string
  day: string
  is_am: boolean
}

export type ScheduleFE = ScheduledProduct[]
