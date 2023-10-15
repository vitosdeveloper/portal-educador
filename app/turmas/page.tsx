import { Box } from '@mui/material';
import Header from '../components/partials/Header';
import Title from '../components/Text/Title';
import TurmasLista from '../components/turmas/TurmasLista';
import { isJwtValid } from '../utils/isJwtValid';
import { getProfessorBy } from '../db/getProfessorBy';
import { IProfessor } from '../utils/isProfessor';

const TurmasPage = async () => {
  const { username } = isJwtValid();
  const professor = await getProfessorBy({ login: username });

  return (
    <>
      <Header />
      <Box sx={{ textAlign: 'center', padding: '0 1rem' }}>
        <Title>Turmas</Title>
        <h3> Bem-vindo, professor {(professor as IProfessor)?.nome}.</h3>
        <TurmasLista professor={professor as IProfessor} />
      </Box>
    </>
  );
};

export default TurmasPage;
