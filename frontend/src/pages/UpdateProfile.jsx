import { useState } from 'react'
import { ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { handleError, handleSuccess } from '../utils/Error';
import { UpdateUserProfile } from '../redux/slice/authSlice';


const UpdateProfile = () => {
  const [updateInfo, setUpdateInfo] = useState({
    firstName: '',
    lastName: '',
    company: '',
    password: '',
    image:"",
    preview: ''
  })

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
      const formData = new FormData();
      formData.append("firstName", updateInfo.firstName);
      formData.append("lastName", updateInfo.lastName);
      formData.append("company", updateInfo.company);
      formData.append("password", updateInfo.password);
      if (updateInfo.image) {
        formData.append("image", updateInfo.image);
      }
     try {
        const response = await dispatch(UpdateUserProfile(formData)).unwrap();        
        handleSuccess(response.message);
        setTimeout(() => navigate("/client"), 1000);
      } catch (err) {
        handleError(err);
      }
  }

  return (
    <>
      <div class="auth-main">
        <div class="auth-wrapper v3">
          <ToastContainer />
          <div class="auth-form">
            <form onSubmit={handleRegistration}>
              <div class="auth-header">
                <a href="/dashboard"><img src="../assets/images/logo-dark.svg" alt="img" /></a>
              </div>
              <div class="card my-5">
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-end mb-4">
                    <h3 class="mb-0"><b>Update Profile</b></h3>
                  </div>

                  <div class="row">
                    <div class="text-center mb-3">
                      <div class="chat-avtar d-inline-flex mx-auto">
                        <img class="rounded-circle img-fluid wid-70"  src={updateInfo.preview || "../assets/images/user/avatar-5.jpg"}
                          alt="User image" />
                      </div>
                      <div class="col-auto">
                        <input type="file" class="form-control" name="image"  onChange={(e) =>{
                           const file = e.target.files[0];
                            if (file) {
                       const previewUrl = URL.createObjectURL(file);
                       setUpdateInfo({ ...updateInfo, image: file, preview: previewUrl });
                           }
                           }} />

                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group mb-3">
                        <label class="form-label">First Name*</label>
                        <input type="text" class="form-control" name="fname" value={updateInfo.firstName} onChange={(e) => setUpdateInfo({ ...updateInfo, firstName: e.target.value })} placeholder="First Name" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group mb-3">
                        <label class="form-label">Last Name</label>
                        <input type="text" class="form-control" name="lname" value={updateInfo.lastName} onChange={(e) => setUpdateInfo({ ...updateInfo, lastName: e.target.value })} placeholder="Last Name" />
                      </div>
                    </div>
                  </div>
                  <div class="form-group mb-3">
                    <label class="form-label">Company</label>
                    <input type="text" class="form-control" name="company" value={updateInfo.company} onChange={(e) => setUpdateInfo({ ...updateInfo, company: e.target.value })} placeholder="Company" />
                  </div>
                  <div class="form-group mb-3">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-control" name="password" value={updateInfo.password} onChange={(e) => setUpdateInfo({ ...updateInfo, password: e.target.value })} placeholder="Password" />
                  </div>
                  <p class="mt-4 text-sm text-muted">By Signing up, you agree to our <a href="#" class="text-primary"> Terms of Service </a> and <a href="#" class="text-primary"> Privacy Policy</a></p>
                  <div class="d-grid mt-3">
                    <button type="submit" class="btn btn-primary">Update</button>
                  </div>
                  <div class="saprator mt-3">
                  </div>
                </div>
              </div>
              <div class="auth-footer row">
                {/* <!-- <div class=""> --> */}
                <div class="col my-1">
                  <p class="m-0">Copyright © <a href="#">Codedthemes</a></p>
                </div>
                <div class="col-auto my-1">
                  <ul class="list-inline footer-link mb-0">
                    <li class="list-inline-item"><a href="#">Home</a></li>
                    <li class="list-inline-item"><a href="#">Privacy Policy</a></li>
                    <li class="list-inline-item"><a href="#">Contact us</a></li>
                  </ul>
                </div>
                {/* <!-- </div> --> */}
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateProfile