import Title from '@/app/components/Text/Title';
import Header from '@/app/components/partials/Header';
import { professor } from '@/app/professorMockado';
import { doesProfessorTeachHere } from '@/app/utils/doesProfessorTeachHere';
import { er } from '@/app/utils/errorUtils';
import { turmas } from '@/app/utils/turmas';
import { Box } from '@mui/material';

type Props = {
  params: { turma: string };
};

const TurmaPage = (props: Props) => {
  const turma = turmas.find((turma) => turma.slug === props.params.turma);
  if (!turma) return er('Essa turma ' + props.params.turma + ' não existe.');
  if (!doesProfessorTeachHere(professor, turma))
    return er('Você não dá aulas nessa turma.');
  return (
    <>
      <Header />
      <Box sx={{ padding: '0 1rem' }}>
        <Title>{turma?.turma}</Title>
      </Box>
    </>
  );
};

export default TurmaPage;
