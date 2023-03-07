import React from 'react'
import { useDispatch } from 'react-redux'
import {
  Paper,
  Button,
  Typography,
  Input,
  Box,
  CircularProgress,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import {
  useLazyLogoutUserQuery,
  useLoginUserMutation,
} from '../../../shared/redux/services/api'
import { loginIsSuccessful } from '../../../shared/redux/reducers/UserReducer'
import { getCachedUserData } from '../../../shared/getCachedUserData'

const styles = {
  p: {
    padding: '15px 10px',
  },
}

const SignIn: React.FC = () => {
  const navigate = useNavigate()
  const [loginUser, { isLoading, isSuccess, ...rest }] = useLoginUserMutation()
  const dispatch = useDispatch()
  const cachedUserData = getCachedUserData()

  // sign out
  const [triggerLogout] = useLazyLogoutUserQuery()
  const handleLogOut = async () => {
    try {
      const logoutResponse = await triggerLogout('logout')

      if (logoutResponse.status === 'fulfilled') {
        localStorage.clear()
        navigate('/') // @TODO: change to a 'successfully signed out page'
      }
    } catch (e) {
      throw new Error('Failed to logout', e)
    }
  }

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

  if (cachedUserData && cachedUserData.email) {
    return (
      <Box>
        <Typography sx={{ mb: 5 }}>Email: {cachedUserData.email}</Typography>
        <Box>
          <Button variant="outlined" onClick={handleLogOut}>
            Log Out
          </Button>
        </Box>
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
