import ErrorPage from '@/app/components/ErrorPage';
import Title from '@/app/components/Text/Title';
import BimestresDeAlgumaMateriaDoAluno from '@/app/components/alunos/BimestresDeAlgumaMateriaDoAluno';
import Header from '@/app/components/partials/Header';
import { getStudentsBy } from '@/app/db/getStudentsBy';
import { professor } from '@/app/professorMockado';
import { minorCellArr } from '@/app/utils/cellArr';
import { er, errors } from '@/app/utils/errorUtils';
import { mediaDeTodosBimestresAtualmente } from '@/app/utils/mediaDeTodosBimestresAtualmente';
import { numberColor } from '@/app/utils/numberColor';
import { quantidadeDeBimestres } from '@/app/utils/quantidadeDeBimestres';
import { turmas } from '@/app/utils/turmas';
import { isStudent } from '@/types/Student';
import {
  Box,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { ObjectId } from 'mongodb';
import React from 'react';

type Props = { params: { alunoId: string } };

const AlunoProfile = async ({ params }: Props) => {
  try {
    const student = await getStudentsBy({
      _id: new ObjectId(params.alunoId),
    });
    if (!student || !student.length || !isStudent(student[0]))
      return er(errors.estudante);
    const { nome, idade, matriculado, turma } = student[0];
    const foundTurma = turmas.find((t) => t.slug === turma);
    if (!foundTurma) return er(errors.turma(turma));
    const materiasParaMostrar = professor.diretor
      ? student[0].materias
      : student[0].materias.filter((m) =>
          professor.materias.includes(m.materia)
        );
    return (
      <>
        <Header />
        <Box
          sx={{
            padding: '1rem',
            maxWidth: '879px',
            margin: '0 auto',
            display: 'grid',
            gap: '1rem',
          }}
        >
          <Card>
            <CardContent>
              <Title>Perfil do estudante</Title>
              <Typography variant='h6' component='h2'>
                Nome: {nome}
              </Typography>
              <Typography>Idade: {idade}</Typography>
              <Typography>Turma: {foundTurma.turma}</Typography>
              <Typography>
                Matriculado: {matriculado ? 'Sim' : 'Não'}
              </Typography>
            </CardContent>
          </Card>
          {materiasParaMostrar.map((m) => {
            const quantidadeBimestres = quantidadeDeBimestres(m.bimestres);
            const mediaDosBimestresConcluidos = mediaDeTodosBimestresAtualmente(
              m.bimestres,
              quantidadeBimestres
            );
            return (
              <TableContainer key={m.materia} component={Paper}>
                <h3 style={{ textAlign: 'center' }}>{m.materia}</h3>
                <Table>
                  <TableHead>
                    <TableRow>
                      {minorCellArr.map((cell) => (
                        <TableCell key={cell}>{cell}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <BimestresDeAlgumaMateriaDoAluno
                      key={m.materia}
                      bimestresDessaMateria={m.bimestres}
                    />
                  </TableBody>
                </Table>

                <Table>
                  <TableHead>
                    <TableRow sx={{ display: 'flex' }}>
                      <TableCell>
                        Média dos {quantidadeBimestres} bimestres
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 'bold',
                          color: numberColor(mediaDosBimestresConcluidos, 10),
                        }}
                      >
                        {mediaDosBimestresConcluidos}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
            );
          })}
        </Box>
      </>
    );
  } catch (error) {
    if (error instanceof Error) return <ErrorPage error={error} />;
  }
};

export default AlunoProfile;
