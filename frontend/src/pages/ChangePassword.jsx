import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { handleError, handleSuccess } from '../utils/Error';
import { ResetPasswordUser } from '../redux/slice/authSlice';

const ChangePassword = () => {
  const { id, token } = useParams();

  const [input, setInput] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(ResetPasswordUser({ input, id, token })).unwrap();
      handleSuccess(response.message);
      setTimeout(() => navigate("/login"), 1000);
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
                <a href="/dashboard"><img src="../../../assets/images/logo-dark.svg" alt="img" /></a>
              </div>
              <div className="card my-5">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-end mb-4">
                    <h3 className="mb-0"><b>Reset Password</b></h3>
                  </div>
                  <div className="form-group mb-3">
                    <h6 classNameName='link-primary'>Type your email</h6>
                    <p>we will send password set-up Link to your email. Plaese check inbox.</p>
                    <input type="password" className="form-control" name="newPassword" value={input.newPassword} onChange={(e) => setInput({ ...input, newPassword: e.target.value })} placeholder="Enter new password" />
                    <br />
                    <input type="password" className="form-control" name='confirmPassword' value={input.confirmPassword} onChange={(e) => setInput({ ...input, confirmPassword: e.target.value })} placeholder="Enter confirm password" />

                  </div>
                  <div className="d-flex mt-1 justify-content-between">
                  </div>
                  <div className="d-grid mt-4">
                    <button type="submit" className="btn btn-primary">Change Password</button>
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

export default ChangePassword