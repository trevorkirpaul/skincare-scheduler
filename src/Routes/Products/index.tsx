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
    {/* <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions> */}
  </CardBase>
)

export const ProductsRoute = () => {
  const { isLoading, isError, data, error } = useQuery(
    ['products'],
    handleFetchProducts,
  )
  if (isError) {
    return (
      <>
        <span className="danger" style={{ color: 'red' }}>
          error
        </span>
      </>
    )
  }
  if (isLoading) {
    return (
      <>
        <span>loading...</span>
      </>
    )
  }

  if (!data || data.length === 0) {
    return (
      <>
        <span>No Products found</span>
      </>
    )
  }

  console.log('data', data)
  return (
    <>
      {data.map((prod) => {
        return <Card key={prod._id} {...prod} />
      })}
    </>
  )
}
