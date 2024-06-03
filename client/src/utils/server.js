import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1',
  withCredentials: true,
});

export default apiClient;
