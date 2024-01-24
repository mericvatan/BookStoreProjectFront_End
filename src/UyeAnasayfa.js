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
  alpha
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

function UyeAnaSayfa() {
  const [categories, setCategories] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    // Her karakter girişinde arama işlemini başlat
    handleSearch(newSearchTerm);
  };

  const handleSearch = async (keyword) => {
    try {
      const response = await axios.get(`http://localhost:5045/api/Product/GetProductByKeyword/${keyword}`);

      // İsteğin başarılı olup olmadığını kontrol et
      if (response) {
        const searchResults = response.data.data;
        setSearchResults(searchResults);
        setError(''); // Başarılı bir arama olduğunda hata durumunu temizle
      } else {
        // Başarısız istek durumunda bir şeyler yapabilirsiniz
        console.error('İstek başarısız oldu:', response);
      }
    } catch (error) {
      const errorMessage = error.response?.data;
      setError(errorMessage);
    }
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleCategoryClick = (categoryId) => {
    // Kategoriye tıklanınca yapılacak işlemler burada
    // Örneğin, ilgili kategori sayfasına yönlendirme
    handleDrawerClose(); // Menüyü kapat
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get('http://localhost:5045/api/Category/All');
        const CategoryList = response.data.data;
        setCategories(CategoryList);
      } catch (error) {
        console.error('Kategorileri getirirken bir hata oluştu:', error);
      }
    };
    fetchCategory();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar position="static" >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ backgroundColor: '#8F0213' }}
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              Kitapkurdu.com
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
                      style={{ ...customButtonStyle }}
                      className="me-2"
                    >
                      <button type="button" className="btn btn-outline-secondary" style={{ color: 'white' }}>Hesabım</button>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      as={Link}
                      to="/"
                      style={{ ...customButtonStyle }}
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

        {/* Drawer (Menü) */}
        <CustomDrawer anchor="left" open={openDrawer} onClose={handleDrawerClose}>
          <List>
            {categories.map((category) => (
              <ListItem
                key={category.id}
                button
                component={Link}
                to={`/category/${category.id}`}
                onClick={() => handleCategoryClick(category.id)}
              >
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
                Hoşgeldiniz! Kitapları inceleyerek hemen alışverişe başlayın.
              </p>
              <div className="Products">
                {/* Arama Sonucu Göster */}
                {searchTerm && (
                  <div className="row">
                    {searchResults.length > 0 ? (
                      searchResults.map((product) => (
                        <div key={product.id} className="col-md-3 mb-2">
                          <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                            <div className="card" style={{ backgroundColor: 'rgba(128, 128, 128, 0.1)' }}>
                              <div className="card-body">
                                <img src={`data:image/jpeg;base64, ${product.imageUrl}`} width={100} height={190} alt={product.name} />
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.price} TL</p>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))
                    ) : (
                      <div className="col">
                        {error && (
                          <p>{error}</p>
                        )}
                      </div>
                    )}
                  </div>
                )}
                {!searchTerm && (
                  <Products />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default UyeAnaSayfa;
