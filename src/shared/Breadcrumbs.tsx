import * as React from 'react'
import Typography from '@mui/material/Typography'
import BreadcrumbsBase from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

function handleClick(event: React.SyntheticEvent) {
  event.preventDefault()
  console.info('You clicked a breadcrumb.')
}

const getURL = () => {
  return window.location.pathname
}

const Breadcrumbs = () => {
  const url = getURL()
    .split('/')
    .filter((x) => x !== '')

  return (
    <div role="presentation" onClick={handleClick}>
      <BreadcrumbsBase aria-label="breadcrumb">
        {url.map((u) => (
          <Link underline="hover" color="inherit" href="/">
            {u}
          </Link>
        ))}
        {/* <Link underline="hover" color="inherit" href="/">
          MUI
        </Link>
        <Link underline="hover" color="inherit" href={'#'}>
          Core
        </Link>
        <Typography color="text.primary">Breadcrumbs</Typography> */}
      </BreadcrumbsBase>
    </div>
  )
}

export default Breadcrumbs
