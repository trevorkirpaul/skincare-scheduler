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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import type { Product } from '../../../types'
import { getColorForTypeOfProduct } from '../../../shared/ColorMap'

interface Props {
  day: string
  handleOpenAddProductModal: any
  handleReorderProductsForDay: (day: string, result: any) => void
  items: string[]
  products: void | Product[] | undefined
}

const Day: React.FC<Props> = ({
  items,
  day = 'SUN',
  handleOpenAddProductModal,
  handleReorderProductsForDay,
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

  function onDragEnd(result: any) {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    handleReorderProductsForDay(day, result)
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
      <DragDropContext onDragEnd={onDragEnd}>
        <List>
          <Droppable droppableId="list-1">
            {(providedDrop: any) => (
              <div ref={providedDrop.innerRef} {...providedDrop.droppableProps}>
                {items.map((item, i) => {
                  const thisProduct = products?.find((p) => p._id === item)
                  return (
                    <Draggable
                      key={item}
                      draggableId={`list-${thisProduct?._id}`}
                      index={i}
                    >
                      {(provided: any) => (
                        <ListItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            background: getColorForTypeOfProduct(
                              thisProduct?.type,
                            ),
                          }}
                        >
                          <ListItemText
                            primary={thisProduct?.name || item}
                            secondary={thisProduct?.brand || undefined}
                          >
                            {products?.find((p) => p._id === item)?.name ||
                              item}
                          </ListItemText>
                        </ListItem>
                      )}
                    </Draggable>
                  )
                })}
                {providedDrop.placeholder}
              </div>
            )}
          </Droppable>
        </List>
      </DragDropContext>
    </div>
  )
}

export { Day }
