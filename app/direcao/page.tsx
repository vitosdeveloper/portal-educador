import Header from '../components/partials/Header';
import Title from '../components/Text/Title';
import { professor } from '../professorMockado';
import { er } from '../utils/errorUtils';

const DirecaoPage = () => {
  if (!professor.diretor) return er('Você não é diretor.');
  return (
    <>
      <Header />
      <Title>Direção</Title>
    </>
  );
};

export default DirecaoPage;
