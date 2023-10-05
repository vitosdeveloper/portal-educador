'use client';
import { AppBar, Box, Button, SxProps, Theme, Toolbar } from '@mui/material';
import { deleteCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Header() {
  const router = useRouter();
  const classes: { [key: string]: SxProps<Theme> } = {
    root: {
      flexGrow: 1,
    },
    link: {
      textDecoration: 'none',
      color: 'inherit',
    },
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
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
          <Link href='/turmas'>
            <Button sx={classes.link} color='inherit'>
              Turmas
            </Button>
          </Link>
          <Link href='/direcao'>
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
