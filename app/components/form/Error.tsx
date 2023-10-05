import { InfoOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

type Props = {
  error: null | string;
};

const Error = ({ error }: Props) => {
  if (error && error.length)
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'start',
          gap: '.25rem',
          margin: 0,
        }}
      >
        <InfoOutlined color='error' />
        <Typography variant='subtitle2' color='#d32f2f'>
          {error || 'Opps! Houve algum erro.'}
        </Typography>
      </Box>
    );
};

export default Error;
