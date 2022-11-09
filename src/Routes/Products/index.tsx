import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import CardBase from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import { useGetProductsQuery } from '../../shared/redux/services/api'

import Table from './components/Table'
import { useSearchParams } from 'react-router-dom'
import TextField from '../../shared/TextField'

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
    search: searchParams.get('search'),
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
    <Box sx={{ paddingTop: '35px' }}>
      <TextField />
      <Table
        products={data.products}
        pageCount={data.pageCount}
        setLimit={setLimit}
        setSkip={setSkip}
      />
    </Box>
  )
}
