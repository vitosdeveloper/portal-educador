'use client';
import useFetch from '@/app/custom-hooks/useFetch';
import { IProfessor } from '@/app/utils/isProfessor';
import { materias } from '@/app/utils/materias';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import Loading from '../form/Loading';
import Error from '../form/Error';
import { useRouter } from 'next/navigation';

type Props = {
  professor: IProfessor;
};

const ProfessorProfile = ({ professor }: Props) => {
  const router = useRouter();
  const [editedProfessor, setEditedProfessor] = useState<IProfessor>(professor);
  const [isEditing, setIsEditing] = useState(false);
  const { loading, error, data, request, setState } = useFetch();

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const fieldName = e.target.name;
    setEditedProfessor({ ...editedProfessor, [fieldName]: value });
  };

  const handleSubjectToggle = (subject: string) => {
    setIsEditing(true);
    const selectedSubjects = editedProfessor.materias || [];
    const materias = selectedSubjects.includes(subject)
      ? selectedSubjects.filter((item) => item !== subject)
      : [...selectedSubjects, subject];
    setEditedProfessor({ ...editedProfessor, materias });
  };

  const handleSave = async () => {
    const { login, materias, nome, _id } = editedProfessor;
    await request('/api/professor/edit', {
      method: 'PUT',
      body: JSON.stringify({
        login,
        materias,
        nome,
        _id,
        originalLogin: professor.login,
      }),
    });
    setIsEditing(false);
    router.refresh();
  };

  return (
    <Box sx={{ display: 'grid', gap: '1rem' }}>
      <TextField
        label='Nome'
        name='nome'
        value={editedProfessor.nome}
        onChange={handleFieldChange}
        fullWidth
        variant='outlined'
        disabled={!isEditing}
      />
      <TextField
        label='Login'
        name='login'
        value={editedProfessor.login}
        onChange={handleFieldChange}
        fullWidth
        variant='outlined'
        disabled={!isEditing}
      />
      <div>Matérias: </div>
      {isEditing ? (
        materias.map((materia) => (
          <FormControlLabel
            key={materia.slug}
            label={materia.materia}
            control={
              <Checkbox
                onChange={() => handleSubjectToggle(materia.materia)}
                checked={
                  editedProfessor.materias &&
                  editedProfessor.materias.includes(materia.materia)
                }
                color='primary'
              />
            }
          />
        ))
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {editedProfessor.materias.map((mate, index) => {
            const lastIndex = index === editedProfessor.materias.length - 1;
            return (
              <Box key={index}>
                <Button>{mate}</Button>
                {!lastIndex && '|'}
              </Box>
            );
          })}
        </Box>
      )}
      {error && <Error error={error} />}
      {!loading ? (
        isEditing ? (
          <Button variant='contained' color='primary' onClick={handleSave}>
            Save
          </Button>
        ) : (
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              setIsEditing(true);
              setState((prev) => ({ ...prev, error: null }));
            }}
          >
            Edit
          </Button>
        )
      ) : (
        <Loading loading={loading} />
      )}
    </Box>
  );
};

export default ProfessorProfile;
