import * as React from 'react'
import {
  IconButton,
  Box,
  TablePagination,
  Table as TableBase,
  TableBody,
  TableFooter,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
} from '@mui/material'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import { useSearchParams } from 'react-router-dom'

import type { Product } from '../../../types'

function TablePaginationActions(props: any) {
  const theme = useTheme()

  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (event: any) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event: any) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event: any) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event: any) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  )
}

interface Props {
  products: Product[] | undefined
  pageCount?: number
  setLimit: (a: any) => void
  setSkip: (a: any) => void
  limitInState?: string | null
  skipInState?: string | null
  pageInState: number
  setPageInState: React.Dispatch<React.SetStateAction<number>>
}

const Table: React.FC<Props> = ({
  products = [],
  pageCount = 0,
  setLimit,
  setSkip,
  limitInState,
  pageInState,
  setPageInState,
}) => {
  return (
    <TableContainer component={Paper}>
      <TableBase sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10]}
              colSpan={4}
              count={pageCount}
              rowsPerPage={parseInt(limitInState || '10')}
              page={pageInState}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={(event, nextPage) => {
                const currentLimit = parseInt(limitInState || '10')
                const nextSkip = nextPage * currentLimit
                setSkip(nextSkip)
                setPageInState(nextPage)
              }}
              onRowsPerPageChange={({ currentTarget: { value } }) =>
                setLimit(value)
              }
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Brand</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell align="right">{product.brand}</TableCell>
              <TableCell align="right">{product.type || 'n/a'}</TableCell>
              <TableCell align="right">{product.id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10]}
              colSpan={4}
              count={pageCount}
              rowsPerPage={parseInt(limitInState || '10')}
              page={pageInState}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={(event, nextPage) => {
                const currentLimit = parseInt(limitInState || '10')
                const nextSkip = nextPage * currentLimit
                setSkip(nextSkip)
                setPageInState(nextPage)
              }}
              onRowsPerPageChange={({ currentTarget: { value } }) =>
                setLimit(value)
              }
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </TableBase>
    </TableContainer>
  )
}

export default Table
