import { alunosMockados } from '@/app/alunoMockado';
import ErrorPage from '@/app/components/ErrorPage';
import Title from '@/app/components/Text/Title';
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
import React from 'react';

type Props = { params: { turma: string; materia: string } };

//apenas organizando os dados para fazer uma bela table depois
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
    //lembrar de trazer os alunos em ordem alfabética
    const alunosDaTurma = alunosMockados.filter(
      (alunoMock) => alunoMock.matriculado && alunoMock.turma === turma
    );
    //pode até preencher 4 bimestres com o quarto estando vazio ou com - nos null,
    //mas só conte a média considerando os 3, por isso essa constante
    let quantidadeDeBimestres = 0;
    const [bimestresDeAlgumaMateria] = alunosDaTurma[0].materias[0];
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

    // console.log(quantidadeDeBimestres);

    return (
      <Box sx={{ textAlign: 'center' }}>
        <Header />
        <Title>{turmaObj.turma}</Title>
        <h3>{materiaObj.materia}</h3>
        {alunosDaTurma.map((alunoDaTurma) => (
          <div key={alunoDaTurma.nome}>
            <p>
              {alunoDaTurma.nome} - {alunoDaTurma.idade} anos
            </p>
            {alunoDaTurma.materias.map((mate, index) => {
              return mate
                .filter((m) => m.materia === materiaObj.materia)
                .map(({ materia, bimestres }) => {
                  return (
                    <div key={materia}>
                      <p>{materia}</p>
                      {bimestres.map((bimestre, i) => {
                        const {
                          comportamento,
                          presenca,
                          prova,
                          teste,
                          tarefas,
                        } = bimestre;
                        const media = (
                          (Number(comportamento) +
                            Number(presenca) +
                            Number(prova) +
                            Number(teste) +
                            Number(tarefas)) /
                          3
                        ).toFixed(1);
                        return (
                          <div key={Math.random()}>
                            <h3>Bimestre: {i + 1}</h3>
                            <p>Comportamento: {comportamento}</p>
                            <p>Presença: {presenca}</p>
                            <p>Prova: {prova}</p>
                            <p>Teste: {teste}</p>
                            <p>Tarefas: {tarefas}</p>
                            <h4>Média: {media}</h4>
                          </div>
                        );
                      })}
                    </div>
                  );
                });
            })}
          </div>
        ))}
      </Box>
    );
  } catch (error) {
    return <ErrorPage error={error as Error} />;
  }
};

export default MateriaPage;
