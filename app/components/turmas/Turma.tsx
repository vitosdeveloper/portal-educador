import { Box, Divider, ListItemButton, ListItemText } from '@mui/material';
import Link from 'next/link';
import React from 'react';

type Props = {
  turmas: {
    turma: string;
    slug: string;
    materias: string[];
  }[];
  turmaObj: {
    turma: string;
    slug: string;
    materias: string[];
  };
  doesProfessorTeachHere: boolean;
  index: number;
};

const Turma = ({ turmas, turmaObj, doesProfessorTeachHere, index }: Props) => {
  return (
    <React.Fragment>
      <Box
        component={doesProfessorTeachHere ? Link : 'span'}
        href={`/turmas/${turmaObj.slug}`}
        sx={{
          textDecoration: 'none',
          color: doesProfessorTeachHere ? '#1976d2' : '#333',
        }}
      >
        <ListItemButton disabled={!doesProfessorTeachHere}>
          <ListItemText primary={turmaObj.turma} />
        </ListItemButton>
      </Box>
      {index < turmas.length - 1 && <Divider />}
    </React.Fragment>
  );
};

export default Turma;
