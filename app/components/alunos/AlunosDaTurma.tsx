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
import useFetch from '@/app/custom-hooks/useFetch';
import Error from '../form/Error';
import Loading from '../form/Loading';

const AlunosDaTurma = ({
  alunosDaTurma,
  materiaObj,
  quantidadeDeBimestres,
}: Props) => {
  const [editable, setEditable] = useState<boolean>(false);
  const [alunosDaTurmaFiltrados, setAlunosDaTurmaFiltrados] =
    useState<IStudent[]>(alunosDaTurma);
  const { error, loading, data, request } = useFetch();

  const handleUpdateChangedStudents = async () => {
    setEditable((prev) => !prev);
    if (!editable) return;
    let changedStudents: IStudent[] = [];
    for (const aluno of alunosDaTurmaFiltrados) {
      const hasCHanged = !alunosDaTurma.includes(aluno);
      if (hasCHanged) changedStudents.push(aluno);
    }
    await request('/api/updateStudents', {
      method: 'PUT',
      body: JSON.stringify({
        changedStudents,
        materia: materiaObj.materia,
      }),
    });
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <>
          <Button
            sx={{ margin: '0 auto' }}
            variant='outlined'
            onClick={handleUpdateChangedStudents}
          >
            {editable ? 'Salvar' : 'Editar'}
          </Button>
          {error && <Error error={error} />}
        </>
      )}
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
