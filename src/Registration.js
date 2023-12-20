import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from "axios";

export default function Registration(){

    const [namesurname, setNameSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')

    const handleSave = (e) => {
        e.preventDefault();
        const url = 'http://localhost:5045/api/User/CreateUser'

        const data = {
            name: namesurname,
            email : email,
            password : password,
            confirmpassword : confirmpassword
        }

        axios.post(url, data)
        .then((result) => {
            clear();
            const dt = result.data;
            alert(dt.statusMessage);
            
        })
        .catch((error) =>{
            console.log(error);
        })
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
  <div class="mask d-flex align-items-center h-100 gradient-custom-3">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card" style={{borderRadius: '15px'}}>
            <div class="card-body p-5">
              <h2 class="text-uppercase text-center mb-5">Hesap Oluştur</h2>

              <form>

                <div class="form-outline mb-4">
                  <input type="text" id="form3Example1cg" class="form-control form-control-lg" onChange={(e) => setNameSurname(e.target.value)} value={namesurname} />
                  <label class="form-label" for="form3Example1cg">Ad-Soyad</label>
                </div>

                <div class="form-outline mb-4">
                  <input type="email" id="form3Example3cg" class="form-control form-control-lg" 
                  onChange={(e) => setEmail(e.target.value)} value={email} />
                  <label class="form-label" for="form3Example3cg">E-posta</label>
                </div>

                <div class="form-outline mb-4">
                  <input type="password" id="form3Example4cg" class="form-control form-control-lg" 
                  onChange={(e) => setPassword(e.target.value)} value={password} />
                  <label class="form-label" for="form3Example4cg">Şifre</label>
                </div>

                <div class="form-outline mb-4">
                  <input type="password" id="form3Example4cdg" class="form-control form-control-lg" 
                  onChange={(e) => setConfirmPassword(e.target.value)} value={confirmpassword}/>
                  <label class="form-label" for="form3Example4cdg">Şifre tekrar</label>
                </div>

            

                <div class="d-flex justify-content-center">
                  <button type="button"
                    class="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={(e) => handleSave(e)}>Kaydol</button>
                </div>

                <p className="text-center text-muted mt-5 mb-0">Zaten hesabın var mı? <a href="#!" className="fw-bold text-body" onClick={(e) => handleLogin(e)}><u>Giriş Yap</u></a></p>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    )
}