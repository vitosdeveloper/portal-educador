'use client';
import { Box, Card, CardContent } from '@mui/material';
import Header from '@/app/components/partials/Header';
import Title from '@/app/components/Text/Title';
import Skeleton from '@mui/material/Skeleton';
const Loading = () => (
  <>
    <Header />
    <Box sx={{ padding: '0 1rem', margin: '0 auto' }}>
      <Box
        sx={{
          padding: '1rem',
          maxWidth: '879px',
          margin: '0 auto',
          display: 'grid',
          gap: '1rem',
        }}
      >
        <Card>
          <CardContent>
            <Title>Perfil do estudante</Title>
            <Skeleton width='251px' variant='text' />
            <Skeleton width='68px' variant='text' />
            <Skeleton width='283px' variant='text' />
            <Skeleton width='121px' variant='text' />
          </CardContent>
        </Card>

        <Skeleton variant='rectangular' height='386px' />
        <Skeleton variant='rectangular' height='386px' />
        <Skeleton variant='rectangular' height='386px' />
        <Skeleton variant='rectangular' height='386px' />
        <Skeleton variant='rectangular' height='386px' />
        <Skeleton variant='rectangular' height='386px' />
        <Skeleton variant='rectangular' height='386px' />
        <Skeleton variant='rectangular' height='386px' />
        <Skeleton variant='rectangular' height='386px' />
      </Box>
    </Box>
  </>
);

export default Loading;
