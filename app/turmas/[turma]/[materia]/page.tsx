import { alunosMockados } from '@/app/alunoMockado';
import ErrorPage from '@/app/components/ErrorPage';
import Title from '@/app/components/Text/Title';
import AlunosDaTurma from '@/app/components/alunos/AlunosDaTurma';
import Header from '@/app/components/partials/Header';
import { professor } from '@/app/professorMockado';
import {
  doesProfessorTeachHere,
  doesProfessorTeachThis,
} from '@/app/utils/doesProfessorTeachHere';
import { er } from '@/app/utils/errorUtils';
import { materias } from '@/app/utils/materias';
import { turmas } from '@/app/utils/turmas';
import { Box } from '@mui/material';

type Props = { params: { turma: string; materia: string } };

const MateriaPage = ({ params: { turma, materia } }: Props) => {
  try {
    const turmaObj = turmas.find((t) => t.slug === turma)!;
    if (!turmaObj) er('Essa turma ' + turma + ' não existe.');
    const materiaObj = materias.find((m) => m.slug === materia)!;
    if (!materiaObj) er('Essa matéria ' + materia + ' não existe.');
    if (!doesProfessorTeachHere(professor, turmaObj))
      er('Você não dá aula na ' + turmaObj.turma + '.');
    if (!doesProfessorTeachThis(professor, materiaObj.materia))
      er('Você não dá aula de ' + materiaObj.materia + '.');
    const alunosDaTurma = alunosMockados.filter(
      (alunoMock) => alunoMock.matriculado && alunoMock.turma === turma
    );
    if (!alunosDaTurma.length)
      er('Essa turma aparentemente ainda não tem alunos.');
    let quantidadeDeBimestres = 0;
    const bimestresDeAlgumaMateria = alunosDaTurma[0].materias[0];
    for (let i = 0; i < bimestresDeAlgumaMateria.bimestres.length; i++) {
      const { comportamento, presenca, prova, teste, tarefas } =
        bimestresDeAlgumaMateria.bimestres[i];
      if (
        !Number.isInteger(comportamento) ||
        !Number.isInteger(presenca) ||
        !Number.isInteger(prova) ||
        !Number.isInteger(teste) ||
        !Number.isInteger(tarefas)
      ) {
        quantidadeDeBimestres = i;
        break;
      }
    }
    return (
      <Box sx={{ textAlign: 'center' }}>
        <Header />
        <Box sx={{ padding: '0 1rem' }}>
          <Title>{turmaObj.turma}</Title>
          <h3>{materiaObj.materia}</h3>
          <AlunosDaTurma
            alunosDaTurma={alunosDaTurma}
            materiaObj={materiaObj}
            quantidadeDeBimestres={quantidadeDeBimestres}
          />
        </Box>
      </Box>
    );
  } catch (error) {
    return <ErrorPage error={error as Error} />;
  }
};

export default MateriaPage;
