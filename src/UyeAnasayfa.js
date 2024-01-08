import React from 'react';
import { Link } from 'react-router-dom';
import { Tab, Nav } from 'react-bootstrap';
import { AppBar, Toolbar, IconButton, Typography, InputBase, alpha } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';

const theme = createTheme({
  palette: {
    primary: {
      main: '#434343',
    },
  },
});

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.common.white,

  '& .MuiInputBase-input': {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    transition: theme.transitions.create('width'),
    width: '100%',

  },
}));

const customButtonStyle = {
  fontSize: '20px', 
  fontWeight: 'bold',
  backgroundColor: 'transparent',
  color: 'white',
  transition: 'background-color 0.3s, color 0.3s',
};

function UyeAnasayfa() {

  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              Kitapyurdu.com
            </Typography>
            <Search>
                <SearchIcon style={{ marginRight: '8px' }} />
              <StyledInputBase placeholder="Kitap Adı veya Yazar Ara" inputProps={{ 'aria-label': 'search' }} />
            </Search>
            <div style={{ marginLeft: 'auto' }}>
              <Tab.Container>
                <Nav>
                  <Nav.Item>
                    <Nav.Link
                      as={Link}
                      style={{...customButtonStyle,}}
                      className="me-2"
                    >
                      <button type="button" className="btn btn-outline-secondary" style={{ color: 'white' }}>Hesabım</button>
                    </Nav.Link>
                  </Nav.Item> 

                  <Nav.Item>
                    <Nav.Link
                      as={Link}
                      to="/"
                      style={{...customButtonStyle,}}
                      className="me-2"
                    >
                      <button type="button" className="btn btn-outline-secondary" style={{ color: 'white' }}>Çıkış Yap</button>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Tab.Container>
            </div>
          </Toolbar>
        </AppBar>

        {/* Ana bölüm */}
        <div className="container mt-5">
          <div className="row text-center mb-5">
            <div className="col">
              <p className="lead">
                Hoşgeldiniz! Hesabınız yoksa, hemen üye olun ve avantajlı tekliflerden faydalanarak alışveriş yapın.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default UyeAnasayfa;