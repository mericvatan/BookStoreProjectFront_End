import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnaSayfa from './Anasayfa'; // AnaSayfa'yı import et
import Login from './Login';
import Registration from './Registration';

function RouterPage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnaSayfa />} /> 
        <Route path="/Login" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
      </Routes>
    </Router>
  );
}

export default RouterPage;