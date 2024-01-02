import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";

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
  <div className="mask d-flex align-items-center h-100 gradient-custom-3">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="card" style={{borderRadius: '15px'}}>
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5">Hesap Oluştur</h2>

              <form>

                <div className="form-outline mb-4">
                  <input type="text" id="form3Example1cg" className="form-control form-control-lg" onChange={(e) => setNameSurname(e.target.value)} value={namesurname} />
                  <label className="form-label" htmlFor="form3Example1cg">Ad-Soyad</label>
                </div>
                <div className="form-outline mb-4">
                  <input type="text" id="form3Example2cg" className="form-control form-control-lg" onChange={(e) => setUsername(e.target.value)} value={userName} />
                  <label className="form-label" htmlFor="form3Example1cg">Kullanıcı Adı</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="email" id="form3Example3cg" className="form-control form-control-lg" 
                  onChange={(e) => setEmail(e.target.value)} value={email} />
                  <label className="form-label" htmlFor="form3Example3cg">E-posta</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="form3Example4cg" className="form-control form-control-lg" 
                  onChange={(e) => setPassword(e.target.value)} value={password} />
                  <label className="form-label" htmlFor="form3Example4cg">Şifre</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="form3Example4cdg" className="form-control form-control-lg" 
                  onChange={(e) => setConfirmPassword(e.target.value)} value={confirmpassword}/>
                  <label className="form-label" htmlFor="form3Example4cdg">Şifre tekrar</label>
                </div>

                <div className="d-flex justify-content-center">
                  <button type="button"
                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={(e) => handleSave(e)}>Kaydol</button>
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
    )
}