import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { SignIn } from './SignIn'

const AuthRoute: React.FC = () => {
  // const handleFetch = async () => {
  //   try {
  //     const response = await fetch('http')
  //   } catch (e) {
  //     console.log('Error:', e)
  //   }
  // }
  return (
    <Box>
      <Box sx={{ backgroundColor: '#222', p: 2, borderRadius: 2, mb: 2 }}>
        <Typography sx={{ fontSize: '24px', mb: 2 }}>Sign In</Typography>
        {/* <Link to="/auth/create">Create New Account</Link> */}
        <SignIn />
      </Box>
      <Box sx={{ backgroundColor: '#222', p: 2, borderRadius: 2 }}>
        <Typography sx={{ fontSize: '24px', mb: 2 }}>Create Account</Typography>
        <Link to="/auth/create">Create New Account</Link>
      </Box>
    </Box>
  )
}

export { AuthRoute }
