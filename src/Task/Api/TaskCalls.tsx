import axios from 'axios';

export const fetchTasks = async (projectId: string) => {
    try {
        const response = await axios.get(`http://localhost:9000/project/${projectId}/task/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching tasks for project ${projectId}:`, error);
        throw error;
    }
};