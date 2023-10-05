import ErrorPage from '../components/ErrorPage';
import Header from '../components/partials/Header';
import Title from '../components/Text/Title';
import { professor } from '../professorMockado';
import { er } from '../utils/errorUtils';

const DirecaoPage = () => {
  try {
    if (!professor.diretor) return er('Você não é diretor.');
    return (
      <>
        <Header />
        <Title>Direção</Title>
      </>
    );
  } catch (error) {
    return <ErrorPage error={error as Error} />;
  }
};

export default DirecaoPage;
