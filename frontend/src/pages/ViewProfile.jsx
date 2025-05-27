import { useEffect } from 'react'
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { viewProfile } from '../components/redux/slice/authSlice';


const ViewProfile = () => {

    const dispatch = useDispatch()
    const {profile } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(viewProfile());
    }, [dispatch]);

    return (
        <>
            <div class="auth-main">
                <div class="auth-wrapper v3">
                    <ToastContainer />
                    <div class="auth-form">
                        <form>
                            <div class="auth-header">
                                <a href="/dashboard"><img src="../assets/images/logo-dark.svg" alt="img" /></a>
                            </div>
                            <div class="card my-5">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-end mb-4">
                                        <h3 class="mb-0"><b>View Profile</b></h3>
                                    </div>

                                    <div class="row">
                                        <div class="text-center mb-3">
                                            <div class="chat-avtar d-inline-flex mx-auto">
                                                <img
                                                    class="rounded-circle img-fluid wid-70"
                                                    src={
                                                        profile?.user?.image
                                                            ? `http://localhost:5001/uploads/${profile.user.image}`
                                                            : "../assets/images/user/avatar-5.jpg"
                                                    }
                                                    alt="User image"
                                                />
                                            </div>
                                        </div>
                                        <div class="card">
                                            <div class="card-header">
                                                <h5>Personal Details</h5>
                                            </div>
                                            <div class="card-body">
                                                <ul class="list-group list-group-flush">
                                                    <li class="list-group-item px-0 pt-0">
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <p class="mb-1 text-muted">First Name</p>
                                                                <p class="mb-0">{profile?.user?.firstName}</p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li class="list-group-item px-0">
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <p class="mb-1 text-muted">Last Name</p>
                                                                <p class="mb-0">{profile?.user?.lastName}</p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li class="list-group-item px-0">
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <p class="mb-1 text-muted">Company</p>
                                                                <p class="mb-0">{profile?.user?.company}</p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

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

export default ViewProfile