import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { handleError, handleSuccess } from '../utils/Error';
import { ForgetPasswordUser } from '../redux/slice/authSlice';
// import { ForgetPasswordUser } from '../components/redux/slice/authSlice';

const ForgetPassword = () => {
  const [email, setEmail] = useState({
    email: ""
  });

  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(ForgetPasswordUser(email)).unwrap();
      handleSuccess(response.message);
    } catch (err) {
      handleError(err);
    }
  }

  return (
    <>
      <div className="auth-main">
        <div className="auth-wrapper v3">
          <ToastContainer />
          <div className="auth-form">
            <form onSubmit={handleSubmit}>
              <div className="auth-header">
                <a href="/dashboard"><img src="../assets/images/logo-dark.svg" alt="img" /></a>
              </div>
              <div className="card my-5">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-end mb-4">
                    <h3 className="mb-0"><b>Forget Password</b></h3>
                  </div>
                  <div className="form-group mb-3">
                    <h6 className='link-primary'>Type your email</h6>
                    <p>we will send password set-up Link to your email. Plaese check inbox.</p>
                    <input type="email" className="form-control" name='email' value={email.email} onChange={(e) => setEmail({ ...email, email: e.target.value })} placeholder="Email Address" />
                  </div>
                  <div className="d-flex mt-1 justify-content-between">
                  </div>
                  <div className="d-grid mt-4">
                    <button type="submit" className="btn btn-primary">Send email</button>
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

export default ForgetPassword