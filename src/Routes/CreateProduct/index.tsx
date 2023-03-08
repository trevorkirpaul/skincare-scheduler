import React from 'react'
import { Paper, Button, Typography } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import axios from 'axios'

import type { Product } from '../../types'

type NewProduct = Pick<Product, 'name' | 'brand' | 'type' | 'ingredients'>

const CreateProductRoute: React.FC = () => {
  const mutation = useMutation((newProduct: NewProduct) => {
    return axios.post('http://localhost:3001/products', newProduct)
  })
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      'product-name': '',
      brand: '',
      type: '',
      ingredients: '',
    },
  })
  const onSubmit = (data: any) => {
    return mutation.mutate({
      ...data,
      name: data['product-name'],
      ingredients: data.ingredients.split(','),
    })
  }
  const styles = {
    p: {
      padding: '15px 10px',
    },
  }

  if (mutation.isLoading) {
    return (
      <Box>
        <Paper>
          <Typography>Loading...</Typography>
        </Paper>
      </Box>
    )
  }
  if (mutation.isSuccess) {
    return (
      <Box>
        <Paper>
          <Typography>Successfully created new product!</Typography>
        </Paper>
      </Box>
    )
  }
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Paper>
        <Paper sx={styles.p}>
          <Controller
            name="product-name"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Input {...field} placeholder="enter product name..." />
            )}
          />
        </Paper>
        <Paper sx={styles.p}>
          <Controller
            name="brand"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Input {...field} placeholder="enter brand name..." />
            )}
          />
        </Paper>
        <Paper sx={styles.p}>
          <Controller
            name="type"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Input {...field} placeholder="enter type of product..." />
            )}
          />
        </Paper>
        <Paper sx={styles.p}>
          <Controller
            name="ingredients"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Input
                {...field}
                multiline
                minRows={4}
                placeholder="enter ingredients..."
              />
            )}
          />
        </Paper>
        <Button type="submit">Create New Product</Button>
      </Paper>
    </Box>
  )
}

export { CreateProductRoute }
