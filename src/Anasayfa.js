import React from 'react';
import { Link } from 'react-router-dom';
import { Tab, Nav } from 'react-bootstrap';

function AnaSayfa() {
  const customButtonStyle = {
    fontSize: '18px',
    backgroundColor: 'transparent',
    color: 'white',
    border: '2px solid white',
    transition: 'background-color 0.3s, color 0.3s', // Hover efekti için geçiş süresi ekleniyor
  };

  const customButtonHoverStyle = {
    backgroundColor: 'white',
    color: 'black',
  };

  return (
    <div className="container mt-5">
      {/* Tab bölümü */}
      <div className="row mb-4">
        <div className="col-md-6"></div>
        <div className="col-md-6 text-end">
          <Tab.Container>
            <Nav>
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/Login"
                  style={customButtonStyle}
                  className="me-2"
                >
                  Giriş Yap
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/Registration"
                  style={{ ...customButtonStyle, ...customButtonHoverStyle }}
                >
                  Üye Ol
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
            Hoş Geldiniz! Kitaplar arasında gezinerek istediğiniz kitabı
            bulabilir ve hemen sipariş verebilirsiniz.
          </p>
          <p className="lead">
            Hesabınız yoksa, hemen üye olun ve avantajlı tekliflerden
            yararlanın.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AnaSayfa;