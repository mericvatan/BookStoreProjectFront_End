import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Tab, Nav } from 'react-bootstrap';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  InputBase,
  alpha,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import Products from './Products.js';

const CustomDrawer = styled(Drawer)({
  '& .MuiDrawer-paper': {
    width: '250px',
  },
});

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

function AnaSayfa() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchButtonClick = () => {
    handleSearch(searchTerm);
  };

  const handleSearch = async (name) => {
    try {
      const response = await axios.get(`http://localhost:5045/api/Product/GetProductByName/${name}`);
      setSearchResults(response.data.data);
    } catch (error) {
      console.error('Ürünleri ararken bir hata oluştu:', error);
    }
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get('http://localhost:5045/api/Category');
        const CategoryList = response.data.data;
        setCategories(CategoryList);
      } catch (error) {
        console.error('Ürünleri getirirken bir hata oluştu:', error);
      }
    };
    fetchCategory();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              Kitapyurdu.com
            </Typography>
            <Search>
              <SearchIcon style={{ marginRight: '8px' }} />
              <StyledInputBase
                placeholder="Kitap Adı veya Yazar Ara"
                inputProps={{ 'aria-label': 'search' }}
                value={searchTerm}
                onChange={handleInputChange}
              />
              <button type="button" onClick={handleSearchButtonClick}>
                Ara
              </button>
            </Search>
            <div style={{ marginLeft: 'auto' }}>
              <Tab.Container>
                <Nav>
                  <Nav.Item>
                    <Nav.Link as={Link} to="/Login" style={{ ...customButtonStyle }} className="me-2">
                      <button type="button" className="btn btn-outline-secondary" style={{ color: 'white' }}>
                        Giriş Yap
                      </button>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link as={Link} to="/Registration" style={{ ...customButtonStyle }}>
                      <button type="button" className="btn btn-outline-secondary" style={{ color: 'white' }}>
                        Üye Ol
                      </button>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Tab.Container>
            </div>
          </Toolbar>
        </AppBar>

        {/* Drawer (Menü) */}
        <CustomDrawer anchor="left" open={openDrawer} onClose={handleDrawerClose}>
          <List>
            {categories.map((category) => (
              <ListItem key={category.id} button component={Link} to={`/category/${category.id}`} onClick={handleDrawerClose}>
                <ListItemText>
                  <Typography variant="body1" fontWeight="bold">
                    {category.name}
                  </Typography>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </CustomDrawer>

        {/* Ana bölüm */}
        <div className="container mt-5">
          <div className="row text-center mb-5">
            <div className="col">
              <p className="lead">
                Hoşgeldiniz! Hesabınız yoksa, hemen üye olun ve avantajlı tekliflerden faydalanarak alışveriş yapın.
              </p>
              <div className="Products">
                <Products />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default AnaSayfa;