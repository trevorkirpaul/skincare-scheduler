import {
  Typography,
  IconButton,
  Button,
  Chip,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import { LightMode, DarkMode } from '@mui/icons-material'
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

const buttonWrapperStyles = {
  p: 0,
  display: 'flex',
  justifyContent: 'flex-end',
  mb: 1,
}

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
  selectedView: 'day' | 'week'
}

const Day: React.FC<Props> = ({
  items,
  day = 'SUN',
  handleOpenAddProductModal,
  handleReorderProductsForDay,
  handleAddToDay,
  id,
  selectedView,
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

  const weekStylesForMainWrapper =
    selectedView === 'week'
      ? {
          mr: 1,
          p: 1,
        }
      : {}

  return (
    <Box
      sx={{
        minHeight: '100px',
        backgroundColor: '#212121',
        p: 2,
        flex: 1,
        ...weekStylesForMainWrapper,
      }}
    >
      {selectedView === 'week' && (
        <Box sx={{ p: 2 }}>
          <Typography>{day}</Typography>
        </Box>
      )}
      {/* AM */}
      <Box sx={buttonWrapperStyles}>
        <Chip label="AM" color="warning" icon={<LightMode />} />
      </Box>
      <Box>
        <ScheduledProductDragAndDrop
          title="AM"
          onDragEnd={onDragEnd}
          items={amItems}
          handleAddToDay={handleAddToDay}
          day={day}
          addScheduledProductOnClick={() =>
            handleOpenAddProductModal({ day, is_am: true })
          }
        />
      </Box>

      {/* PM */}
      <Box sx={buttonWrapperStyles}>
        <Chip label="PM" color="info" icon={<DarkMode />} />
      </Box>
      <ScheduledProductDragAndDrop
        title="PM"
        onDragEnd={onDragEnd}
        items={pmItems}
        handleAddToDay={handleAddToDay}
        day={day}
        addScheduledProductOnClick={() =>
          handleOpenAddProductModal({ day, is_am: false })
        }
      />
    </Box>
  )
}

export { Day }
