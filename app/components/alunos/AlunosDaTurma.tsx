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
import { mediaDeTodosBimestresAtualmente } from '@/app/utils/mediaDeTodosBimestresAtualmente';
import { cellArr } from '@/app/utils/cellArr';

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
    const mediaDosBimestresAtuais = mediaDeTodosBimestresAtualmente(
      bimestresDessaMateria,
      quantidadeDeBimestres
    );

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
