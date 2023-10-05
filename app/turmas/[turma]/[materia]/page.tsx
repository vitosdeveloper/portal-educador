import ErrorPage from '@/app/components/ErrorPage';
import Title from '@/app/components/Text/Title';
import Header from '@/app/components/partials/Header';
import { professor } from '@/app/professorMockado';
import {
  doesProfessorTeachHere,
  doesProfessorTeachThis,
} from '@/app/utils/doesProfessorTeachHere';
import { er } from '@/app/utils/errorUtils';
import { materias } from '@/app/utils/materias';
import { turmas } from '@/app/utils/turmas';
import { Box } from '@mui/material';
import React from 'react';

type Props = { params: { turma: string; materia: string } };

const MateriaPage = ({ params: { turma, materia } }: Props) => {
  try {
    const turmaObj = turmas.find((t) => t.slug === turma)!;
    const materiaObj = materias.find((m) => m.slug === materia)!;
    if (!turmaObj) return er('Essa turma ' + turma + ' não existe.');
    if (!doesProfessorTeachHere(professor, turmaObj))
      er('Você não dá aula na ' + turmaObj.turma + '.');
    if (!doesProfessorTeachThis(professor, materiaObj.materia))
      er('Você não dá aula de ' + materiaObj.materia + '.');
    return (
      <Box sx={{ textAlign: 'center' }}>
        <Header />
        <Title>{turmaObj.turma}</Title>
        <h3>{materiaObj.materia}</h3>
      </Box>
    );
  } catch (error) {
    return <ErrorPage error={error as Error} />;
  }
};

export default MateriaPage;
