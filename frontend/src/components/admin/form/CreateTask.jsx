import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { createNewTask, viewUsersByRole } from '../../redux/slice/taskSlice';
import {createNewTask,viewUsersByRole} from "../../../redux/slice/taskSlice"
import { handleError, handleSuccess } from '../../../utils/Error';
import Select from "react-select"

const CreateTask = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [taskInfo, setTaskInfo] = useState({
        taskname: '',
        projects: '',
        description: '',
        priority: '',
        status: '',
        designation: '',
        assignedTo: [],
        dueDate: '',
        attachments: null,
    });

    const [filteredUsers, setFilteredUsers] = useState([]);
    const { projects } = useSelector((state) => state.admin);

    // Watch for designation changes and fetch users
    useEffect(() => {
        const fetchUsersByDesignation = async () => {
            const designation = taskInfo.designation;
            if (designation) {
                try {
                    const res = await dispatch(viewUsersByRole(designation)).unwrap();
                    setFilteredUsers(res);
                } catch (err) {
                    handleError(err);
                    setFilteredUsers([]);
                }
            } else {
                setFilteredUsers([]);
            }
        };

        fetchUsersByDesignation();
    }, [taskInfo.designation, dispatch]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', taskInfo.taskname);
        formData.append('project', taskInfo.projects);
        formData.append('description', taskInfo.description);
        formData.append('priority', taskInfo.priority);
        formData.append('status', taskInfo.status);
        formData.append('designation', taskInfo.designation);
        formData.append('dueDate', taskInfo.dueDate);

        taskInfo.assignedTo.forEach(userId => {
            formData.append('assignedTo', userId);
        });

        if (taskInfo.attachments) {
            formData.append('attachments', taskInfo.attachments);
        }
        try {
            const response = await dispatch(createNewTask(formData)).unwrap();
            handleSuccess(response.message);
            navigate('/admin');
        } catch (err) {
            handleError(err);
        }
    };
    const userOptions = filteredUsers.map((user) => ({
        value: user._id,
        label: `${user.firstName} ${user.lastName}`,
    }));

    return (
        <div className="container mt-3">
            <h4>Create New Task</h4>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Task Name</label>
                        <input type="text" className="form-control" name='name' value={taskInfo.taskname} onChange={(e) => setTaskInfo({ ...taskInfo, taskname: e.target.value })} placeholder="Task Name" />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Designation</label>
                        <select
                            className="form-control"
                            value={taskInfo.designation}
                            onChange={(e) => setTaskInfo({ ...taskInfo, designation: e.target.value, assignedTo: '' })}
                            required
                        >
                            <option>-- Select Designation --</option>
                            <option value="developer">Developer</option>
                            <option value="tester">Tester</option>
                            <option value="designer">Designer</option>
                        </select>
                    </div>             
                      <div className="mt-3">
                        <label className="form-label">Assign To</label>
                        <Select
                            isMulti
                            name="assignedTo"
                            options={userOptions}
                            value={userOptions.filter(option => taskInfo.assignedTo.includes(option.value))}
                            onChange={(selectedOptions) =>
                                setTaskInfo({ ...taskInfo, assignedTo: selectedOptions.map(option => option.value) })
                            }
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-4">
                        <label className="form-label">Priority</label>
                        <select
                            className="form-control"
                            value={taskInfo.priority}
                            onChange={(e) => setTaskInfo({ ...taskInfo, priority: e.target.value })}
                            required
                        >
                            <option>-- Select Priority --</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Status</label>
                        <select
                            className="form-control"
                            value={taskInfo.status}
                            onChange={(e) => setTaskInfo({ ...taskInfo, status: e.target.value })}
                            required
                        >
                            <option>-- Select Status --</option>
                            <option value="pending">Pending</option>
                            <option value="in progress">In process</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                     <div className="col-md-4">
                        <label className="form-label">Project</label>
                        <select className="form-select" value={taskInfo.projects} onChange={(e) => setTaskInfo({ ...taskInfo, projects: e.target.value })}>
                            <option value="">Select Project</option>
                            {projects.map((project, index) => (
                                <option key={index} value={project._id}>
                                    {project.projectname}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Due Date</label>
                        <input
                            type="date"
                            name="dueDate"
                            className="form-control"
                            value={taskInfo.dueDate}
                            onChange={(e) => setTaskInfo({ ...taskInfo, dueDate: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Attachments</label>
                        <input
                            type="file"
                            name="attachments"
                            className="form-control"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setTaskInfo({ ...taskInfo, attachments: file });
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" value={taskInfo.description} onChange={(e) => setTaskInfo({ ...taskInfo, description: e.target.value })} placeholder="Description" />
                </div>
                <button type="submit" className="btn btn-success mt-3">Create Task</button>
            </form>
        </div>
    );
};

export default CreateTask;
