import React, { useState } from 'react';
import './TaskPage.scss';
import TaskDetails from './Details/TaskDetails';  // Example component for task list
import AssignTask from './AssignTasks/AssignTask';  

const TaskPage: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<string>('tasks');

  const handlePageChange = (page: string) => {
    setSelectedPage(page);
  };

  return (
    <div className="task-page-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h3>Task Manager</h3>
        <nav>
          <ul>
            <li>
              <button onClick={() => handlePageChange('tasks')}>Show Tasks</button>
            </li>
            <li>
              <button onClick={() => handlePageChange('assign')}>Assign Task</button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Display the correct page */}
        {selectedPage === 'tasks' ? (
          <TaskDetails />
        ) : selectedPage === 'assign' ? (
          <AssignTask />
        ) : (
          <h2>Please select a page</h2>
        )}
      </div>
    </div>
  );
};

export default TaskPage;
