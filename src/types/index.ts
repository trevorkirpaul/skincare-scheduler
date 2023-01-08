export interface Product {
  name: string
  brand: string
  ingredients: string[]
  id: number
  type: string
}

export interface ScheduledProduct {
  day: string
  brand: string
  is_am: boolean
  name: string
  id: number
  product_id: number
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
  // schedules: Schedule[]
  id: number
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
