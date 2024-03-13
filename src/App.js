import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import RouterPage from './RouterPage.js';

function App() {
  const [productItems, setProductItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5045/api/Product/All");
        const productItems = response.data.data;
        setProductItems(productItems);
      } catch (error) {
        console.error("Ürünleri getirirken bir hata oluştu:", error);
      }
    };

    fetchProducts();
  }, []);

  const [cartItems, setCartItems] = useState([]);

  const handleAddProduct = (product) =>{
    const ProductExist = cartItems.find((item) => item.id === product.id);
    if(ProductExist){
        setCartItems(cartItems.map((item) => item.id === product.id ?
        {...ProductExist, quantity: ProductExist.quantity + 1}: item)
        );
        }else{
            setCartItems([...cartItems, {...product, quantity: 1}])
        }
  }

  const handleRemoveProduct = (product) =>{
    const ProductExist = cartItems.find((item) => item.id === product.id);
    if(ProductExist.quantity ===1){
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    }else{
      setCartItems(
        cartItems.map((item) => item.id === product.id ? {...ProductExist, quantity: ProductExist.quantity - 1} : item
        )
      )
    }
  }

  return (
    <div className="App">
      <RouterPage productItems={productItems} cartItems={cartItems} handleAddProduct={handleAddProduct} handleRemoveProduct={handleRemoveProduct}/>
    </div>
  );
}

export default App;