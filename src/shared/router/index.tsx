import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'
import { ProductsRoute } from '../../Routes/Products'
import { CreateProductRoute } from '../../Routes/CreateProduct'
import { CalendarRoute } from '../../Routes/Calendar'
import { DashboardRoute } from '../../Routes/Dashboard'
import { AuthRoute } from '../../Routes/Auth'
import { AuthCreateRoute } from '../../Routes/Auth/Create'
import DesktopMenu from '../DesktopMenu'

const routes = [
  {
    path: '/',
    element: <DashboardRoute />,
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
  {
    path: '/auth/create',
    element: <AuthCreateRoute />,
  },
  {
    path: '/auth',
    element: <AuthRoute />,
  },
]

export const Router = () => {
  return (
    <BrowserRouter>
      <DesktopMenu>
        <Routes>
          {routes.map((r) => (
            <Route element={r.element} path={r.path} />
          ))}
        </Routes>
      </DesktopMenu>
    </BrowserRouter>
  )
}
