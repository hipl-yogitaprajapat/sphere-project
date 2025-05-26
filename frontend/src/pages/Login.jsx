import { GoogleOAuthProvider } from '@react-oauth/google';
import { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import GoogleComponent from './GoogleComponent';
import { handleError, handleSuccess } from '../utils/Error';
import { LoginUser } from '../components/redux/slice/authSlice';
import { useDispatch } from 'react-redux';


const Login = () => {
  const [loginInfo,setLoginInfo]= useState({
    email:"",
    password:""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const handleLogin=async(e)=>{
    e.preventDefault();
     try {
        const response = await dispatch(LoginUser(loginInfo)).unwrap();
        const role = response.role;
        handleSuccess(response.message);
          setTimeout(() => {
          if(role === "client"){
          navigate("/client")
          }else if(role === "developer"){
          navigate("/developer")
          }else if(role === "designer"){
          navigate("/designer")
          }else if(role === "tester"){
          navigate("/tester")
          }else if(role === "admin"){
            navigate("/admin")
          }else{
            handleError("no route ")
          }
      }, 1000);
      } catch (err) {
        handleError(err);
      }
  }

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;


  return (
   <>
    <div className="auth-main">
    <div className="auth-wrapper v3">
      <ToastContainer />
      <div className="auth-form">
        <form onSubmit={handleLogin}>
        <div className="auth-header">
          <a href="/"><img src="../assets/images/logo-dark.svg" alt="img"/></a>
        </div>
        <div className="card my-5">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-end mb-4">
              <h3 className="mb-0"><b>Login</b></h3>
              <a href="/register" className="link-primary">Don't have an account?</a>
            </div>
            <div className="form-group mb-3">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-control" name='email' value={loginInfo.email} onChange={(e)=>setLoginInfo({...loginInfo,email:e.target.value})} placeholder="Email Address"/>
            </div>
            <div className="form-group mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" name='password' value={loginInfo.password} onChange={(e)=>setLoginInfo({...loginInfo,password:e.target.value})} placeholder="Password"/>
            </div>
            <div className="d-flex mt-1 justify-content-between">
              <div className="form-check">
                <input className="form-check-input input-primary" type="checkbox" id="customCheckc1"/>
                <label className="form-check-label text-muted" for="customCheckc1">Keep me sign in</label>
              </div>
              <Link to="/forget-password"><h5 className="text-secondary f-w-400">Forgot Password?</h5></Link>
            </div>
            <div className="d-grid mt-4">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
            <div className="saprator mt-3">
              <span>Login with</span>
            </div>
            <div className="row">
              <div className="col-4">
                <div className="d-grid">
                  <button type="button" className="btn mt-2 btn-light-primary bg-light text-muted">
                    <GoogleOAuthProvider clientId={googleClientId}>
                    <GoogleComponent/>
                    </GoogleOAuthProvider> 
                  </button>
                </div>
              </div>
              <div className="col-4">
                <div className="d-grid">
                  <button type="button" className="btn mt-2 btn-light-primary bg-light text-muted">
                    <img src="../assets/images/authentication/twitter.svg" alt="img"/> <span className="d-none d-sm-inline-block"> Twitter</span>
                  </button>
                </div>
              </div>
              <div className="col-4">
                <div className="d-grid">
                  <button type="button" className="btn mt-2 btn-light-primary bg-light text-muted">
                    <img src="../assets/images/authentication/facebook.svg" alt="img"/> <span className="d-none d-sm-inline-block"> Facebook</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="auth-footer row">
            <div className="col my-1">
              <p className="m-0">Copyright © <a href="#">Codedthemes</a></p>
            </div>
            <div className="col-auto my-1">
              <ul className="list-inline footer-link mb-0">
                <li className="list-inline-item"><a href="#">Home</a></li>
                <li className="list-inline-item"><a href="#">Privacy Policy</a></li>
                <li className="list-inline-item"><a href="#">Contact us</a></li>
              </ul>
            </div>
        </div>
        </form>
      </div>
    </div>
  </div>
   </>
  )
}

export default Login