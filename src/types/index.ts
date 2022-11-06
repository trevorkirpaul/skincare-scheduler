export interface Product {
  name: string
  brand: string
  ingredients: string[]
  _id: string
  type: string
  __v: number
}
export interface ScheduledProduct {
  day: string
  order: number
  amOrPm: string
  product: Product[]
  _id: string
  type: string
  __v: number
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
  schedules: Schedule[]
}

export interface DayFE {
  day: string
  id: string
  items: ScheduledProduct[]
}

export type ScheduleFE = DayFE[]
