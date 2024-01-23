import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnaSayfa from './Anasayfa'; // AnaSayfa'yı import et
import Login from './Login';
import Registration from './Registration';
import UyeAnasayfa from './UyeAnasayfa';
import ProductDetails from "./ProductDetails";
import CategoryPage from './CategoryPage';




function RouterPage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnaSayfa />} /> 
        <Route path="/Login" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/UyeAnasayfa" element={<UyeAnasayfa />} />
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/category/:id" element={<CategoryPage/>} />
      </Routes>
    </Router>
  );
}

export default RouterPage;