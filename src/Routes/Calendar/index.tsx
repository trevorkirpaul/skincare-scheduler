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
import type { ScheduledProduct } from '../../types'

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

  const [open, setOpen] = useState<null | { day: string; is_am: boolean }>(null)

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

  const handleAddToDay = ({
    day,
    productId,
    idToRemove,
    is_am,
  }: {
    day: string
    productId: string
    idToRemove?: string | number
    is_am: boolean
  }) => {
    if (!userData) return
    if (idToRemove) {
      return deleteProductFromSchedule({ idToRemove })
    }
    updateSchedule({
      day,
      productId,
      userId: `${userData.id}`,
      isAm: is_am,
    })
  }

  const reorder = async (
    startIndex: number,
    endIndex: number,
    day: string,
    is_am: boolean,
  ) => {
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
        is_am,
      })
    } catch (e) {
      console.log('e', e)
    }
  }

  const handleReorderProductsForDay = (
    day: string,
    result: any,
    is_am: boolean,
  ) => {
    reorder(result.source.index, result.destination.index, day, is_am)
  }

  interface RItemsInOrder {
    am: ScheduledProduct[]
    pm: ScheduledProduct[]
  }

  const itemsInOrder = (day: string): RItemsInOrder => {
    const _thisScheduledProductOrder: RItemsInOrder =
      allScheduledProductOrdersData.reduce((prev: any, curr: any) => {
        const { is_am, day: currentDay, scheduled_product_ids } = curr
        if (currentDay !== day) return prev

        return {
          ...prev,
          [is_am ? 'am' : 'pm']: scheduled_product_ids.map((x) =>
            daysInState[day].find((y) => y.id === x),
          ),
        }
      }, {})

    return _thisScheduledProductOrder
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
            items={itemsInOrder(day)}
            handleOpenAddProductModal={(args: {
              day: string
              is_am: boolean
            }) => setOpen(args)}
            handleReorderProductsForDay={handleReorderProductsForDay}
            handleAddToDay={handleAddToDay}
          />
        ))}
      </div>
    </div>
  )
}

export { CalendarRoute }
