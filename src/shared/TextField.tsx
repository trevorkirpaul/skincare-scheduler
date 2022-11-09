import * as React from 'react'
import Box from '@mui/material/Box'
import TextFieldBase from '@mui/material/TextField'

const TextField = () => {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextFieldBase id="outlined-basic" label="Outlined" variant="outlined" />
    </Box>
  )
}
export default TextField
