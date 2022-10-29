import * as React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Select, MenuItem } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ModalBase from '@mui/material/Modal'
import type { Product } from '../../../types'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

interface P {
  open: any
  handleClose: any
  handleAddToDay: (day: string, product: string) => void
  products: void | Product[] | undefined
}

const AddProductModal: React.FC<P> = ({
  open,
  handleAddToDay,
  handleClose,
  products,
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      product: '',
    },
  })

  const onSubmit = (data: any) => {
    handleAddToDay(open, data.product)
  }

  return (
    <div>
      <ModalBase
        open={!!open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={style}>
          <Controller
            name="product"
            control={control}
            render={({ field }) => (
              <Select {...field}>
                {products.map((d) => (
                  <MenuItem key={d._id} value={d._id}>
                    {d.brand} - {d.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <Button type="submit">Add</Button>
        </Box>
      </ModalBase>
    </div>
  )
}

export { AddProductModal }
