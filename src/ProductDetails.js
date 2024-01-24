import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Padding } from "@mui/icons-material";
import { width } from "@mui/system";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import AnaSayfaToolbar from './CustomToolbar.js';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#434343',
    },
  },
});


function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [categories, setCategories] = useState([]);


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
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5045/api/Product/GetProductById/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Ürünleri getirirken bir hata oluştu:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

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
        <div className="justify-content-center" style={{ paddingTop: "9rem" }}>
          <div
            className="container d-flex justify-content-center align-items-center"
            style={{ backgroundColor: 'rgba(128, 128, 128, 0.1)' }}
          >
            <div className="col-md-4">
              <img
                src={`data:image/jpeg;base64, ${product.imageUrl}`}
                alt={product.name}
                style={{ paddingTop: "0rem" }}
              />
            </div>
            <div className="col-md-5">
              <div className="row-md-5">
                <div
                  className="text-start"
                  style={{ fontSize: "16px", paddingTop: "5rem" }}
                >
                  <h5 style={{ fontSize: "30px", fontWeight: "bold" }}>
                    {product.name}
                  </h5>
  
                  <p style={{ fontSize: "20px" }}>{product.authorName}</p>
                  <p>
                    <a>Fiyat:</a>
                    {product.price} ₺
                  </p>
                  <p>
                    <a>Sayfa Sayısı:</a>
                    {product.pages}
                  </p>
                </div>
                <p className="text-start">
                  <a style={{ fontSize: "16px", fontWeight: "bolder" }}>AÇIKLAMA</a><br />
                  {product.description}
                </p>
                <button>
                  <FontAwesomeIcon icon={faShoppingCart} /> Sepete Ekle
                </button>
  
                <button>
                  <FontAwesomeIcon icon={faHeart} /> Favorilere Ekle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default ProductDetails;

