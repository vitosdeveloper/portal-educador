'use client';
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

type Props = {
  professor: IProfessor;
};

const ProfessorProfile = ({ professor }: Props) => {
  const [editedProfessor, setEditedProfessor] = useState<IProfessor>(professor);
  const [isEditing, setIsEditing] = useState(false);

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const fieldName = e.target.name;
    console.log(fieldName, value);
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

  const handleSave = () => {
    //  checar se o array de matérias não está vazio no servidor
    //  checar se o nome e login já existem na db, se estão vazios ou se
    console.log(editedProfessor);
    setIsEditing(false);
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
      {isEditing ? (
        <Button variant='contained' color='primary' onClick={handleSave}>
          Save
        </Button>
      ) : (
        <Button
          variant='contained'
          color='primary'
          onClick={() => setIsEditing(true)}
        >
          Edit
        </Button>
      )}
    </Box>
  );
};

export default ProfessorProfile;
