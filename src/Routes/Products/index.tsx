import React from 'react'
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
  const { data, error, isLoading } = useGetProductsQuery()

  const products = useSelector((state: RootState) => state.products)
  const dispatch = useDispatch()

  if (isLoading) return <span>loading...</span>

  return (
    <>
      {data?.map((prod) => {
        return <Card key={prod._id} {...prod} />
      })}
    </>
  )
}
