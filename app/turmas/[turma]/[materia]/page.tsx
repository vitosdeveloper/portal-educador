import ErrorPage from '@/app/components/ErrorPage';
import Title from '@/app/components/Text/Title';
import AlunosDaTurma from '@/app/components/alunos/AlunosDaTurma';
import Header from '@/app/components/partials/Header';
import { getProfessorBy } from '@/app/db/getProfessorBy';
import { getStudentsBy } from '@/app/db/getStudentsBy';
import {
  doesProfessorTeachHere,
  doesProfessorTeachThis,
} from '@/app/utils/doesProfessorTeachHere';
import { er, errors } from '@/app/utils/errorUtils';
import { isJwtValid } from '@/app/utils/isJwtValid';
import { IProfessor } from '@/app/utils/isProfessor';
import { materias } from '@/app/utils/materias';
import { quantidadeDeBimestres } from '@/app/utils/quantidadeDeBimestres';
import { turmas } from '@/app/utils/turmas';
import { isStudent } from '@/types/Student';
import { Box } from '@mui/material';

type Props = { params: { turma: string; materia: string } };

const MateriaPage = async ({ params: { turma, materia } }: Props) => {
  try {
    const { username } = isJwtValid();
    const professor = await getProfessorBy({ login: username });

    const turmaObj = turmas.find((t) => t.slug === turma)!;
    if (!turmaObj) er(errors.turma(turma));
    const materiaObj = materias.find((m) => m.slug === materia)!;
    if (!materiaObj) er(errors.materia(materia));
    if (!doesProfessorTeachHere(professor as IProfessor, turmaObj))
      er(errors.wrongProfessor(turmaObj.turma));
    if (!doesProfessorTeachThis(professor as IProfessor, materiaObj.materia))
      er(errors.wrongMateria(materiaObj.materia));
    const query = await getStudentsBy({ turma });
    if (!query) er(errors.dbAluno);
    const queryWithId = query!.map((a) => ({
      ...a,
      _id: String(a._id),
    }));
    const alunosDaTurma = queryWithId.filter(isStudent);
    if (!alunosDaTurma) er(errors.dbAluno);
    if (!alunosDaTurma?.length) er(errors.lonelyRoom);
    const quantidadeBimestres = quantidadeDeBimestres(
      alunosDaTurma![0].materias[0].bimestres
    );

    return (
      <Box sx={{ textAlign: 'center' }}>
        <Header />
        <Box sx={{ padding: '0 1rem' }}>
          <Title>{turmaObj.turma}</Title>
          <h3>{materiaObj.materia}</h3>
          <AlunosDaTurma
            alunosDaTurma={alunosDaTurma}
            materiaObj={materiaObj}
            quantidadeDeBimestres={quantidadeBimestres}
          />
        </Box>
      </Box>
    );
  } catch (error) {
    return <ErrorPage error={error as Error} />;
  }
};

export default MateriaPage;
