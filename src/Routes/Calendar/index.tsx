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
  useGetScheduleQuery,
  useUpdateProductsOrderForDayMutation,
  useUpdateScheduleMutation,
} from '../../shared/redux/services/api'
import { handleFetchProducts } from '../../shared/ProductAPI'
import { ScheduledProduct, ScheduleFE } from '../../types'

const CalendarRoute: React.FC = () => {
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

  const { isLoading, isError, data, error } = useQuery(
    ['products'],
    handleFetchProducts,
  )
  const [daysInState, setDaysInState] = useState<null | ScheduleFE>(null)

  const [open, setOpen] = useState(null)

  useEffect(() => {
    if (scheduleData) {
      setDaysInState(scheduleData)
    }
  }, [scheduleData, daysInState, setDaysInState])

  if (!data || isLoading || !daysInState) {
    return <span>loading...</span>
  }

  const handleAddToDay = (
    dayId: string,
    productId: string,
    remove?: boolean,
  ) => {
    if (remove) {
      return deleteProductFromSchedule({ productId, dayId })
    }
    updateSchedule({
      dayId,
      productId,
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
    reorder(
      daysInState.find((d) => d.day === day)?.items,
      result.source.index,
      result.destination.index,
      dayId,
    )
  }
  return (
    <div>
      <AddProductModal
        products={data}
        open={open}
        handleClose={() => setOpen(null)}
        handleAddToDay={handleAddToDay}
      />
      <div style={{ display: 'flex' }}>
        {daysInState.map((d) => (
          <Day
            key={d.id}
            {...d}
            products={data}
            handleOpenAddProductModal={() => setOpen(d.id)}
            handleReorderProductsForDay={handleReorderProductsForDay}
            handleAddToDay={handleAddToDay}
          />
        ))}
      </div>
    </div>
  )
}

export { CalendarRoute }
