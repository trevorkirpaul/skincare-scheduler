import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { Day } from './components/Day'
import { AddProductModal } from './components/AddProductModal'
import {
  useDeleteProductFromScheduleMutation,
  useGetProductsQuery,
  useGetScheduleQuery,
  useGetUserQuery,
  useUpdateProductsOrderForDayMutation,
  useUpdateScheduleMutation,
  useGetAllScheduledProductOrdersQuery,
} from '../../shared/redux/services/api'
import type { ScheduleValues } from '../../shared/redux/services/api'
import { getCachedUserData } from '../../shared/getCachedUserData'
import { Link } from 'react-router-dom'

const moveItemsInArray = (
  arrayToOperateOn: any[],
  from: number,
  to: number,
) => {
  const itemToMove = [...arrayToOperateOn].splice(from, 1)[0]
  const r = arrayToOperateOn.filter((x) => x !== itemToMove)
  r.splice(to, 0, itemToMove)
  return r
}

const CalendarRoute: React.FC = () => {
  const cachedUserData = getCachedUserData()
  const isNotSignedIn = cachedUserData === false

  const { data: userData } = useGetUserQuery('get-user', {
    skip: isNotSignedIn,
  })

  const {
    data: scheduleData,
    isLoading: scheduleDataIsLoading,
    refetch,
  } = useGetScheduleQuery(cachedUserData ? cachedUserData.email : null, {
    skip: isNotSignedIn,
  })

  const [
    updateSchedule,
    { isLoading: updateScheduleIsLoading, isSuccess: updateScheduleIsSuccess },
  ] = useUpdateScheduleMutation()

  const {
    data: allScheduledProductOrdersData,
    isLoading: allScheduledProductOrdersIsLoading,
    refetch: handleRefetchAllScheduledProductOrdersData,
  } = useGetAllScheduledProductOrdersQuery(
    { userId: `${cachedUserData ? cachedUserData.id : null}` },
    {
      skip: isNotSignedIn,
    },
  )

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
      handleRefetchAllScheduledProductOrdersData()
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
      handleRefetchAllScheduledProductOrdersData()
    }
  }, [updateProductsOrderIsSuccess])

  const {
    data: products,
    error: getProductsError,
    isLoading,
  } = useGetProductsQuery(
    { limit: '2000', skip: '0' },
    {
      skip: isNotSignedIn,
    },
  )
  const [daysInState, setDaysInState] = useState<null | ScheduleValues>(null)

  const [open, setOpen] = useState(null)

  useEffect(() => {
    if (scheduleData) {
      setDaysInState(scheduleData)
    }
  }, [scheduleData, daysInState, setDaysInState])

  if (isNotSignedIn) {
    return (
      <Box sx={{ background: '#383838', p: 2, borderRadius: '5px' }}>
        <Typography>You are not signed in.</Typography>
        <Link to="/auth">
          <Button>Sign In</Button>
        </Link>
      </Box>
    )
  }

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

  const reorder = async (startIndex: number, endIndex: number, day: string) => {
    if (!userData) {
      throw new Error('no user data')
    }

    const thisScheduledProductOrder = allScheduledProductOrdersData.find(
      (aspod: any) => aspod.day === day,
    )

    const items = thisScheduledProductOrder.scheduled_product_ids

    const newItems = moveItemsInArray([...items], startIndex, endIndex)

    try {
      await updateProductsOrder({
        day,
        items: newItems,
        userId: `${userData.id}`,
      })
    } catch (e) {
      console.log('e', e)
    }
  }

  const handleReorderProductsForDay = (day: string, result: any) => {
    reorder(result.source.index, result.destination.index, day)
  }

  const itemsInOrder = (items: any, day: string) => {
    const thisScheduledProductOrder = allScheduledProductOrdersData.find(
      (aspod: any) => aspod.day === day,
    )
    if (!thisScheduledProductOrder) return items
    return thisScheduledProductOrder.scheduled_product_ids.map((x) =>
      items.find((i) => i.id === x),
    )
  }

  if (!allScheduledProductOrdersData) {
    return <div>loading...</div>
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
            items={itemsInOrder([...daysInState[day]], day)}
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
