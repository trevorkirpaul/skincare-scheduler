import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '../../../types'

export interface ProductsState {
  products: Product[]
}

const initialState: ProductsState = {
  products: [],
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    loadProducts: (state, action) => {
      console.log('state', state)
      console.log('action', action)
    },
  },
})

// Action creators are generated for each case reducer function
export const { loadProducts } = productsSlice.actions

export default productsSlice.reducer
