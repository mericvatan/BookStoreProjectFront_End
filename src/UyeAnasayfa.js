import React from 'react';
import { Link } from 'react-router-dom';
import { Tab, Nav } from 'react-bootstrap';

function UyeAnasayfa() {
  const customButtonStyle = {
    fontSize: '18px',
    backgroundColor: 'transparent',
    color: 'white',
    
    transition: 'background-color 0.3s, color 0.3s', // Hover efekti için geçiş süresi ekleniyor
  };



  return (
    <div className="container mt-5">
      {/* Tab bölümü */}
      <div className="row mb-4 " >
        <div className="col-md-6 "></div>
        <div className="col-md-6 position-absolute top-0 end-0" style={{ paddingTop: '1rem', paddingLeft:"25rem"}}>
          <Tab.Container>
            <Nav>
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  style={{...customButtonStyle,}}
                  className="me-2"
                >
                  <button type="button" class="btn btn-outline-secondary">Hesabım</button>
                </Nav.Link>
              </Nav.Item>  
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/"
                  style={{...customButtonStyle,}}
                  className="me-2"
                >
                  <button type="button" class="btn btn-outline-secondary">Çıkış Yap</button>
                </Nav.Link>
              </Nav.Item>

            </Nav>
          </Tab.Container>
        </div>
      </div>

      {/* Ana bölüm */}
      <div className="row text-center mb-5">
        <div className="col">
          <h1 className="display-2 fw-bold">Kitapyurdu.com</h1>
          <p className="lead">
            Hoş Geldiniz Üyemiz! Kitaplar arasında gezinerek istediğiniz kitabı
            bulabilir ve hemen sipariş verebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UyeAnasayfa;