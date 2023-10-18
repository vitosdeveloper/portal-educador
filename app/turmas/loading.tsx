'use client';
import Link from 'next/link';
import Title from '../components/Text/Title';
import Header from '../components/partials/Header';
import { Box, ListItemButton, ListItemText, Skeleton } from '@mui/material';
import { turmas } from '../utils/turmas';

const Loading = () => (
  <>
    <Header />
    <Box sx={{ textAlign: 'center', padding: '0 1rem' }}>
      <Title>Turmas</Title>
      <h3>Bem-vindo, professor.</h3>
      <Box
        sx={{
          width: '100%',
          maxWidth: 360,
          backgroundColor: '#fff',
          margin: '0 auto',
        }}
      >
        {turmas.map((turmaObj, index) => {
          return (
            <Box
              component={Link}
              href={`/turmas/${turmaObj.slug}`}
              sx={{
                textDecoration: 'none',
                color: '#1976d2',
              }}
              key={turmaObj.slug}
            >
              <ListItemButton>
                <Skeleton animation='wave' key={turmaObj.slug} variant='text'>
                  <ListItemText primary={turmaObj.turma} />
                </Skeleton>
              </ListItemButton>
            </Box>
          );
        })}
      </Box>
    </Box>
  </>
);

export default Loading;
