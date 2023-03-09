import React from 'react'
import {
  Typography,
  List,
  Box,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material'
import {
  DragDropContext,
  Droppable,
  Draggable,
  OnDragEndResponder,
  DropResult,
} from 'react-beautiful-dnd'
import { ScheduledProduct } from '../../../types'
import { getColorForTypeOfProduct } from '../../../shared/ColorMap'
import {
  HighlightOff as HighlightOffIcon,
  AddCircleOutline as PlusIcon,
} from '@mui/icons-material'

interface IProps {
  onDragEnd: (x: DropResult, is_am: boolean) => void
  // used as header and list id
  title: String
  items: ScheduledProduct[]
  handleAddToDay: (args: {
    day: string
    productId: string
    idToRemove?: string | number
    is_am: boolean
  }) => void
  day: string
  addScheduledProductOnClick: () => void
}

const ScheduledProductDragAndDrop: React.FC<IProps> = ({
  onDragEnd,
  title,
  items,
  handleAddToDay,
  day,
  addScheduledProductOnClick,
}) => {
  return (
    <Box sx={{}}>
      <DragDropContext onDragEnd={(x) => onDragEnd(x, title === 'AM')}>
        <List>
          <Droppable droppableId={`list-${title}`}>
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
                            background: getColorForTypeOfProduct(
                              thisProduct.name,
                            ),
                            alignItems: 'baseline',
                            mb: 1.5,
                            borderRadius: '5px',
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
                              handleAddToDay({
                                day,
                                productId: item.product_id,
                                idToRemove: item.id,
                                is_am: title === 'AM',
                              })
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
          <ListItem
            sx={{
              alignItems: 'baseline',
              mb: 1.5,
              borderRadius: '5px',
              border: '1px solid #666',
              '&:hover': {
                cursor: 'pointer',
                background: '#333',
              },
            }}
            onClick={addScheduledProductOnClick}
          >
            <ListItemText
              sx={{
                color: '#666',
              }}
              primary="Add"
              secondaryTypographyProps={{
                style: { color: '#383838' },
              }}
            />
            <PlusIcon sx={{ color: '#666' }} />
          </ListItem>
        </List>
      </DragDropContext>
    </Box>
  )
}

export { ScheduledProductDragAndDrop }
