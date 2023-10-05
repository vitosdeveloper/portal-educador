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
          alignItems: 'center',
          gap: '.25rem',
          margin: 0,
        }}
      >
        <InfoOutlined color='warning' />
        <Typography variant='subtitle2' color='#ed6c02'>
          {error || 'Opps! Houve algum erro.'}
        </Typography>
      </Box>
    );
};

export default Error;
