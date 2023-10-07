import {
  Box,
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

const AlunosDaTurma = ({
  alunosDaTurma,
  materiaObj,
  quantidadeDeBimestres,
}: Props) => {
  return alunosDaTurma?.map((alunoDaTurma) => {
    const essaMateria = alunoDaTurma.materias.find(
      (m) => m.materia === materiaObj.materia
    );
    const bimestresDessaMateria = essaMateria!.bimestres;
    let mediaDeTodosBimestresAtualmente = 0;
    for (let i = 0; i < bimestresDessaMateria.length; i++) {
      if (i < quantidadeDeBimestres) {
        const { comportamento, presenca, prova, teste, tarefas } =
          bimestresDessaMateria[i];
        const media =
          ((comportamento || 0) +
            (presenca || 0) +
            (prova || 0) +
            (teste || 0) +
            (tarefas || 0)) /
          3;
        mediaDeTodosBimestresAtualmente += media;
      }
    }
    mediaDeTodosBimestresAtualmente = Number(
      (mediaDeTodosBimestresAtualmente / quantidadeDeBimestres).toFixed(1)
    );
    const cellArr = [
      'Aluno',
      'Idade',
      'Bimestre',
      'Comportamento',
      'Presença',
      'Prova',
      'Teste',
      'Tarefas',
      'Média',
    ];
    return (
      <Box key={alunoDaTurma.nome} sx={{ marginBottom: '1rem' }}>
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
                bimestresDessaMateria={bimestresDessaMateria}
                alunoDaTurma={alunoDaTurma}
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
                    color: numberColor(mediaDeTodosBimestresAtualmente, 10),
                  }}
                >
                  {mediaDeTodosBimestresAtualmente}
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Box>
    );
  });
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
