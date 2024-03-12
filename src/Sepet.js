import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AnaSayfaToolbar from './CustomToolbar.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const theme = createTheme({
  palette: {
    primary: {
      main: '#434343',
    },
  },
});


function Sepet ({ cartItems, handleRemoveProduct})  {
  const [categories, setCategories] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const totalPrice = cartItems.reduce((price,item) => price + item.quantity * item.price, 0);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleCategoryClick = (categoryId) => {
    handleDrawerClose(); 
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
          categories={categories}
          handleDrawerClose={handleDrawerClose}
          handleCategoryClick={handleCategoryClick}
          openDrawer={openDrawer}
        />
  
  {cartItems.length === 0 ? (
        <div className="cart-items-empty">Sepet boş</div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item-list">
              <div className="card" style={{ backgroundColor: 'rgba(128, 128, 128, 0.1)' }}>
                <div className="card-body">
                  <img src={`data:image/jpeg;base64, ${item.imageUrl}`} width={130} height={180} alt={item.name} />
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.price} ₺ </p>
                  <button
                    onClick={() => handleRemoveProduct(item)}
                    style={{
                      position: 'absolute',
                      bottom: '0px',
                      right: '50%',
                      transform: 'translateX(50%)',
                      fontSize: '15px',
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="cart-items-total-price">
            Toplam
            <div className="cart-Items-total-price">${totalPrice}</div>
          </div>
        </div>
      )}
    </div>
</ThemeProvider>
  );
  
}

export default Sepet;