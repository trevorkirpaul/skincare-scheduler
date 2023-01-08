import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  Product,
  User,
  ScheduleFE,
  ScheduledProduct,
  Day,
} from '../../../types'

interface UpdateScheduleReturn {
  newScheduledProduct: ScheduledProduct
  updatedDay: Day
}

interface UpdateScheduleArgs {
  dayId: string
  productId: string
}

interface UpdateProductsOrderArgs {
  dayId: string
  items: string[]
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
  search: string | null
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
  reducerPath: 'store',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: (builder) => ({
    getProductCount: builder.query<
      TransformedGetProductCountReturn,
      string | null | undefined
    >({
      query: (search) =>
        search ? `products/count?search=${search}` : `products/count`,
      transformResponse: (responseToTransform: GetProductCountReturn) => {
        return responseToTransform.rows[0]?.exact_count || '0'
      },
    }),
    getProducts: builder.query<
      TransformedGetProductsReturn,
      GetProductsQueryArgs
    >({
      query: (arg) =>
        `products?limit=${arg.limit || 10}&skip=${arg.skip || 0}&search=${
          arg.search || ''
        }`,
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
      query: () => 'users/admin@scs.com', //@TODO replace with arg
    }),
    getSchedule: builder.query<ScheduleValues, unknown>({
      query: () => 'users/schedule/admin@scs.com', //@TODO replace with arg
      transformResponse: (
        response: ScheduleFE,
      ): ScheduleValues | Promise<ScheduleValues> =>
        convertGetScheduleResponse(response),
    }),
    updateSchedule: builder.mutation<UpdateScheduleReturn, UpdateScheduleArgs>({
      query: ({ dayId, productId }) => ({
        url: 'users/schedule',
        method: 'POST',
        body: {
          dayId,
          productId,
        },
      }),
    }),
    updateProductsOrderForDay: builder.mutation<
      Pick<UpdateScheduleReturn, 'updatedDay'>,
      UpdateProductsOrderArgs
    >({
      query: ({ dayId, items }) => ({
        url: 'users/day/order',
        method: 'POST',
        body: {
          dayId,
          items,
        },
      }),
    }),
    deleteProductFromSchedule: builder.mutation<
      UpdateScheduleReturn,
      UpdateScheduleArgs
    >({
      query: ({ dayId, productId }) => ({
        url: 'users/schedule',
        method: 'DELETE',
        body: {
          dayId,
          productId,
        },
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
} = api
