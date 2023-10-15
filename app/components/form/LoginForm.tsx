'use client';
import { Input, InputLabel, Button, Box } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import Error from './Error';
import useFetch from '@/app/custom-hooks/useFetch';
import Loading from './Loading';

const LoginForm = () => {
  const { error, loading, data, request } = useFetch('/turmas');
  const [form, setForm] = useState<{
    username: string;
    password: string;
  }>({
    username: '',
    password: '',
  });

  const handleFormChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({
      ...prev,
      [target.id]: target.value,
    }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await request('/api/login', {
      method: 'POST',
      body: JSON.stringify(form),
    });
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        minWidth: '250px',
        maxWidth: '50%',
        margin: '0 auto',
      }}
    >
      <h2>Login</h2>
      <InputLabel htmlFor='username'>Usuário</InputLabel>
      <Input
        value={form.username}
        onChange={handleFormChange}
        type='text'
        id='username'
        required
        autoComplete='off'
        autoFocus
      />
      <InputLabel htmlFor='password'>Password</InputLabel>
      <Input
        value={form.password}
        onChange={handleFormChange}
        type='password'
        id='password'
        required
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <Loading loading={loading} />
        <Error error={error} />
        <Button type='submit' variant='outlined'>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
