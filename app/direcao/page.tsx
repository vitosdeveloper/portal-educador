import { List } from '@mui/material';
import ErrorPage from '../components/ErrorPage';
import Header from '../components/partials/Header';
import ProfessorList from '../components/professors/ProfessorList';
import Title from '../components/Text/Title';
import { getProfessorBy } from '../db/getProfessorBy';
import { er } from '../utils/errorUtils';
import { isJwtValid } from '../utils/isJwtValid';
import { IProfessor } from '../utils/isProfessor';

const DirecaoPage = async () => {
  try {
    const { username } = isJwtValid();
    const professor = await getProfessorBy({ login: username });
    if (!(professor as IProfessor).diretor) return er('Você não é diretor.');
    return (
      <>
        <Header />
        <Title>Direção</Title>
        <ProfessorList />
      </>
    );
  } catch (error) {
    return <ErrorPage error={error as Error} />;
  }
};

export default DirecaoPage;
