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

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'store',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], unknown>({
      query: () => `products`,
    }),
    getUser: builder.query<User, unknown>({
      query: () => 'users/635e929a872d2b85c238dcd1', //@TODO replace with arg
    }),
    getSchedule: builder.query<ScheduleFE, unknown>({
      query: () => 'users/635e929a872d2b85c238dcd1', //@TODO replace with arg
      transformResponse: (response: User): ScheduleFE | Promise<ScheduleFE> => {
        return [
          ...response.schedules[0].days.map((day) => ({
            day: day.day,
            id: day._id,
            items: day.products,
          })),
        ]
      },
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
      Pick<UpdateScheduleReturn, 'updateDay'>,
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
  useGetProductsQuery,
  useGetUserQuery,
  useGetScheduleQuery,
  useUpdateScheduleMutation,
  useDeleteProductFromScheduleMutation,
  useUpdateProductsOrderForDayMutation,
} = api
