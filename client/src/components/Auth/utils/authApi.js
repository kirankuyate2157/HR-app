import apiClient from './api';

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/users/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data.message || 'Error registering user';
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await apiClient.post('/users/login', userData);
    return response.data;
  } catch (error) {
    throw error.response.data.message || 'Error logging in user';
  }
};
