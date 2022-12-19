import * as React from 'react'
import Box from '@mui/material/Box'
import TextFieldBase from '@mui/material/TextField'

interface IProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
}

const TextField: React.FC<IProps> = ({ onChange = () => {}, label = '' }) => {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextFieldBase
        id="outlined-basic"
        label={label}
        variant="outlined"
        onChange={onChange}
      />
    </Box>
  )
}
export default TextField
