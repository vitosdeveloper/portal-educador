'use client';
import { Box, Button, Paper, TableContainer } from '@mui/material';
import Header from '@/app/components/partials/Header';
import Title from '@/app/components/Text/Title';
import Skeleton from '@mui/material/Skeleton';
const Loading = () => (
  <Box sx={{ textAlign: 'center' }}>
    <Header />
    <Box sx={{ padding: '0 1rem', margin: '0 auto' }}>
      <Skeleton sx={{ margin: '0 auto' }} variant='text'>
        <Title>6º Ano Do Ensino Fundamental</Title>
      </Skeleton>
      <Skeleton variant='text' sx={{ margin: '0 auto' }}>
        <h3>Geografia</h3>
      </Skeleton>
      <Button sx={{ margin: '0 auto' }} variant='outlined'>
        Editar
      </Button>
      <Skeleton
        variant='rectangular'
        sx={{ maxWidth: '879px', height: '326px', margin: '1rem auto 0 auto' }}
      />
      <Skeleton
        variant='rectangular'
        sx={{
          maxWidth: '879px',
          height: '326px',
          margin: '1rem auto 1rem auto',
        }}
      />
      <Skeleton
        variant='rectangular'
        sx={{ maxWidth: '879px', height: '326px', margin: '1rem auto 0 auto' }}
      />
      <Skeleton
        variant='rectangular'
        sx={{ maxWidth: '879px', height: '326px', margin: '1rem auto 0 auto' }}
      />
      <Skeleton
        variant='rectangular'
        sx={{ maxWidth: '879px', height: '326px', margin: '1rem auto 0 auto' }}
      />
      <Skeleton
        variant='rectangular'
        sx={{ maxWidth: '879px', height: '326px', margin: '1rem auto 0 auto' }}
      />
    </Box>
  </Box>
);

export default Loading;
