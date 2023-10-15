'use client';
import { AppBar, Box, Button, SxProps, Theme, Toolbar } from '@mui/material';
import { deleteCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Header() {
  const router = useRouter();
  const classes: { [key: string]: SxProps<Theme> } = {
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    link: {
      textDecoration: 'none',
      color: 'inherit',
      fontSize: '1.25rem',
      fontWeight: 'bold',
    },
  };

  const handleLogout = () => {
    deleteCookie('jwt', { sameSite: 'none', secure: true });
    router.push('/');
  };

  return (
    <AppBar position='static'>
      <Toolbar sx={classes.nav}>
        <Box>
          <Link href='/turmas' style={{ color: '#eee' }}>
            <Button sx={classes.link} color='inherit'>
              Turmas
            </Button>
          </Link>
          <Link href='/direcao' style={{ color: '#eee' }}>
            <Button sx={classes.link} color='inherit'>
              Direção
            </Button>
          </Link>
        </Box>
        <Button onClick={handleLogout} color='inherit'>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
