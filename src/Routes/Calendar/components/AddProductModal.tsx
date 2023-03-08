import * as React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Select, MenuItem } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ModalBase from '@mui/material/Modal'
import {
  GetProductsReturn,
  TransformedGetProductsReturn,
} from '../../../shared/redux/services/api'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

interface P {
  open: { day: string; is_am: boolean } | null
  handleClose: any
  handleAddToDay: (args: {
    day: string
    productId: string
    idToRemove?: string | number
    is_am: boolean
  }) => void
  products: TransformedGetProductsReturn
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
    if (!open) {
      throw new Error('error with AddProductModal')
    }
    // handleAddToDay(open.day, data.product)
    handleAddToDay({
      day: open.day,
      productId: data.product,
      is_am: open.is_am,
    })
    handleClose()
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
          <Typography sx={{ mb: 2 }} variant="h5">
            Add Product:
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Controller
              name="product"
              control={control}
              render={({ field }) => (
                <Select {...field} sx={{ mb: 2 }}>
                  {products?.products.map((d) => (
                    <MenuItem key={d.id} value={d.id}>
                      {d.brand} - {d.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <Button type="submit" variant="contained" sx={{ mb: 1 }}>
              Add
            </Button>
            <Button type="reset" variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </ModalBase>
    </div>
  )
}

export { AddProductModal }
