import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/tasks';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  getAllTasks: async () => {
    const response = await apiClient.get('');
    return response.data;
  },
  
  createTask: async (task) => {
    const response = await apiClient.post('', task);
    return response.data;
  },
  
  updateTask: async (id, task) => {
    const response = await apiClient.put(`/${id}`, task);
    return response.data;
  },
  
  deleteTask: async (id) => {
    const response = await apiClient.delete(`/${id}`);
    return response.data;
  },
  
  markTaskAsDone: async (id) => {
    const response = await apiClient.patch(`/${id}/done`);
    return response.data;
  }
};

export default taskService;
