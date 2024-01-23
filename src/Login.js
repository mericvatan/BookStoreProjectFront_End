import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  AppBar,
  Toolbar,
  Typography
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#434343',
    },
  },
});

function Login() {
  const navigate = useNavigate(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };
    const url = 'http://localhost:5045/api/Auth/Login';
    axios.post(url, data)
      .then((result) => {
        const dt = result.data;
        toast.success('Giriş Yapıldı!');
        navigate('/UyeAnasayfa');
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          const errors = error.response.data.errors;
        
          errors.forEach(err => {
            toast.error(err);
          });
        } else {
          // İstek yapılırken bir hata oluştu
          toast.error('Bir hata oluştu. Lütfen tekrar deneyin.');
          console.log(error);
        }
      });
  };

  const handleRegistr = () => {
    window.location.href = "/registration";
  };

  return (
    <ThemeProvider theme={theme}>
  <div>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
          Kitapyurdu.com
        </Typography>
      </Toolbar>
    </AppBar>
    <div className="mask d-flex align-items-center h-100 gradient-custom-3">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6" style={{ padding: "50px" }}>
            <div className="card" style={{ borderRadius: '15px' }}>
              <div className="card-body p-5">
                <h2 className="text-uppercase text-center mb-5">Giriş Yap</h2>

                <form>
                  <div className="form-floating mb-4">
                    <input
                      type="email"
                      id="form3Example3cg"
                      className="form-control form-control-lg"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    <label htmlFor="form3Example3cg">E-posta</label>
                  </div>

                  <div className="form-floating mb-4">
                    <input
                      type="password"
                      id="form3Example4cg"
                      className="form-control form-control-lg"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                    <label htmlFor="form3Example4cg">Şifre</label>
                  </div>

                  <div className="row mb-4">
                    <div className="col d-flex justify-content-center">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                        <label className="form-check-label" htmlFor="form2Example31"> Beni Hatırla </label>
                      </div>
                    </div>

                    <div className="col">
                      <a href="#!">Şifremi Unuttum</a>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center">
                    <button type="button"
                      className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={(e) => handleLogin(e)}>Giriş Yap</button>
                  </div>

                  <p className="text-center text-muted mt-5 mb-0">Hesabın yoksa <a href="#!" className="fw-bold text-body" onClick={(e) => handleRegistr(e)}><u>Üye Ol</u></a></p>
                </form>
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</ThemeProvider>
  );
}

export default Login;
