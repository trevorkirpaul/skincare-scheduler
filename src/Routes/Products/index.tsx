import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import CardBase from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import {
  useGetProductsQuery,
  useGetProductCountQuery,
} from '../../shared/redux/services/api'

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

  const [limitInState, setLimitInState] = useState(null)
  const [skipInState, setSkipInState] = useState(null)
  const [pageInState, setPageInState] = useState(0)

  const { data, error, isLoading, refetch } = useGetProductsQuery({
    limit: limitInState,
    skip: skipInState,
    search: debouncedSearchTerm,
  })

  const { data: fetchedProductCount } = useGetProductCountQuery()

  const handleOnChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(value)

  const params = {
    limit: searchParams.get('limit') || 10,
    skip: searchParams.get('skip') || 0,
  }

  useEffect(() => {
    // console.log('debouncedSearchTerm', debouncedSearchTerm)
  }, [debouncedSearchTerm])

  useEffect(() => {
    refetch()
  }, [params.limit, params.skip])

  const setLimit = (limit: any) => setLimitInState(limit)
  const setSkip = (skip: any) => setSkipInState(skip)

  if (isLoading || !data) return <span>loading...</span>

  return (
    <Box>
      <TextField label="Search" onChange={handleOnChange} />
      <Table
        products={data.products}
        pageCount={Number(fetchedProductCount || 0)}
        setLimit={setLimit}
        setSkip={setSkip}
        skipInState={skipInState}
        limitInState={limitInState}
        pageInState={pageInState}
        setPageInState={setPageInState}
      />
    </Box>
  )
}
