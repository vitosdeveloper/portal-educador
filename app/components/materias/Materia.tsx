import { professor } from '@/app/professorMockado';
import { materias } from '@/app/utils/materias';
import { Box, Divider, ListItemButton, ListItemText } from '@mui/material';
import Link from 'next/link';

type Props = {
  materia: string;
  materiasLength: number;
  slug: string;
  index: number;
  turma: string;
};

const Materia = ({ materia, materiasLength, slug, index }: Props) => {
  const materiaObj = materias.find((m) => m.materia === materia)!;
  const doesProfTeachThis = professor.materias.includes(materia);

  return (
    <Box>
      <Box
        component={doesProfTeachThis ? Link : 'span'}
        href={`/turmas/${slug}/${materiaObj.slug}`}
        sx={{
          textDecoration: 'none',
          color: doesProfTeachThis ? '#1976d2' : '#333',
        }}
      >
        <ListItemButton disabled={!doesProfTeachThis}>
          <ListItemText primary={materia} />
        </ListItemButton>
      </Box>
      {index < materiasLength - 1 && <Divider />}
    </Box>
  );
};

export default Materia;
