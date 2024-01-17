import React , { useState }from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate hook'unu import et
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { toast , ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Login(){
    const navigate = useNavigate(); // useNavigate hook'unu kullanarak geçmiş nesnesini al

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault();

        const data = {
            email : email,
            password : password,

        }
        const url = 'http://localhost:5045/api/Auth/Login';
        axios.post(url, data)
        .then((result) => {
            const dt = result.data;
            toast.success('Giriş Yapıldı!');
            // Giriş başarılı olduğunda ana ekrana yönlendir
            navigate('/UyeAnasayfa');
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

    const handleRegistr = () => {
      window.location.href = "/registration";
    }

  

    return(
         <div class="mask d-flex align-items-center h-100 gradient-custom-3">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6" style={{padding: "50px"}}>
          <div class="card" style={{borderRadius: '15px'}}>
            <div class="card-body p-5">
              <h2 class="text-uppercase text-center mb-5">Giriş Yap</h2>

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
                
                <div class="row mb-4">
                  <div class="col d-flex justify-content-center">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                      <label class="form-check-label" for="form2Example31"> Beni Hatırla </label>
                    </div>
                </div>

                <div class="col">

                    <a href="#!">Şifremi Unuttum</a>
                  </div>
                </div>

                <div class="d-flex justify-content-center">
                  <button type="button"
                    class="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={(e) => handleLogin(e)}>Giriş Yap</button>
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
    )
}

export default Login;