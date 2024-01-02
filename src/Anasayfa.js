import React from 'react';
import { Link } from 'react-router-dom';

function AnaSayfa() {
  return (
    <div className="container mt-5">
      {/* Üst bölüm */}
      <div className="row mb-4">
        <div className="col-md-6">
          {/* Boş alan */}
        </div>
        <div className="col-md-6 text-end">
            <Link to="/Login" className="btn btn-primary me-2">Giriş Yap</Link>
            <Link to="/Registration" className="btn btn-success">Üye Ol</Link>
        </div>
      </div>

      {/* Ana bölüm */}
      <div className="row text-center mb-5">
        <div className="col">
          <h1 className="display-2 fw-bold">Kitap Dünyası</h1>
          <p className="lead">Hoş Geldiniz! Kitaplar arasında gezinerek istediğiniz kitabı bulabilir ve hemen sipariş verebilirsiniz.</p>
          <p className="lead">Hesabınız yoksa, hemen üye olun ve avantajlı tekliflerden yararlanın.</p>
        </div>
      </div>


    </div>
  );
}

export default AnaSayfa;