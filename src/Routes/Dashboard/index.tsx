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
import { List, ListItem, ListItemText, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { uniq } from 'lodash'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

import {
  useGetIngredientsForScheduledProductsQuery,
  useGetUserQuery,
} from '../../shared/redux/services/api'

ChartJS.register(ArcElement, Tooltip, Legend)

var stringToColour = function (str) {
  var hash = 0
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  var colour = '#'
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff
    colour += ('00' + value.toString(16)).substr(-2)
  }
  return colour
}

const DashboardRoute: React.FC = () => {
  const { data: userData } = useGetUserQuery()

  const { data: scheduledProductIngredients, isLoading } =
    useGetIngredientsForScheduledProductsQuery(userData?.id)

  if (isLoading || !scheduledProductIngredients)
    return (
      <Box>
        <Typography>Loading...</Typography>
      </Box>
    )

  const allIngredients: number[] = scheduledProductIngredients.reduce(
    (prev, curr) => {
      return [...prev, ...curr.ingredients]
    },
    [],
  )

  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const labels = uniq(allIngredients).sort()
  console.log('labels', labels)
  const realData = {
    labels,
    datasets: [
      {
        label: 'skincare ingredient',
        data: allIngredients,
        backgroundColor: uniq(allIngredients).map((c) => stringToColour(c)),
      },
    ],
  }

  return (
    <Box>
      <Typography>Dashboard</Typography>
      <Box sx={{ width: '40%', height: '40%' }}>
        <Pie
          // data={data}
          data={realData}

          // data={{
          //   labels: uniq(allIngredients).sort(),
          //   datasets: [
          //     {
          //       label: 'i',
          //       data: allIngredients,
          //     },
          //   ],
          // }}
        />
      </Box>
      {/* <List>
        {uniq(allIngredients)
          .sort()
          .map((ai) => {
            return (
              <ListItem key={ai}>
                <ListItemText primary={ai} />
              </ListItem>
            )
          })}
      </List> */}
    </Box>
  )
}

export { DashboardRoute }
