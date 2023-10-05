import { turmas } from '@/app/utils/turmas';
import React from 'react';
import Materia from './Materia';
import { Box, List } from '@mui/material';

type Props = { turma: string };

const MateriasLista = ({ turma }: Props) => {
  const { materias, slug } = turmas.find((i) => i.turma === turma)!;
  return (
    <Box
      component='div'
      sx={{
        width: '100%',
        maxWidth: 360,
        backgroundColor: '#fff',
        margin: '0 auto',
      }}
    >
      <List component='nav' aria-label='Turmas'>
        {materias.map((materia, index) => (
          <Materia
            key={materia}
            materia={materia}
            slug={slug}
            index={index}
            turma={turma}
            materiasLength={materias.length}
          />
        ))}
      </List>
    </Box>
  );
};

export default MateriasLista;
