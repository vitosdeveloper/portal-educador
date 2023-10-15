import ErrorPage from '@/app/components/ErrorPage';
import Title from '@/app/components/Text/Title';
import Header from '@/app/components/partials/Header';
import ProfessorProfile from '@/app/components/professors/ProfessorProfile';
import { getProfessorBy } from '@/app/db/getProfessorBy';
import { er } from '@/app/utils/errorUtils';
import { isJwtValid } from '@/app/utils/isJwtValid';
import { IProfessor } from '@/app/utils/isProfessor';
import { Box } from '@mui/material';
import { ObjectId } from 'mongodb';
import React from 'react';

type Props = { params: { id: string } };

const ProfessorsPage = async ({ params }: Props) => {
  try {
    const currentLogin = isJwtValid().username;
    const currentUser = await getProfessorBy({ login: currentLogin });
    if (!currentUser || (currentUser && !(currentUser as IProfessor)?.diretor))
      er('');
    const professorToEdit = await getProfessorBy({
      _id: new ObjectId(params.id),
    });
    if (professorToEdit && 'senha' in professorToEdit) {
      delete professorToEdit.senha;
    }
    return (
      <>
        <Header />
        <Box sx={{ padding: '1rem' }}>
          <Title>{(professorToEdit as IProfessor).nome}</Title>
          <ProfessorProfile professor={professorToEdit as IProfessor} />
        </Box>
      </>
    );
  } catch (error) {
    if (error instanceof Error)
      return <ErrorPage error={new Error('Você não é diretor.')} />;
  }
};

export default ProfessorsPage;
