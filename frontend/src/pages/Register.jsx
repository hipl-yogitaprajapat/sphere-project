import { useState } from 'react'
import { useDispatch } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleComponent from './GoogleComponent';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils/Error';
import { useNavigate } from 'react-router-dom';
import { SignupUser } from '../redux/slice/authSlice';

const Register = () => {
  const [registerInfo, setregisterInfo] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    password: '',
    role:""
  })

  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const handleRegistration = async (e) => {
  e.preventDefault();
  try {
    const response = await dispatch(SignupUser(registerInfo)).unwrap();
    handleSuccess(response.message);
    setTimeout(() => navigate("/login"), 1000);
  } catch (err) {
    handleError(err);
  }
};

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <>
    <div className="auth-main">
    <div className="auth-wrapper v3">
      <ToastContainer />
       <div className="auth-form">
      <form onSubmit={handleRegistration}>
        <div className="auth-header">
          <a href="/"><img src="../assets/images/logo-dark.svg" alt="img" /></a>
        </div>
        <div className="card my-5">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-end mb-4">
              <h3 className="mb-0"><b>Sign up</b></h3>
              <a href="/login" className="link-primary">Already have an account?</a>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label className="form-label">First Name*</label>
                  <input type="text" className="form-control" name="fname" value={registerInfo.firstName} onChange={(e) => setregisterInfo({ ...registerInfo, firstName: e.target.value })} placeholder="First Name" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label className="form-label">Last Name</label>
                  <input type="text" className="form-control" name="lname" value={registerInfo.lastName} onChange={(e) => setregisterInfo({ ...registerInfo, lastName: e.target.value })} placeholder="Last Name" />
                </div>
              </div>
            </div>
            <div className="form-group mb-3">
              <label className="form-label">Company</label>
              <input type="text" className="form-control" name="company" value={registerInfo.company} onChange={(e) => setregisterInfo({ ...registerInfo, company: e.target.value })} placeholder="Company" />
            </div>
            <div className="form-group mb-3">
              <label className="form-label">Email Address*</label>
              <input type="email" className="form-control" name="email" value={registerInfo.email} onChange={(e) => setregisterInfo({ ...registerInfo, email: e.target.value })} placeholder="Email Address" />
            </div>
            <div className="form-group mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" name="password" value={registerInfo.password} onChange={(e) => setregisterInfo({ ...registerInfo, password: e.target.value })} placeholder="Password" />
            </div>
                  <div className="form-group mb-3">
                    <label className="form-label">Role</label>
                    <select
                      className="form-control"
                      value={registerInfo.role}
                      onChange={(e) => setregisterInfo({ ...registerInfo, role: e.target.value })}
                      required
                    >
                      <option>-- Select Role --</option>
                      <option value="tester">Tester</option>
                      <option value="developer">Developer</option>
                      <option value="admin">Admin</option>
                      <option value="designer">Designer</option>
                    </select>
            </div>
            <p className="mt-4 text-sm text-muted">By Signing up, you agree to our <a href="#" className="text-primary"> Terms of Service </a> and <a href="#" className="text-primary"> Privacy Policy</a></p>
            <div className="d-grid mt-3">
              <button type="submit" className="btn btn-primary">Create Account</button>
            </div>
            <div className="saprator mt-3">
              <span>Sign up with</span>
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
                    <img src="../assets/images/authentication/twitter.svg" alt="img" /> <span className="d-none d-sm-inline-block"> Twitter</span>
                  </button>
                </div>
              </div>
              <div className="col-4">
                <div className="d-grid">
                  <button type="button" className="btn mt-2 btn-light-primary bg-light text-muted">
                    <img src="../assets/images/authentication/facebook.svg" alt="img" /> <span className="d-none d-sm-inline-block"> Facebook</span>
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

export default Register