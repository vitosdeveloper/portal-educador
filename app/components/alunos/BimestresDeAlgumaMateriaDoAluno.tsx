import { numberColor } from '@/app/utils/numberColor';
import { IStudent } from '@/types/Student';
import { Box, Input, TableCell, TableRow } from '@mui/material';
import Link from 'next/link';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

type Props = {
  editable?: boolean;
  bimestresDessaMateria: {
    teste: number | null;
    prova: number | null;
    presenca: number | null;
    tarefas: number | null;
    comportamento: number | null;
  }[];
  alunoDaTurma?: IStudent;
  setAlunosDaTurmaFiltrados?: Dispatch<SetStateAction<IStudent[]>>;
  materiaObj?: {
    materia: string;
    slug: string;
  };
};

const BimestresDeAlgumaMateriaDoAluno = ({
  bimestresDessaMateria,
  alunoDaTurma,
  editable,
  setAlunosDaTurmaFiltrados,
  materiaObj,
}: Props) => {
  const handleResultChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    bimestreIndex: number,
    noteIndex: number
  ) => {
    if (!setAlunosDaTurmaFiltrados) return;
    setAlunosDaTurmaFiltrados((prev) => {
      return prev.map((student) => {
        if (student._id !== alunoDaTurma?._id) return student;
        return {
          ...student,
          materias: student.materias.map((m) => {
            if (m.materia !== materiaObj?.materia) return m;
            return {
              ...m,
              bimestres: m.bimestres.map((b, bimestreI) => {
                if (bimestreI !== bimestreIndex) return b;
                const notes = [
                  'comportamento',
                  'presenca',
                  'prova',
                  'teste',
                  'tarefas',
                  'media',
                ];
                const chosenNote = Number(e.target.value);
                const noteName = notes[noteIndex];
                return {
                  ...b,
                  [noteName]: chosenNote === 0 ? null : chosenNote,
                };
              }),
            };
          }),
        };
      });
    });
  };

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
      <TableRow sx={{ textAlign: 'center' }} key={Math.random()}>
        {i === 0 && alunoDaTurma && (
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

        {editable !== undefined &&
          notesArr.map(([note, max], index) => (
            <TableCell key={index}>
              {editable ? (
                <Input
                  type='number'
                  sx={{
                    fontWeight: 'bold',
                    color: numberColor(note || 0, max!),
                  }}
                  value={note || 0}
                  onChange={(e) =>
                    Number(e.target.value) <= (max as number) &&
                    Number(e.target.value) >= 0 &&
                    handleResultChange(e, i, index)
                  }
                />
              ) : (
                <Box
                  sx={{
                    fontWeight: 'bold',
                    color: numberColor(note || 0, max!),
                  }}
                >
                  {note || '-'}
                </Box>
              )}
            </TableCell>
          ))}

        {editable === undefined &&
          notesArr.map(([note, max], index) => (
            <TableCell
              sx={{
                fontWeight: 'bold',
                color: numberColor(note || 0, max!),
              }}
              key={index}
            >
              {note || '-'}
            </TableCell>
          ))}
      </TableRow>
    );
  });
};

export default BimestresDeAlgumaMateriaDoAluno;
