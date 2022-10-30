import { useState } from 'react'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from './shared/redux/store'

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
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <DesktopMenu>
          <RouterProvider router={router} />
        </DesktopMenu>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
