// src/api/userApi.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/users';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Adjust according to how you store the token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const createUser = async (userData) => {
  return axiosInstance.post('/', userData);
};

export const getCurrentUser = async () => {
  return axiosInstance.get('/me');
};

export const getAllUsers = async () => {
  return axiosInstance.get('/');
};

export const getUserById = async (userid) => {
  return axiosInstance.get(`/${userid}`);
};

export const updateUser = async (id, userData) => {
  return axiosInstance.patch(`/${id}`, userData);
};

export const deleteUser = async (id) => {
  return axiosInstance.delete(`/${id}`);
};

export const updateUserRole = async (userid, userData) => {
  return axiosInstance.patch(`/${userid}/role`, userData);
};
