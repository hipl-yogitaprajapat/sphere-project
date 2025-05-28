import { useNavigate } from "react-router-dom"
import Header from "../../pages/Header"
import Sidebar from "../../pages/Siderbar"
import ViewProjects from "./ViewProjects";

const Admin = () => {
  const navigate = useNavigate();
  return (
    <>
      <Sidebar />
      <Header />
      <div className="pc-container">
        <div className="pc-content">
          <div className="page-header">
            <div className="page-block d-flex justify-content-between align-items-center">
              <h2 className="mb-0">Dashboard</h2>
            </div>
          </div>
          <ViewProjects/>
        </div>
      </div>
    </>
  )
}

export default Admin;
