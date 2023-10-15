import { getProfessorsNameAndId } from '@/app/db/getProfessorsNameAndId';
import { Button, List, ListItem } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import ErrorPage from '../ErrorPage';

type Props = {};

const ProfessorList = async (props: Props) => {
  try {
    const professors = await getProfessorsNameAndId();
    return (
      <List sx={{ display: 'grid', justifyContent: 'center' }}>
        <ListItem>
          <Button variant='outlined' sx={{ width: 280 }}>
            Adicionar professores (desativado)
          </Button>
        </ListItem>
        <ListItem>
          <Button variant='outlined' sx={{ width: 280 }}>
            Remover professores (desativado)
          </Button>
        </ListItem>
        {professors?.map(({ _id, nome }) => (
          <ListItem key={_id}>
            <Link href={`/professores/${_id}`}>
              <Button sx={{ width: 280 }} variant='contained' color='primary'>
                {nome}
              </Button>
            </Link>
          </ListItem>
        ))}
      </List>
    );
  } catch (error) {
    if (error instanceof Error) return <ErrorPage error={error} />;
  }
};

export default ProfessorList;
