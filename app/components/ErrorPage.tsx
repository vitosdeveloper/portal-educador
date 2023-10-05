import React from 'react';
import { Box, Button } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import Header from './partials/Header';
import Error from './form/Error';
import Link from 'next/link';

type Props = { error: Error };

const ErrorPage = ({ error }: Props) => {
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
          textAlign: 'center',
        }}
      >
        <div>
          <SchoolIcon sx={{ color: '#d32f2f', fontSize: '15rem' }} />
          <Error error={error?.message} bigger />
        </div>
        <Link href='/turmas'>
          <Button variant='outlined'>Voltar</Button>
        </Link>
      </Box>
    </>
  );
};

export default ErrorPage;
