import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
// import { addAdminUsers } from '../../redux/slice/addUsersAdmin'
import { handleError, handleSuccess } from '../../../utils/Error'
import { addAdminUsers } from '../../../redux/slice/addUsersAdmin'


const UserForm = () => {
    const [clientInfo, setclientInfo] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    password: '',
    role:""
    })
        
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handlenewProject = async (e) => {
        e.preventDefault();
        try {
          const response = await dispatch(addAdminUsers(clientInfo)).unwrap();
          handleSuccess(response.message);
          setTimeout(() => navigate("/admin"), 1000);
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
                        <form onSubmit={handlenewProject}>
                            <div class="auth-header">
                                <a href="/admin"><img src="../assets/images/logo-dark.svg" alt="img" /></a>
                            </div>
                            <div class="card my-5">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-end mb-4">
                                        <h3 class="mb-0"><b>Create New User</b></h3>
                                    </div>
                                       <div class="row">
                                        <div class="form-group mb-3">
                                            <label class="form-label">First Name*</label>
                                            <input type="text" class="form-control" name="fname" value={clientInfo.firstName} onChange={(e) => setclientInfo({ ...clientInfo, firstName: e.target.value })} placeholder="First Name" />
                                        </div>
                                    </div>
                                          <div class="row">
                                        <div class="form-group mb-3">
                                            <label class="form-label">Last Name*</label>
                                            <input type="text" class="form-control" name="lname" value={clientInfo.lastName} onChange={(e) => setclientInfo({ ...clientInfo, lastName: e.target.value })} placeholder="Last Name" />
                                        </div>
                                    </div>
                                       <div class="row">
                                        <div class="form-group mb-3">
                                            <label class="form-label">Email</label>
                                            <input type="text" class="form-control" name="email" value={clientInfo.email} onChange={(e) => setclientInfo({ ...clientInfo, email: e.target.value })} placeholder="Email" />
                                        </div>
                                    </div>
                                       <div class="row">
                                        <div class="form-group mb-3">
                                            <label class="form-label">Company Name*</label>
                                            <input type="text" class="form-control" name="company" value={clientInfo.company} onChange={(e) => setclientInfo({ ...clientInfo, company: e.target.value })} placeholder="Company Name" />
                                        </div>
                                    </div>
                                       <div class="row">
                                        <div class="form-group mb-3">
                                            <label class="form-label">Password</label>
                                            <input type="text" class="form-control" name="password" value={clientInfo.password} onChange={(e) => setclientInfo({ ...clientInfo, password: e.target.value })} placeholder="Password" />
                                        </div>
                                    </div>
                                    <div class="form-group mb-3">
                                        <label class="form-label">Role</label>
                                        <select
                                            className="form-control"
                                            value={clientInfo.role}
                                            onChange={(e) => setclientInfo({ ...clientInfo, role: e.target.value })}
                                            required
                                        >
                                            <option>-- Select Role --</option>
                                            <option value="client">Client</option>
                                            <option value="designer">Designer</option>
                                            <option value="tester">Tester</option>
                                            <option value="developer">Developer</option>
                                        </select>
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
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default UserForm