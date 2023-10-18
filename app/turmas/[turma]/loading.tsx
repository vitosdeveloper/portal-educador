'use client';
import { Box } from '@mui/material';
import Header from '@/app/components/partials/Header';
import Title from '@/app/components/Text/Title';
import Skeleton from '@mui/material/Skeleton';
const Loading = () => (
  <>
    <Header />
    <Box sx={{ padding: '0 1rem' }}>
      <Skeleton animation='wave' variant='text' sx={{ margin: '0 auto' }}>
        <Title>1º Ano Do Ensino Médio</Title>
      </Skeleton>
      <Box
        component='div'
        sx={{
          width: '100%',
          maxWidth: 360,
          margin: '0 auto',
        }}
      >
        <Skeleton animation='wave' variant='rectangular' height='456px' />
      </Box>
    </Box>
  </>
);

export default Loading;
