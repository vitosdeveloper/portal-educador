'use client';
import { Box, Button } from '@mui/material';
import Err from './components/form/Error';
import Header from './components/partials/Header';
import SchoolIcon from '@mui/icons-material/School';
import { useEffect } from 'react';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <>
      <Header />
      <Box
        component='div'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          padding: '0 1rem',
          color: 'black',
        }}
      >
        <div>
          <SchoolIcon sx={{ color: '#d32f2f', fontSize: '15rem' }} />
          <Err error={error?.message} bigger />
        </div>
        <Button variant='outlined'>Voltar</Button>
      </Box>
    </>
  );
};

export default Error;
