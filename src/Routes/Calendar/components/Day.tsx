import {
  Typography,
  IconButton,
  Chip,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import type { Product } from '../../../types'

interface Props {
  day: string
  handleOpenAddProductModal: any
  items: string[]
  products: void | Product[] | undefined
}

const Day: React.FC<Props> = ({
  items,
  day = 'SUN',
  handleOpenAddProductModal,
  products,
}) => {
  const style = {
    minHeight: '100px',
    width: '200px',
    padding: '5px',
    border: '1px solid #9e9e9e',
    borderRadius: '5px',
    margin: '0px 5px',
  }
  return (
    <div style={style}>
      <Box>
        <Typography color="#9e9e9e">{day}</Typography>
      </Box>

      <Box>
        <IconButton
          onClick={handleOpenAddProductModal}
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <AddIcon />
        </IconButton>
      </Box>

      <List>
        {items.map((item) => {
          const thisProduct = products?.find((p) => p._id === item)
          return (
            <ListItem key={item}>
              <ListItemText
                primary={thisProduct?.name || item}
                secondary={thisProduct?.brand || undefined}
              >
                {products?.find((p) => p._id === item)?.name || item}
              </ListItemText>
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}

export { Day }
