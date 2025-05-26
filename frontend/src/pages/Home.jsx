import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
    <header id="home" style={{ backgroundColor: '#000', minHeight: '100vh', }}>
    {/* <!-- [ Nav ] start --> */}
    <nav className="navbar navbar-expand-md navbar-dark top-nav-collapse default">
      <div className="container">
        <a className="navbar-brand" href="#">
        <img src="../assets/images/logo-white.svg" alt="logo" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item pe-1">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
                 <li className="nav-item pe-1">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
            <li className="nav-item">
              <a className="btn btn-primary" target="_blank" href="https://codedthemes.com/item/mantis-bootstrap-admin-dashboard/">Purchase Now</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    {/* <!-- [ Nav ] start --> */}
    <div className="container">
      <div className="row align-items-center justify-content-center text-center">
        <div className="col-md-9 col-xl-6">
          <h1 className="mt-sm-3 text-white mb-4 f-w-600 wow fadeInUp" data-wow-delay="0.2s">Carefully Crafted for your
            <span className="text-primary">Caring React</span> Project
          </h1>
          <h5 className="mb-4 text-white opacity-75 wow fadeInUp" data-wow-delay="0.4s"> Mantis React is a blazing-fast
            dashboard template built using the MUI React library.</h5>
          <div className="my-5 wow fadeInUp" data-wow-delay="0.6s">
            <a href="elements/bc_alert.html" className="btn btn-outline-primary me-2" target="_blank">Explore Components</a>
            <a href="dashboard/index.html" className="btn btn-primary" target="_blank">
               <i
                className="ti ti-eye me-1"></i>
                 Live Preview</a>
          </div>
        </div>
      </div>
    </div>
  </header>
    </>
  )
}

export default Home