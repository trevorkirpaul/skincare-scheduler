import { useState } from 'react'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { ProductsRoute } from './Routes/Products'
import { CreateProductRoute } from './Routes/CreateProduct'
import { CalendarRoute } from './Routes/Calendar'
import DesktopMenu from './shared/DesktopMenu'

// Create a client
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>,
  },
  {
    path: '/products',
    element: <ProductsRoute />,
  },
  {
    path: '/products/new',
    element: <CreateProductRoute />,
  },
  {
    path: '/calendar',
    element: <CalendarRoute />,
  },
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DesktopMenu>
        <RouterProvider router={router} />
      </DesktopMenu>
    </QueryClientProvider>
  )
}

export default App
