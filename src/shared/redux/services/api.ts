import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  Product,
  User,
  ScheduleFE,
  ScheduledProduct,
  Day,
} from '../../../types'

type GetIngredientsForScheduledProductsReturn = any[]

interface UpdateScheduleReturn {
  newScheduledProduct: ScheduledProduct
  updatedDay: Day
}

interface UpdateScheduleArgs {
  day: string
  productId: string
  userId?: string
  isAm: boolean
}

interface UpdateProductsOrderArgs {
  day: string
  userId: string
  items: number[]
}

export interface GetProductsReturn {
  rows: Product[]
  rowCount: number
  command: string
  fields: Array<{
    columnId: number
    dataTypeID: number
    dataTypeModifier: number
    dataTypeSize: number
    format: string
    name: string
    tableID: number
  }>
}

interface GetProductsQueryArgs {
  limit: string | null
  skip: string | null
  search?: string | null
}

export interface ScheduleValues {
  [key: string]: ScheduledProduct[]
}

const initialScheduleValues: ScheduleValues = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],
}

const createHeaders = () => ({
  SameSite: 'None',
  Secure: 'true',
})

const convertGetScheduleResponse = (r: ScheduleFE) => {
  return r.reduce((prev, curr) => {
    return {
      ...prev,
      [curr.day]: [...prev[curr.day], curr],
    }
  }, initialScheduleValues)
}

export interface TransformedGetProductsReturn {
  products: Product[]
  rowCount: number
}

interface GetProductCountReturn {
  rows: Array<{
    exact_count: string
  }>
}
type TransformedGetProductCountReturn = string

// Define a service using a base URL and expected endpoints
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: (builder) => ({
    getProductCount: builder.query<
      TransformedGetProductCountReturn,
      string | null | undefined
    >({
      query: (search) => ({
        url: search ? `products/count?search=${search}` : `products/count`,
        credentials: 'include',
        headers: createHeaders(),
      }),

      transformResponse: (responseToTransform: GetProductCountReturn) => {
        return responseToTransform.rows[0]?.exact_count || '0'
      },
    }),
    getProducts: builder.query<
      TransformedGetProductsReturn,
      GetProductsQueryArgs
    >({
      query: (arg) => ({
        url: `products?limit=${arg.limit || 10}&skip=${arg.skip || 0}&search=${
          arg.search || ''
        }`,
        credentials: 'include',
        headers: createHeaders(),
      }),
      transformResponse: (
        responseToTransform: GetProductsReturn,
      ): TransformedGetProductsReturn => {
        return {
          products: responseToTransform.rows,
          rowCount: responseToTransform.rowCount,
        }
      },
    }),
    getUser: builder.query<User, unknown>({
      query: () => {
        const cachedUserData: any = localStorage.getItem('cached-user-data')

        if (!cachedUserData || !cachedUserData.email) {
          throw new Error('')
        }

        return {
          url: `users/${cachedUserData.email}`,
          credentials: 'include',
          headers: createHeaders(),
        }
      },
    }),
    createUser: builder.mutation<User, unknown>({
      query: (body) => ({
        url: 'users',
        method: 'POST',
        body,
        credentials: 'include',
        headers: createHeaders(),
      }),
      transformResponse: (responseToTransform: any) => {
        console.log(responseToTransform)
        return responseToTransform
      },
    }),
    loginUser: builder.mutation<User, unknown>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
        credentials: 'include',
        headers: createHeaders(),
      }),
      transformResponse: (responseToTransform: any) => {
        console.log(responseToTransform.user)

        localStorage.setItem(
          'cached-user-data',
          JSON.stringify(responseToTransform.user),
        )

        return responseToTransform
      },
    }),
    logoutUser: builder.query({
      query: () => ({
        url: 'auth/logout',
        method: 'GET',
        credentials: 'include',
        headers: createHeaders(),
      }),
    }),
    getSchedule: builder.query<ScheduleValues, unknown>({
      query: () => ({
        url: 'users/schedule/admin@scs.com',
        method: 'GET',
        credentials: 'include',
        headers: createHeaders(),
      }),
      transformResponse: (
        response: ScheduleFE,
      ): ScheduleValues | Promise<ScheduleValues> =>
        convertGetScheduleResponse(response),
    }),
    updateSchedule: builder.mutation<UpdateScheduleReturn, UpdateScheduleArgs>({
      query: (body) => ({
        url: 'scheduled-products',
        method: 'POST',
        body,
        credentials: 'include',
        headers: createHeaders(),
      }),
    }),
    updateProductsOrderForDay: builder.mutation<
      number[],
      UpdateProductsOrderArgs
    >({
      query: ({ day, items, userId }) => ({
        url: 'users/day/order',
        method: 'POST',
        body: {
          day,
          items,
          userId,
        },
        credentials: 'include',
        headers: createHeaders(),
      }),
    }),
    getAllScheduledProductOrders: builder.query<any, { userId?: string }>({
      query: ({ userId }) => ({
        url: `users/all_orders/${userId}`,
        method: 'GET',
        credentials: 'include',
        headers: createHeaders(),
      }),
    }),
    deleteProductFromSchedule: builder.mutation<
      UpdateScheduleReturn,
      { idToRemove: string | number }
    >({
      query: ({ idToRemove }) => ({
        url: `scheduled-products/${idToRemove}`,
        method: 'DELETE',
        credentials: 'include',
        headers: createHeaders(),
      }),
    }),
    getIngredientsForScheduledProducts: builder.query<
      GetIngredientsForScheduledProductsReturn,
      number | string
    >({
      query: (id) => ({
        url: `scheduled-products/ingredients/${id}`,
        method: 'GET',
        credentials: 'include',
        headers: createHeaders(),
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductCountQuery,
  useGetProductsQuery,
  useGetUserQuery,
  useGetScheduleQuery,
  useUpdateScheduleMutation,
  useDeleteProductFromScheduleMutation,
  useUpdateProductsOrderForDayMutation,
  useGetAllScheduledProductOrdersQuery,
  useGetIngredientsForScheduledProductsQuery,
  useCreateUserMutation,
  useLoginUserMutation,
  // useLogoutUserQuery,
  useLazyLogoutUserQuery,
} = api
