import React from 'react'
import { Paper, Button, Typography, Input, Box } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'

import type { User } from '../../types'
import { useCreateUserMutation } from '../../shared/redux/services/api'

const styles = {
  p: {
    padding: '15px 10px',
  },
}

const AuthCreateRoute: React.FC = () => {
  const [
    createUser,
    { isLoading: createUserIsLoading, isSuccess: createUserIsSuccess },
  ] = useCreateUserMutation()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      email: '',
      // first_name: ''
      password: '',
      confirm_password: '',
    },
  })
  const onSubmit = (data: any) => {
    try {
      createUser(data)
    } catch (error) {
      console.log('failed to create user:', error)
    }
  }

  if (createUserIsLoading) {
    return (
      <Box>
        <Paper>
          <Typography>Loading...</Typography>
        </Paper>
      </Box>
    )
  }

  if (createUserIsSuccess) {
    return (
      <Box>
        <Paper>
          <Typography>User Successfully created</Typography>
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
      <Paper
        sx={{
          padding: '15px',
        }}
      >
        <Typography>
          Complete this form in order to create a new user profile.
        </Typography>
        <Paper sx={styles.p}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Input {...field} type="email" placeholder="enter email..." />
            )}
          />
        </Paper>

        <Paper sx={styles.p}>
          <Controller
            name="password"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                placeholder="enter password..."
              />
            )}
          />
        </Paper>

        <Paper sx={styles.p}>
          <Controller
            name="confirm_password"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                placeholder="confirm password..."
              />
            )}
          />
        </Paper>
        <Button type="submit">Create New User Profile</Button>
      </Paper>
    </Box>
  )
}

export { AuthCreateRoute }
