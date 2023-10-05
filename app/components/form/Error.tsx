import { InfoOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

type Props = {
  error: null | string;
  bigger?: boolean;
};

const Error = ({ error, bigger }: Props) => {
  const fontSize = bigger ? '1.5rem' : '1rem';
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '.25rem',
        margin: 0,
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <InfoOutlined sx={{ fontSize }} color='error' />
      <Typography variant='subtitle2' color='#d32f2f' fontSize={fontSize}>
        {error || 'Opps! Houve algum erro.'}
      </Typography>
    </Box>
  );
};

export default Error;
