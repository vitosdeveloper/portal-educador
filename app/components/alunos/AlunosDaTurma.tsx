'use client';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import BimestresDeAlgumaMateriaDoAluno from './BimestresDeAlgumaMateriaDoAluno';
import { numberColor } from '@/app/utils/numberColor';
import { IStudent } from '@/types/Student';
import { mediaDeTodosBimestresAtualmente } from '@/app/utils/mediaDeTodosBimestresAtualmente';
import { cellArr } from '@/app/utils/cellArr';
import { useState } from 'react';

const AlunosDaTurma = ({
  alunosDaTurma,
  materiaObj,
  quantidadeDeBimestres,
}: Props) => {
  const [editable, setEditable] = useState<boolean>(false);
  const [alunosDaTurmaFiltrados, setAlunosDaTurmaFiltrados] =
    useState<IStudent[]>(alunosDaTurma);

  const handleUpdateStudents = () => {
    setEditable((prev) => !prev);
    if (!editable) return;
    console.log(
      'checar jwt no backend, PUT nos dados dos alunos dessa turma, depois um refresh reativo'
    );
  };
  return (
    <Box
      component='div'
      sx={{
        display: 'grid',
        gap: '1rem',
      }}
    >
      <Button
        sx={{ margin: '0 auto' }}
        variant='outlined'
        onClick={handleUpdateStudents}
      >
        {editable ? 'Salvar' : 'Editar'}
      </Button>
      {alunosDaTurmaFiltrados?.map((alunoDaTurma) => {
        const essaMateria = alunoDaTurma.materias.find(
          (m) => m.materia === materiaObj.materia
        );
        const bimestresDessaMateria = essaMateria!.bimestres;
        const mediaDosBimestresAtuais = mediaDeTodosBimestresAtualmente(
          bimestresDessaMateria,
          quantidadeDeBimestres
        );

        return (
          <Box
            component='div'
            key={alunoDaTurma._id}
            sx={{ marginBottom: '1rem' }}
          >
            <TableContainer
              component={Paper}
              sx={{ maxWidth: '879px', margin: '0 auto' }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    {cellArr.map((cell) => (
                      <TableCell key={cell}>{cell}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <BimestresDeAlgumaMateriaDoAluno
                    editable={editable}
                    bimestresDessaMateria={bimestresDessaMateria}
                    alunoDaTurma={alunoDaTurma}
                    setAlunosDaTurmaFiltrados={setAlunosDaTurmaFiltrados}
                    materiaObj={materiaObj}
                  />
                </TableBody>
              </Table>
              <Table>
                <TableHead>
                  <TableRow sx={{ display: 'flex' }}>
                    <TableCell>
                      Média dos {quantidadeDeBimestres} bimestres
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 'bold',
                        color: numberColor(mediaDosBimestresAtuais, 10),
                      }}
                    >
                      {mediaDosBimestresAtuais}
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </Box>
        );
      })}
    </Box>
  );
};

export default AlunosDaTurma;

type Props = {
  alunosDaTurma: IStudent[];
  materiaObj: {
    materia: string;
    slug: string;
  };
  quantidadeDeBimestres: number;
};
