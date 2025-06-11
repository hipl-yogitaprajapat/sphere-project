import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../../../utils/Error'
import { editProject, viewProjects } from '../../../redux/slice/addUsersAdmin'


const EditProject = () => {
  const { id } = useParams();  
     const dispatch = useDispatch()
    const navigate = useNavigate();
    const [editProjectInfo, setEditProjectInfo] = useState({
        projectname: '',
        description: '',
        priority: '',
        issue:'',
        status:'',
    })
    const { projects } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(viewProjects());
    }, [dispatch]);
    

    useEffect(() => {
    if (projects.length > 0) {
        const projectToEdit = projects.find(project => project._id === id);
        if (projectToEdit) {
            setEditProjectInfo({
                projectname: projectToEdit.projectname || '',
                description: projectToEdit.description || '',
                priority: projectToEdit.priority || '',
                issue: projectToEdit.issue || '',
                status: projectToEdit.status || '',
            });
        }
    }
}, [projects, id]);

    const handleEditProject = async (e) => {        
        e.preventDefault();
        try {
          const response = await dispatch(editProject({id,editProjectInfo})).unwrap();          
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
                        <form onSubmit={handleEditProject}>
                            <div class="auth-header">
                                <a href="/admin"><img src="../assets/images/logo-dark.svg" alt="img" /></a>
                            </div>
                            <div class="card my-5">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-end mb-4">
                                        <h3 class="mb-0"><b>Update Project</b></h3>
                                    </div>
                                       <div class="row">
                                        <div class="form-group mb-3">
                                            <label class="form-label">Project Name*</label>
                                            <input type="text" class="form-control" name="projectname" value={editProjectInfo.projectname} onChange={(e) => setEditProjectInfo({ ...editProjectInfo, projectname: e.target.value })} placeholder="Project Name" />
                                        </div>
                                    </div>
                                          <div class="row">
                                    </div>
                                         <div class="row">
                                        <div class="form-group mb-3">
                                            <label class="form-label">Issue</label>
                                            <input type="text" class="form-control" name="issue" value={editProjectInfo.issue} onChange={(e) => setEditProjectInfo({ ...editProjectInfo, issue: e.target.value })} placeholder="Issue" />
                                        </div>
                                    </div>
                                    <div class="form-group mb-3">
                                        <label class="form-label">Priority</label>
                                        <select
                                            className="form-control"
                                            value={editProjectInfo.priority}
                                            onChange={(e) => setEditProjectInfo({ ...editProjectInfo, priority: e.target.value })}
                                            required
                                        >
                                            <option>-- Select Priority --</option>
                                            <option value="high">High</option>
                                            <option value="medium">Medium</option>
                                            <option value="low">Low</option>
                                        </select>
                                    </div>
                                      <div class="form-group mb-3">
                                        <label class="form-label">Status</label>
                                        <select
                                            className="form-control"
                                            value={editProjectInfo.status}
                                            onChange={(e) => setEditProjectInfo({ ...editProjectInfo, status: e.target.value })}
                                            required
                                        >
                                            <option>-- Select Status --</option>
                                            <option value="active">Active</option>
                                            <option value="hold">Hold</option>
                                            <option value="complete">Complete</option>
                                        </select>
                                    </div>
                                       <div class="form-group mb-3">
                                            <label class="form-label">Description</label>
                                            <textarea type="text" class="form-control" name="description" value={editProjectInfo.description} onChange={(e) => setEditProjectInfo({ ...editProjectInfo, description: e.target.value })} placeholder="Description" />
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

export default EditProject