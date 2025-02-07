import { Alert, AlertTitle, Box } from '@mui/material'
import React from 'react'

function ErrorPage() {
  return (
    <Box p={4}>
        <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
            Error while loading the page.Please try later or Refreshing page may resolve it.
        </Alert>
    </Box>
  )
}

export default ErrorPage