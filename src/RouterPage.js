import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AnaSayfa from './Anasayfa';
import Login from './Login';
import Registration from './Registration';
import UyeAnasayfa from './UyeAnasayfa';
import ProductDetails from "./ProductDetails";
import CategoryPage from './CategoryPage';
import Sepet from './Sepet';


function RouterPage({ productItems, cartItems, handleAddProduct, handleRemoveProduct }) {


  useEffect(() => {
    // ComponentWillUnmount'a benzer bir temizlik işlevi
    const cleanup = () => {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('token'); // Tokenı da sil
    };

    // ComponentWillUnmount'a benzer bir davranış
    window.addEventListener('beforeunload', cleanup);

    // useEffect hook'unun temizlik işlevi
    return () => {
      window.removeEventListener('beforeunload', cleanup);
    };
  }, []);

  return (
<Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/UyeAnasayfa" element={<UyeAnasayfa />} />
        <Route path="/product/:id" element={<ProductDetails productItems={productItems} handleAddProduct={handleAddProduct} />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/" element={<AnaSayfa />} />
        <Route path="/Sepet" element={<Sepet cartItems={cartItems} handleAddProduct={handleAddProduct} handleRemoveProduct={handleRemoveProduct} />} />
      </Routes>
    </Router>
  );
}

export default RouterPage;
