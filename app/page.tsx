import { Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import LoginForm from './components/form/LoginForm';
import Title from './components/Text/Title';

export default function Home() {
  return (
    <>
      <Title>Portal Educador</Title>
      <LoginForm />
    </>
  );
}
