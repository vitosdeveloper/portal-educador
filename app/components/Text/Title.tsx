import { Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

type Props = { children: string };

const Title = ({ children }: Props) => {
  return (
    <Box component='h1' sx={{ textAlign: 'center' }}>
      <SchoolIcon /> {children}
    </Box>
  );
};

export default Title;
