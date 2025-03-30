import axios from 'axios';
import 'carbon-components/css/carbon-components.min.css';
import React, { useEffect, useState } from 'react';
import "./TaskDetails.scss";
import BackToHome from '../../Home/Back/BackToHome'; // Assuming you have this component
import Task from '../Api/Task';
import Project from '../Api/Project';
import { fetchTasks } from '../Api/TaskCalls'

const TaskDetails: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

    // Fetch the list of projects when the component mounts
    useEffect(() => {
        axios.get('http://localhost:9000/project')
            .then(response => {
                setProjects(response.data); // Assuming response is an array of projects
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
            });
    }, []);

    // Fetch the list of tasks when a project is selected
    useEffect(() => {
        if (selectedProjectId !== null) {
            fetchTasks(selectedProjectId)
                .then(fetchedTasks => {
                    setTasks(fetchedTasks); // Set tasks from the fetched data
                })
                .catch(error => {
                    console.error(`Error fetching tasks for project ${selectedProjectId}:`, error);
                });
        }
    }, [selectedProjectId]);

    // Handle project selection change
    const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedProjectId(event.target.value);
    };

    return (
        <div className="app-container">
            <div className="carbon-table-wrapper">
                <h1>Task Details</h1>

                {/* Project Dropdown */}
                <div className="dropdown-container">
                    <label htmlFor="projectSelect">Select Project: </label>
                    <select id="projectSelect" onChange={handleProjectChange}>
                        <option value="">-- Select a Project --</option>
                        {projects.map((project) => (
                            <option key={project.projectId} value={project.projectId}>
                                {project.projectName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Task List */}
                {selectedProjectId && tasks.length > 0 ? (
                    <div>
                        <h2>Task List for Project {selectedProjectId}</h2>
                        <table className="task-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                            <tr>
                                
                                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Task Id</th>
                                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Task Name</th>
                                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Start Date</th>
                                <th style={{ border: "1px solid #ddd", padding: "8px" }}>End Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tasks.map((task) => (
                                <tr key={task.taskId}>                                
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{task.taskId}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{task.taskName}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{task.taskStartDate}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{task.taskEnddate}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : selectedProjectId ? (
                    <p>No tasks found for the selected project.</p>
                ) : (
                    <p>Please select a project.</p>
                )}
                                <BackToHome />

            </div>
        </div>
    );
};

export default TaskDetails;
