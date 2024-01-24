import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  AppBar,
  Toolbar,
  Typography
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import axios from "axios";
import { Padding } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#434343',
    },
  },
});

export default function Registration(){

    const [namesurname, setNameSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [userName, setUsername] = useState('')


    const handleSave = (e) => {
        e.preventDefault();
        const url = 'http://localhost:5045/api/User/CreateUser'

        const data = {
            NameSurname: namesurname,
            email : email,
            password : password,
            confirmpassword : confirmpassword,
            userName:userName
        }

        axios.post(url, data)
        .then((result) => {
            clear();
            const dt = result.data;
            toast.success('Kayıt Başarılı!');
            
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.errors) {
              // Sunucu tarafından gönderilen hataları alın
              const errors = error.response.data.errors;
              // Hata mesajlarını Toast ile gösterin
              errors.forEach(err => {
                  toast.error(err);
              });
          } else {
              // İstek yapılırken bir hata oluştu
              toast.error('Bir hata oluştu. Lütfen tekrar deneyin.');
              console.log(error);
          }
      });
    }

    const handleLogin = () => {
        window.location.href = "/login";
    }

    const clear = () => {
        setNameSurname('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }

    return(
      <ThemeProvider theme={theme}>
  <div>
    <AppBar position="static" sx={{ backgroundColor: '#8F0213' }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
          Kitapkurdu.com
        </Typography>
      </Toolbar>
    </AppBar>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6" style={{padding: "50px"}}>
              <div className="card" style={{ borderRadius: '15px', backgroundColor: 'rgba(255, 215, 219, 0.7)' }}>

                <div className="card-body p-5">
                <h2 className="text-center mb-5">Hesap Oluştur</h2>

                  <form>

                  <div className="form-floating mb-4">
                      <input
                        type="text"
                        id="form3Example1cg"
                        className="form-control form-control-lg"
                        onChange={(e) => setNameSurname(e.target.value)}
                        value={namesurname}
                      />
                      <label className="form-label" htmlFor="form3Example1cg">Ad-Soyad</label>
                    </div>

                    <div className="form-floating mb-4">
                      <input
                        type="text"
                        id="form3Example2cg"
                        className="form-control form-control-lg"
                        onChange={(e) => setUsername(e.target.value)}
                        value={userName}
                      />
                      <label className="form-label" htmlFor="form3Example1cg">Kullanıcı Adı</label>
                    </div>

                    <div className="form-floating mb-4">
                      <input
                        type="email"
                        id="form3Example3cg"
                        className="form-control form-control-lg"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                      <label className="form-label" htmlFor="form3Example3cg">E-posta</label>
                    </div>

                    <div className="form-floating mb-4">
                      <input
                        type="password"
                        id="form3Example4cg"
                        className="form-control form-control-lg"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                      <label className="form-label" htmlFor="form3Example4cg">Şifre</label>
                    </div>

                    <div className="form-floating mb-4">
                      <input
                        type="password"
                        id="form3Example4cg"
                        className="form-control form-control-lg"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmpassword}
                      />
                      <label className="form-label" htmlFor="form3Example4cg">Şifre tekrar</label>
                    </div>


                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-success btn-block btn-lg text-body"
                        style={{ backgroundColor: '#ED6875', border: 'none' }}
                        onClick={(e) => handleSave(e)}
                      >
                        Kaydol
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">Zaten hesabın var mı? <a href="#!" className="fw-bold text-body" onClick={(e) => handleLogin(e)}><u>Giriş Yap</u></a></p>

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