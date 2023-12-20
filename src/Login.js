import React , { useState }from 'react';
import { Form, Input, Button } from "antd";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Login(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault();

        const data = {
            email : email,
            password : password,

        }
        const url = 'http://localhost:5045/api/User/CreateUser';
        axios.post(url, data)
        .then((result) => {
            const dt = result.data;
            alert(dt.statusMessage);
            
        })
        .catch((error) =>{
            console.log(error);
        })
    }

    const handleRegistr = () => {
      window.location.href = "/#!";
  }

    return(
         <div class="mask d-flex align-items-center h-100 gradient-custom-3">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card" style={{borderRadius: '15px'}}>
            <div class="card-body p-5">
              <h2 class="text-uppercase text-center mb-5">Giriş Yap</h2>

              <form>

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
                <div class="row mb-4">
                  <div class="col d-flex justify-content-center">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                      <label class="form-check-label" for="form2Example31"> Beni Hatırla </label>
                    </div>
                </div>

                <div class="col">

                    <a href="#!">Şifreni mi Unuttun</a>
                  </div>
                </div>

                <div class="d-flex justify-content-center">
                  <button type="button"
                    class="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={(e) => handleLogin(e)}>Giriş Yap</button>
                </div>

                
                <div class="text-center" >
                <p>Hesabın yoksa <a href="#!"onClick={(e) => handleRegistr(e)}>Üye Ol</a></p>
                </div>



              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    )
}

export default Login;