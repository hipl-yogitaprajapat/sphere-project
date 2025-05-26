import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { handleError, handleSuccess } from '../utils/Error';
import { LogoutUser } from '../components/redux/slice/authSlice';
import { ToastContainer } from 'react-toastify';

const Header = ({ onToggleSidebar }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await dispatch(LogoutUser()).unwrap();
            console.log(response, "response");

            handleSuccess(response.message);
            setTimeout(() => navigate("/login"), 1000);
        } catch (err) {
            handleError(err);
            console.log("failed");

        }
    }
    return (
        <>
            <ToastContainer />
            <header class="pc-header" style={{ overflow: 'visible', position: 'relative', zIndex: 100 }}>
                <div class="header-wrapper">
                    {/* <!-- [Mobile Media Block] start --> */}
                    <div class="me-auto pc-mob-drp">
                        <ul class="list-unstyled">
                            {/* <!-- ======= Menu collapse Icon ===== --> */}
                            <li class="pc-h-item pc-sidebar-collapse">
                                <a href="#" class="pc-head-link ms-0" id="sidebar-hide">
                                    <i onClick={onToggleSidebar} class="ti ti-menu-2"></i>
                                </a>
                            </li>
                            <li class="pc-h-item pc-sidebar-popup">
                                <a href="#" class="pc-head-link ms-0" id="mobile-collapse">
                                    <i class="ti ti-menu-2"></i>
                                </a>
                            </li>
                            <li class="dropdown pc-h-item d-inline-flex d-md-none">
                                <a
                                    class="pc-head-link dropdown-toggle arrow-none m-0"
                                    data-bs-toggle="dropdown"
                                    href="#"
                                    role="button"
                                    aria-haspopup="false"
                                    aria-expanded="false"
                                >
                                    <i class="ti ti-search"></i>
                                </a>
                                <div class="dropdown-menu pc-h-dropdown drp-search">
                                    <form class="px-3">
                                        <div class="form-group mb-0 d-flex align-items-center">
                                            <i data-feather="search"></i>
                                            <input type="search" class="form-control border-0 shadow-none" placeholder="Search here. . ." />
                                        </div>
                                    </form>
                                </div>
                            </li>
                            <li class="pc-h-item d-none d-md-inline-flex">
                                <form class="header-search">
                                    <span className='position-absolute top-2 left-2'><i class="ti ti-search"></i></span>
                                    <input type="search" class="form-control" placeholder="Search here. . ." />
                                </form>
                            </li>
                        </ul>
                    </div>
                    {/* <!-- [Mobile Media Block end] --> */}
                    <div class="ms-auto">
                        <ul class="list-unstyled">
                            <li class="dropdown pc-h-item header-user-profile">
                                <a
                                    class="pc-head-link dropdown-toggle arrow-none me-0"
                                    data-bs-toggle="dropdown"
                                    href="#"
                                    role="button"
                                    aria-haspopup="false"
                                    data-bs-auto-close="outside"
                                    aria-expanded="false"
                                >
                                    <img src="../../assets/images/user/avatar-2.jpg" alt="user-image" class="user-avtar" />
                                    <span>Stebin Ben</span>
                                </a>
                                <div class="dropdown-menu dropdown-user-profile dropdown-menu-end pc-h-dropdown">
                                    <div class="dropdown-header">
                                        <div class="d-flex mb-1">
                                            <div class="flex-shrink-0">
                                                <img src="../../assets/images/user/avatar-2.jpg" alt="user-image" class="user-avtar wid-35" />
                                            </div>
                                            <div class="flex-grow-1 ms-3">
                                                <h6 class="mb-1">Stebin Ben</h6>
                                                <span>UI/UX Designer</span>
                                            </div>
                                            <button type="button" onClick={handleLogout} className="pc-head-link bg-transparent"><i className="ti ti-power text-danger"></i></button>
                                        </div>
                                    </div>
                                    <ul class="nav drp-tabs nav-fill nav-tabs" id="mydrpTab" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <button
                                                class="nav-link active"
                                                id="drp-t1"
                                                data-bs-toggle="tab"
                                                data-bs-target="#drp-tab-1"
                                                type="button"
                                                role="tab"
                                                aria-controls="drp-tab-1"
                                                aria-selected="true"
                                            ><i class="ti ti-user"></i> Profile</button
                                            >
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button
                                                class="nav-link"
                                                id="drp-t2"
                                                data-bs-toggle="tab"
                                                data-bs-target="#drp-tab-2"
                                                type="button"
                                                role="tab"
                                                aria-controls="drp-tab-2"
                                                aria-selected="false"
                                            ><i class="ti ti-settings"></i> Setting</button
                                            >
                                        </li>
                                    </ul>
                                    <div class="tab-content" id="mysrpTabContent">
                                        <div class="tab-pane fade show active" id="drp-tab-1" role="tabpanel" aria-labelledby="drp-t1" tabIndex="0">
                                            <Link to="/update-profile" class="dropdown-item">
                                                <i class="ti ti-edit-circle"></i>
                                                <span>Edit Profile</span>
                                            </Link>
                                            <Link to="/dashboard/view-profile" href="#!" class="dropdown-item">
                                                <i class="ti ti-user"></i>
                                                <span>View Profile</span>
                                            </Link>
                                            <a href="#!" class="dropdown-item">
                                                <i class="ti ti-clipboard-list"></i>
                                                <span>Social Profile</span>
                                            </a>
                                            <a href="#!" class="dropdown-item">
                                                <i class="ti ti-wallet"></i>
                                                <span>Billing</span>
                                            </a>
                                            <button type='button' onClick={handleLogout} class="dropdown-item">
                                                <i class="ti ti-power"></i>
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                        <div class="tab-pane fade" id="drp-tab-2" role="tabpanel" aria-labelledby="drp-t2" tabIndex="0">
                                            <a href="#!" class="dropdown-item">
                                                <i class="ti ti-help"></i>
                                                <span>Support</span>
                                            </a>
                                            <a href="#!" class="dropdown-item">
                                                <i class="ti ti-user"></i>
                                                <span>Account Settings</span>
                                            </a>
                                            <a href="#!" class="dropdown-item">
                                                <i class="ti ti-lock"></i>
                                                <span>Privacy Center</span>
                                            </a>
                                            <a href="#!" class="dropdown-item">
                                                <i class="ti ti-messages"></i>
                                                <span>Feedback</span>
                                            </a>
                                            <a href="#!" class="dropdown-item">
                                                <i class="ti ti-list"></i>
                                                <span>History</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header