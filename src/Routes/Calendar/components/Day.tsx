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
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import {
  DragDropContext,
  Droppable,
  Draggable,
  OnDragEndResponder,
  DropResult,
} from 'react-beautiful-dnd'

import type { Product, ScheduledProduct } from '../../../types'
import { getColorForTypeOfProduct } from '../../../shared/ColorMap'
import { ScheduledProductDragAndDrop } from './ScheduledProductDragAndDrop'

interface Props extends ScheduledProduct {
  handleOpenAddProductModal: (x: { day: string; is_am: boolean }) => void
  handleReorderProductsForDay: (
    day: string,
    result: any,
    is_am: boolean,
  ) => void
  handleAddToDay: (args: {
    day: string
    productId: string
    idToRemove?: string | number
    is_am: boolean
  }) => void
  items: {
    am: ScheduledProduct[]
    pm: ScheduledProduct[]
  }
  products: void | Product[] | undefined
}

const Day: React.FC<Props> = ({
  items,
  day = 'SUN',
  handleOpenAddProductModal,
  handleReorderProductsForDay,
  handleAddToDay,
  id,
}) => {
  const style = {
    minHeight: '100px',
    width: '200px',
    padding: '5px',
    border: '1px solid #9e9e9e',
    borderRadius: '5px',
    margin: '0px 5px',
  }

  function onDragEnd(result: DropResult, is_am: boolean) {
    if (
      !result.destination ||
      result.destination.index === result.source.index
    ) {
      return
    }

    handleReorderProductsForDay(day, result, is_am)
  }

  const amItems = items.am || []
  const pmItems = items.pm || []

  return (
    <div style={style}>
      <Box sx={{ p: 2 }}>
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: 600,
          }}
          color="#9e9e9e"
        >
          {day}
        </Typography>
      </Box>

      {/* AM */}
      <Box>
        <IconButton
          onClick={() => handleOpenAddProductModal({ day, is_am: true })}
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <AddIcon /> AM
        </IconButton>
      </Box>
      <ScheduledProductDragAndDrop
        title="AM"
        onDragEnd={onDragEnd}
        items={amItems}
        handleAddToDay={handleAddToDay}
        day={day}
      />

      {/* PM */}
      <Box>
        <IconButton
          onClick={() => handleOpenAddProductModal({ day, is_am: false })}
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <AddIcon /> PM
        </IconButton>
      </Box>
      <ScheduledProductDragAndDrop
        title="PM"
        onDragEnd={onDragEnd}
        items={pmItems}
        handleAddToDay={handleAddToDay}
        day={day}
      />
    </div>
  )
}

export { Day }
