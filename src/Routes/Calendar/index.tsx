import React, { useEffect, useState } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import { Day } from './components/Day'
import { AddProductModal } from './components/AddProductModal'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import axios from 'axios'

import {
  useDeleteProductFromScheduleMutation,
  useGetProductsQuery,
  useGetScheduleQuery,
  useGetUserQuery,
  useUpdateProductsOrderForDayMutation,
  useUpdateScheduleMutation,
} from '../../shared/redux/services/api'
import { handleFetchProducts } from '../../shared/ProductAPI'
import { ScheduledProduct, ScheduleFE } from '../../types'
import type { ScheduleValues } from '../../shared/redux/services/api'

const CalendarRoute: React.FC = () => {
  const { data: userData } = useGetUserQuery()

  const {
    data: scheduleData,
    isLoading: scheduleDataIsLoading,
    refetch,
  } = useGetScheduleQuery()

  const [
    updateSchedule,
    { isLoading: updateScheduleIsLoading, isSuccess: updateScheduleIsSuccess },
  ] = useUpdateScheduleMutation()

  const [
    deleteProductFromSchedule,
    {
      isLoading: deleteProductFromScheduleIsLoading,
      isSuccess: deleteProductFromScheduleIsSuccess,
    },
  ] = useDeleteProductFromScheduleMutation()

  const [
    updateProductsOrder,
    {
      isLoading: updateProductsOrderIsLoading,
      isSuccess: updateProductsOrderIsSuccess,
    },
  ] = useUpdateProductsOrderForDayMutation()

  useEffect(() => {
    if (updateScheduleIsSuccess === true) {
      refetch()
    }
  }, [updateScheduleIsSuccess])

  useEffect(() => {
    if (deleteProductFromScheduleIsSuccess === true) {
      refetch()
    }
  }, [deleteProductFromScheduleIsSuccess])

  useEffect(() => {
    if (updateProductsOrderIsSuccess === true) {
      refetch()
    }
  }, [updateProductsOrderIsSuccess])

  const {
    data: products,
    error,
    isLoading,
  } = useGetProductsQuery({
    limit: '2000',
    skip: '0',
  })
  const [daysInState, setDaysInState] = useState<null | ScheduleValues>(null)

  const [open, setOpen] = useState(null)

  useEffect(() => {
    if (scheduleData) {
      setDaysInState(scheduleData)
    }
  }, [scheduleData, daysInState, setDaysInState])

  if (!products || isLoading || !daysInState) {
    return <span>loading...</span>
  }

  const handleAddToDay = (
    day: string,
    productId: string,
    idToRemove?: string | number,
  ) => {
    if (!userData) return
    if (idToRemove) {
      return deleteProductFromSchedule({ idToRemove })
    }
    updateSchedule({
      day,
      productId,
      userId: `${userData.id}`,
      isAm: true,
    })
  }

  const reorder = (
    list: ScheduledProduct[] | undefined,
    startIndex: number,
    endIndex: number,
    dayId: string,
  ) => {
    if (!list) {
      throw new Error('error, could not reorder')
    }
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    const items = result.map((x) => x._id)

    updateProductsOrder({
      dayId,
      items,
    })
    return result
  }

  const handleReorderProductsForDay = (
    day: string,
    result: any,
    dayId: string,
  ) => {
    console.log('removed for now')
    // reorder(
    //   daysInState.find((d) => d.day === day)?.items,
    //   result.source.index,
    //   result.destination.index,
    //   dayId,
    // )
  }
  return (
    <div>
      <AddProductModal
        products={products}
        open={open}
        handleClose={() => setOpen(null)}
        handleAddToDay={handleAddToDay}
      />
      <div style={{ display: 'flex' }}>
        {Object.keys(daysInState).map((day) => (
          <Day
            key={day}
            day={day}
            items={[...daysInState[day]]}
            handleOpenAddProductModal={() => setOpen(day)}
            handleReorderProductsForDay={handleReorderProductsForDay}
            handleAddToDay={handleAddToDay}
          />
        ))}
      </div>
    </div>
  )
}

export { CalendarRoute }
