import { useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Siderbar";
import { useDispatch, useSelector } from "react-redux";
import { viewAdminDashboard } from "../redux/slice/addUsersAdmin";

const Dashboard = () => {
  const dispatch = useDispatch();
  const role = localStorage.getItem("role")
  const { dashboard } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(viewAdminDashboard());
  }, [dispatch]);

  const stats = [
    { label: "Total Projects", value: dashboard.totalProjects, color: "primary", initials: "P" },
    { label: "Total Tasks", value: dashboard.totalTasks, color: "warning", initials: "T" },
    { label: "Total Developers", value: dashboard.totalDevelopers, color: "info", initials: "D" },
    { label: "Total Testers", value: dashboard.totalTesters, color: "warning", initials: "T" },
    { label: "Total Designers", value: dashboard.totalDesigners, color: "secondary", initials: "D" },
    { label: "Approved Tasks", value: dashboard.totalApprovedTasks, color: "success", initials: "A" },
    { label: "Rejected Tasks", value: dashboard.totalRejectedTasks, color: "danger", initials: "R" },
  ];

  return (
    <>
      <Header />
      <Sidebar />
      { role === "admin" && 
      <div className="pc-container">
        <div className="pc-content">
          <div className="page-header">
            <div className="page-block">
              <div className="row align-items-center">
                <div className="col-md-12">
                  <div className="page-header-title">
                    <h5 className="m-b-10">Admin Dashboard</h5>
                  </div>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {stats.map((item, index) => (
              <div key={index} className="col-md-6 col-xl-3 mb-4">
                <div
                  className={`card border-start border-${item.color} border-4 shadow-sm h-100`}
                  style={{ transition: "transform 0.2s ease-in-out" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <div className="card-body d-flex align-items-center">
                    <div
                      className={`bg-${item.color} bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center me-3`}
                      style={{ width: "50px", height: "50px", fontSize: "20px", fontWeight: "bold", color: `var(--bs-${item.color})` }}
                    >
                      {item.initials}
                    </div>
                    <div>
                      <h6 className="text-muted mb-1">{item.label}</h6>
                      <h4 className="mb-0 fw-semibold text-dark">{item.value ?? 0}</h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      }
    </>
  );
};

export default Dashboard;
