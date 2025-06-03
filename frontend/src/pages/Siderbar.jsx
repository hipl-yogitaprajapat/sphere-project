import { Link } from 'react-router-dom'
import { useSidebar } from '../components/contextapi/SidebarContext';

const Sidebar = () => {
  const { isSidebarVisible } = useSidebar();
  const role = localStorage.getItem("role");
  console.log(role, "role");

  return (
    <>
      {/* <!-- [ Sidebar Menu ] start --> */}
      <nav className={`pc-sidebar pc-trigger overflow-scroll ${isSidebarVisible ? '' : 'pc-sidebar-hide'}`}>
        <div class="navbar-wrapper">
          <div class="m-header">
            <Link to="/dashboard" class="b-brand text-primary">
              <img src="../../assets/images/logo-dark.svg" class="img-fluid logo-lg" alt="logo" />
            </Link>
          </div>
          <div class="navbar-content">
            <ul class="pc-navbar">
              <li class="pc-item">
                <Link to="/dashboard" class="pc-link">
                  <span class="pc-micon"><i class="ti ti-dashboard"></i></span>
                  <span class="pc-mtext">Dashboard</span>
                </Link>
              </li>

              <li class="pc-item pc-caption">
                <label>Form Components</label>
                <i class="ti ti-dashboard"></i>
              </li>
              {role === "client" && (
                <>
                  <li class="pc-item">
                    <Link to="/client-project" class="pc-link">
                      <span class="pc-micon"><i class="ti ti-typography"></i></span>
                      <span class="pc-mtext">New Project</span>
                    </Link>
                  </li>
                </>
              )}
              {role === "admin" && (
                <>
                  <li class="pc-item">
                    <Link to="/user-form" class="pc-link">
                      <span class="pc-micon"><i class="ti ti-typography"></i></span>
                      <span class="pc-mtext">Add User</span>
                    </Link>
                  </li>
                  <li class="pc-item pc-caption">
                    <label>Project Management</label>
                    <i class="ti ti-dashboard"></i>
                  </li>
                  <li class="pc-item">
                    <Link to="/create-project" class="pc-link">
                      <span class="pc-micon"><i class="ti ti-typography"></i></span>
                      <span class="pc-mtext"> New Project</span>
                    </Link>
                  </li>
                  <li class="pc-item">
                    <Link to="/view-projects" class="pc-link">
                      <span class="pc-micon"><i class="ti ti-typography"></i></span>
                      <span class="pc-mtext">View Projects</span>
                    </Link>
                  </li>
                </>
              )}
              {(role === "admin") && (
                <>
                  <li class="pc-item pc-caption">
                    <label>Task Management</label>
                    <i class="ti ti-dashboard"></i>
                  </li>
                  <li class="pc-item">
                    <Link to="/create-task" class="pc-link">
                      <span class="pc-micon"><i class="ti ti-typography"></i></span>
                      <span class="pc-mtext"> New Task</span>
                    </Link>
                  </li>
                </>
              )}
              {(role === "admin" || role === "developer" || role === "tester" || role === "designer") && (
                <li class="pc-item">
                  <Link to="/view-task" class="pc-link">
                    <span class="pc-micon"><i class="ti ti-typography"></i></span>
                    <span class="pc-mtext">View Task</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {/* <!-- [ Sidebar Menu ] end --> <!-- [ Header Topbar ] start --> */}
    </>
  )
}

export default Sidebar