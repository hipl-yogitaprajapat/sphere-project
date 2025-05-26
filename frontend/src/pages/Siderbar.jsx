import { Link } from 'react-router-dom'

const Sidebar = ({isVisible}) => {
  return (
      <>
       {/* <!-- [ Sidebar Menu ] start --> */}
    <nav className={`pc-sidebar pc-trigger overflow-scroll ${isVisible ? '' : 'pc-sidebar-hide'}`}>
  <div class="navbar-wrapper">
    <div class="m-header">
      <Link to="/dashboard" class="b-brand text-primary">
        <img src="../../assets/images/logo-dark.svg" class="img-fluid logo-lg" alt="logo"/>
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
          <label>UI Components</label>
          <i class="ti ti-dashboard"></i>
        </li>
          <li class="pc-item">
          <Link to="/client-project" class="pc-link">
            <span class="pc-micon"><i class="ti ti-typography"></i></span>
            <span class="pc-mtext">New Project</span>
          </Link>
        </li>
          <li class="pc-item">
          <Link to="/client-issue" class="pc-link">
            <span class="pc-micon"><i class="ti ti-typography"></i></span>
            <span class="pc-mtext">Isuue</span>
          </Link>
        </li>
        <li class="pc-item">
          <Link to="/typography" class="pc-link">
            <span class="pc-micon"><i class="ti ti-typography"></i></span>
            <span class="pc-mtext">Typography</span>
          </Link>
        </li>
        <li class="pc-item">
          <Link to="/color" class="pc-link">
            <span class="pc-micon"><i class="ti ti-color-swatch"></i></span>
            <span class="pc-mtext">Color</span>
          </Link>
        </li>
        <li class="pc-item">
          <Link to="/icons" class="pc-link">
            <span class="pc-micon"><i class="ti ti-plant-2"></i></span>
            <span class="pc-mtext">Icons</span>
          </Link>
        </li>

      </ul>
    </div>
  </div>
</nav>
{/* <!-- [ Sidebar Menu ] end --> <!-- [ Header Topbar ] start --> */}
    </>
  )
}

export default Sidebar