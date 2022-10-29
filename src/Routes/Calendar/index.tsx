import React, { useState } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import Calendar from 'react-calendar'
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

import { handleFetchProducts } from '../../shared/ProductAPI'

const days: any = [
  { day: 'SUN', items: [] },
  { day: 'MON', items: [] },
  { day: 'TUE', items: [] },
  { day: 'WED', items: [] },
  { day: 'THU', items: [] },
  { day: 'FRI', items: [] },
  { day: 'SAT', items: [] },
]

const CalendarRoute: React.FC = () => {
  const { isLoading, isError, data, error } = useQuery(
    ['products'],
    handleFetchProducts,
  )
  const [daysInState, setDaysInState] = useState(days)

  const [open, setOpen] = useState(null)

  if (!data || isLoading) {
    return <span>loading...</span>
  }

  const handleAddToDay = (day: string, product: string) => {
    setDaysInState((prevDaysInState: any) =>
      prevDaysInState.map((d) => {
        if (d.day === day) {
          return {
            ...d,
            items: [...d.items, product],
          }
        }

        return d
      }),
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
            key={d.day}
            {...d}
            products={data}
            handleOpenAddProductModal={() => setOpen(d.day)}
          />
        ))}
      </div>
    </div>
  )
}

export { CalendarRoute }
