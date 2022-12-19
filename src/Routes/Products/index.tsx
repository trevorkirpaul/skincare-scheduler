import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import CardBase from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import { useGetProductsQuery } from '../../shared/redux/services/api'

import Table from './components/Table'
import { useSearchParams } from 'react-router-dom'
import TextField from '../../shared/TextField'
import { useDebounce } from '../../shared/hooks/useDebounce'

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
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 1000)
  const [searchParams, setSearchParams] = useSearchParams()
  const { data, error, isLoading, refetch } = useGetProductsQuery({
    limit: searchParams.get('limit'),
    skip: searchParams.get('skip'),
    search: debouncedSearchTerm,
  })

  const handleOnChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(value)

  const params = {
    limit: searchParams.get('limit') || 10,
    skip: searchParams.get('skip') || 0,
  }

  useEffect(() => {
    console.log('debouncedSearchTerm', debouncedSearchTerm)
  }, [debouncedSearchTerm])

  useEffect(() => {
    refetch()
    console.log('params', params)
  }, [params.limit, params.skip])

  const setLimit = (limit: any) => setSearchParams({ ...params, limit })
  const setSkip = (skip: any) => setSearchParams({ ...params, skip })

  if (isLoading) return <span>loading...</span>

  return (
    <Box>
      <TextField label="Search" onChange={handleOnChange} />
      <Table
        products={data.products}
        pageCount={data.pageCount}
        setLimit={setLimit}
        setSkip={setSkip}
      />
    </Box>
  )
}
