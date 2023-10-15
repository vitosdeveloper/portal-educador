import ErrorPage from '@/app/components/ErrorPage';
import Title from '@/app/components/Text/Title';
import MateriasLista from '@/app/components/materias/MateriasLista';
import Header from '@/app/components/partials/Header';
import { getProfessorBy } from '@/app/db/getProfessorBy';
import { doesProfessorTeachHere } from '@/app/utils/doesProfessorTeachHere';
import { er } from '@/app/utils/errorUtils';
import { isJwtValid } from '@/app/utils/isJwtValid';
import { IProfessor } from '@/app/utils/isProfessor';
import { turmas } from '@/app/utils/turmas';
import { Box } from '@mui/material';

type Props = {
  params: { turma: string };
};

const TurmaPage = async (props: Props) => {
  try {
    const { username } = isJwtValid();
    const professor = await getProfessorBy({ login: username });
    const turma = turmas.find((turma) => turma.slug === props.params.turma);
    if (!turma) return er('Essa turma ' + props.params.turma + ' não existe.');
    const profTeachHere = doesProfessorTeachHere(
      professor as IProfessor,
      turma
    );
    if (!profTeachHere) return er('Você não dá aulas nessa turma.');
    return (
      <>
        <Header />
        <Box sx={{ padding: '0 1rem' }}>
          <Title>{turma?.turma}</Title>
          <MateriasLista
            turma={turma.turma}
            professor={professor as IProfessor}
          />
        </Box>
      </>
    );
  } catch (error) {
    return <ErrorPage error={error as Error} />;
  }
};

export default TurmaPage;
