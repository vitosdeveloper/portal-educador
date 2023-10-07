import { numberColor } from '@/app/utils/numberColor';
import { IStudent } from '@/types/Student';
import { TableCell, TableRow } from '@mui/material';
import Link from 'next/link';

const BimestresDeAlgumaMateriaDoAluno = ({
  bimestresDessaMateria,
  alunoDaTurma,
}: Props) => {
  return bimestresDessaMateria?.map((bimestre, i) => {
    const { comportamento, presenca, prova, teste, tarefas } = bimestre;
    const media = Number(
      (
        ((comportamento || 0) +
          (presenca || 0) +
          (prova || 0) +
          (teste || 0) +
          (tarefas || 0)) /
        3
      ).toFixed(1)
    );

    const notesArr = [
      [comportamento, 2],
      [presenca, 4],
      [prova, 10],
      [teste, 10],
      [tarefas, 40],
      [media, 10],
    ];

    return (
      <TableRow sx={{ textAlign: 'center' }} key={i}>
        {i === 0 && (
          <>
            <TableCell rowSpan={bimestresDessaMateria?.length}>
              <Link href={`/alunos/${alunoDaTurma._id}`}>
                {alunoDaTurma.nome}
              </Link>
            </TableCell>
            <TableCell rowSpan={bimestresDessaMateria?.length}>
              {alunoDaTurma.idade} anos
            </TableCell>
          </>
        )}
        <TableCell>{i + 1}°</TableCell>
        {notesArr.map(([note, max], index) => (
          <TableCell
            key={index}
            sx={{ fontWeight: 'bold', color: numberColor(note || 0, max!) }}
          >
            {note || '-'}
          </TableCell>
        ))}
      </TableRow>
    );
  });
};

export default BimestresDeAlgumaMateriaDoAluno;

type Props = {
  bimestresDessaMateria: {
    teste: number | null;
    prova: number | null;
    presenca: number | null;
    tarefas: number | null;
    comportamento: number | null;
  }[];

  alunoDaTurma: IStudent;
};
