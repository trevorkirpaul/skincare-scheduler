import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Paper,
  Button,
  Typography,
  Input,
  Box,
  CircularProgress,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { useLoginUserMutation } from '../../../shared/redux/services/api'
import { loginIsSuccessful } from '../../../shared/redux/reducers/UserReducer'
import type { RootState } from '../../../shared/redux/store'

const styles = {
  p: {
    padding: '15px 10px',
  },
}

const SignIn: React.FC = () => {
  const [loginUser, { isLoading, isSuccess, ...rest }] = useLoginUserMutation()
  const dispatch = useDispatch()
  const userFromStore = useSelector((state: RootState) => state.user.info)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      email: 'admin@scs.com',
      password: 'password',
    },
  })

  const onSubmit = async (d: any) => {
    try {
      const user = await loginUser(d)
      dispatch(loginIsSuccessful(user))
    } catch (e) {
      throw new Error(e)
    }
  }

  if (isLoading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    )
  }

  if (userFromStore?.email) {
    return (
      <Box>
        <Typography>Email: {userFromStore.email}</Typography>
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

        <Button type="submit">Submit</Button>
      </Paper>
    </Box>
  )
}

export { SignIn }
