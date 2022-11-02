import React from 'react';
import { Box, CircularProgress } from '@mui/material';

function LoadingSpinner() {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default LoadingSpinner;
