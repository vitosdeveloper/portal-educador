import { Box } from '@mui/material';
import Header from '../components/partials/Header';
import Title from '../components/Text/Title';
import TurmasLista from '../components/turmas/TurmasLista';
import { professor } from '../professorMockado';

const TurmasPage = () => {
  return (
    <>
      <Header />
      <Box sx={{ textAlign: 'center', padding: '0 1rem' }}>
        <Title>Turmas</Title>
        <h3> Bem-vindo, professor {professor.nome}.</h3>
        <TurmasLista professor={professor} />
      </Box>
    </>
  );
};

export default TurmasPage;
