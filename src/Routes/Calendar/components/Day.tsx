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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import type { Product, ScheduledProduct } from '../../../types'
import { getColorForTypeOfProduct } from '../../../shared/ColorMap'

interface Props extends ScheduledProduct {
  handleOpenAddProductModal: any
  handleReorderProductsForDay: (day: string, result: any) => void
  handleAddToDay: (
    day: string,
    product: string,
    idToRemove?: number | string,
  ) => void
  items: ScheduledProduct[]
  products: void | Product[] | undefined
}

const Day: React.FC<Props> = ({
  items,
  day = 'SUN',
  handleOpenAddProductModal,
  handleReorderProductsForDay,
  products,
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
                  const thisProduct: ScheduledProduct = item
                  if (!thisProduct) return null
                  return (
                    <Draggable
                      key={item?.id}
                      draggableId={`list-${thisProduct?.id}`}
                      index={i}
                    >
                      {(provided: any) => (
                        <ListItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            background: getColorForTypeOfProduct(),
                            alignItems: 'baseline',
                          }}
                        >
                          <ListItemText
                            sx={{
                              color: 'black',
                            }}
                            primary={thisProduct.name}
                            secondary={thisProduct.brand}
                            secondaryTypographyProps={{
                              style: { color: '#383838' },
                            }}
                          />

                          <IconButton
                            onClick={() =>
                              handleAddToDay(day, `${item.product_id}`, item.id)
                            }
                            aria-label="upload picture"
                            component="label"
                          >
                            <HighlightOffIcon />
                          </IconButton>
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
