import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import CardBase from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import axios from 'axios'
import type { Product } from '../../types'
import { handleFetchProducts } from '../../shared/ProductAPI'
import { useSelector, useDispatch } from 'react-redux'
import { loadProducts } from '../../shared/redux/reducers/ProductReducer'
import { RootState } from '../../shared/redux/store'
import { useGetProductsQuery } from '../../shared/redux/services/api'

import Table from './components/Table'
import { useSearchParams } from 'react-router-dom'

const Card = ({
  name,
  brand,
  type,
  ingredients,
}: {
  name: string
  brand: string
  ingredients: string[]
  type: string
}) => (
  <CardBase variant="outlined">
    <CardContent>
      <Typography color="text.primary" gutterBottom>
        {name}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {brand}
      </Typography>
      <Typography variant="p" color="text.secondary">
        {type}
      </Typography>
    </CardContent>
  </CardBase>
)

export const ProductsRoute = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { data, error, isLoading, refetch } = useGetProductsQuery({
    limit: searchParams.get('limit'),
    skip: searchParams.get('skip'),
  })

  const params = {
    limit: searchParams.get('limit') || 10,
    skip: searchParams.get('skip') || 0,
  }

  useEffect(() => {
    refetch()
    console.log('params', params)
  }, [params.limit, params.skip])

  const setLimit = (limit: any) => setSearchParams({ ...params, limit })
  const setSkip = (skip: any) => setSearchParams({ ...params, skip })

  if (isLoading) return <span>loading...</span>

  return (
    <>
      <Table
        products={data.products}
        pageCount={data.pageCount}
        setLimit={setLimit}
        setSkip={setSkip}
      />
    </>
  )
}
