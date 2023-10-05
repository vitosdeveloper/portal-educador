import Error from '../components/form/Error';
import Header from '../components/partials/Header';
import Title from '../components/Text/Title';

const DirecaoPage = () => {
  return (
    <>
      <Header />
      <Title>Direção</Title>
      <Error error='Você não é diretor.' />
    </>
  );
};

export default DirecaoPage;
