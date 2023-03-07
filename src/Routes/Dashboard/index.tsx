/**
 * TODO
 *
 * - create dashboard view where we show ingredients uniquely contained in products which the user has
 * designated as dangerous / allergic to
 *
 * ie: 2 products:
 * - product 1 - ingredients = [red, blue] - allergic to
 * - product 2 - ingredients = [red, green] - not allergic to
 *
 *
 * our dashbaord view will list blue as a dangerous ingredient
 * we can mark items as potentially dangerous which contain that isolated ingredient
 *
 */
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const DashboardRoute: React.FC = () => {
  return (
    <Box>
      <Typography>Dashboard</Typography>
    </Box>
  )
}

export { DashboardRoute }
