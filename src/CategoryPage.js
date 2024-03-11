import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchResult from './SearchResult.js';
import AnaSayfaToolbar from "./CustomToolbar.js";


const theme = createTheme({
  palette: {
    primary: {
      main: '#434343',
    },
  },
});




function CategoryPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [error, setError] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    handleSearch(newSearchTerm);
  };

  const handleSearch = async (keyword) => {
    try {
      const response = await axios.get(`http://localhost:5045/api/Product/GetProductByKeyword/${keyword}`);
      if (response) {
        const searchResults = response.data.data;
        setSearchResults(searchResults);
        setError('');
      } else {
        console.error('İstek başarısız oldu:', response);
      }
    } catch (error) {
      const errorMessage = error.response.data;
      setError(errorMessage);
    }
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleCategoryClick = (id) => {
    handleDrawerClose();
    navigate(`/category/${id}`, { state: { isLoggedIn: isLoggedIn } });
    setSelectedCategoryId(id);
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

  const { id } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5045/api/Category/GetProductsByCategory/${id}`);
        const categoryProductsList = response.data;
        setCategoryProducts(categoryProductsList);
      } catch (error) {
        console.error('Kategori ürünlerini getirirken bir hata oluştu:', error);
      }
    };
    fetchCategoryProducts();
  }, [id]);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <AnaSayfaToolbar
          handleDrawerOpen={handleDrawerOpen}
          searchTerm={searchTerm}
          handleInputChange={handleInputChange}
          handleSearch={handleSearch}
          categories={categories}
          handleDrawerClose={handleDrawerClose}
          handleCategoryClick={handleCategoryClick}
          openDrawer={openDrawer}
        />
      </div>
  
        <div className="container mt-5">
          <div className="row text-center mb-5">
            <div className="col">
              <h2 className="lead">
                {categories.find(category => category.id === selectedCategoryId)?.name} Ürünleri
              </h2>
              <div className="Products">
                {searchTerm && (
                  <SearchResult searchResults={searchResults} error={error} />
                )}
                {(
                  <div className="row">
                    {categoryProducts.map((product) => (
                      <div key={product.id} className="col-md-3 mb-2">
                        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                          <div className="card" style={{ backgroundColor: 'rgba(128, 128, 128, 0.1)' }}>
                            <div className="card-body">
                              <img src={`data:image/jpeg;base64, ${product.imageUrl}`} width={130} height={180} alt={product.name} />
                              <h5 className="card-title">{product.name}</h5>
                              <p className="card-text">{product.price} TL</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
    </ThemeProvider>
  );
  
}

export default CategoryPage;