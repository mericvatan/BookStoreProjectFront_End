import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Products from './Products.js';
import SearchResult from './SearchResult.js';
import AnaSayfaToolbar from './CustomToolbar.js';


const theme = createTheme({
  palette: {
    primary: {
      main: '#434343',
    },
  },
});




function AnaSayfa() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
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
      if (response && response.data) {
        const searchResults = response.data.data;
        setSearchResults(searchResults);
        setError(''); // Başarılı bir arama olduğunda hata durumunu temizle
      } else {
        // Backend'den gelen tek bir hata mesajını kontrol et
        const errorMessage = response.data.message;
        setError(errorMessage || 'İstek başarısız oldu. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      // Hata durumu kontrolü
      if (error.response && error.response.data) {
        const errorMessage = error.response.data;
        setError(errorMessage);
      } else {
        setError('Arama sırasında bir hata oluştu. Lütfen tekrar deneyin.');
        console.error(error);
      }
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


        {/* Ana bölüm */}
        <div className="container mt-5">
          <div className="row text-center mb-5">
            <div className="col">
              <p className="lead">
                Hoşgeldiniz! Hesabınız yoksa, hemen üye olun ve avantajlı tekliflerden faydalanarak alışveriş yapın.
              </p>

              <div className="Products">
                {/* Arama Sonucu Göster */}
                {searchTerm && (
                  <SearchResult searchResults={searchResults} error={error} />
                )}

                {/* Tüm Ürünleri Göster */}
                {!searchTerm && <Products />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default AnaSayfa;