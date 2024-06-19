import axiosInstance from './axios';

export const createUser = async (userData) => {
  return axiosInstance.post('/users', userData);
};

export const getCurrentUser = async () => {
  return axiosInstance.get('/users/me');
};

export const getAllUsers = async () => {
  return axiosInstance.get('/users');
};

export const getUserById = async (userId) => {
  return axiosInstance.get(`/users/${userId}`);
};

export const updateUser = async (userId, userData) => {
  return axiosInstance.patch(`/users/${userId}`, userData);
};

export const deleteUser = async (userId) => {
  return axiosInstance.delete(`/users/${userId}`);
};

export const updateUserRole = async (userId, roleData) => {
  return axiosInstance.patch(`/users/${userId}/role`, roleData);
};

// New login function
export const loginUser = async (credentials) => {
  return axiosInstance.post('/auth/login', credentials);
};
