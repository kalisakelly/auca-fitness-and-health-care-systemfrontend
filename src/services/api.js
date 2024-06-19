import axios from 'axios';

const API_URL = 'http://localhost:3001/blog';

export const getAllBlogs = () => axios.get(API_URL);
export const getBlogById = (id) => axios.get(`${API_URL}/${id}`);
export const createBlog = (data, token) => axios.post(API_URL, data, {
  headers: { Authorization: `Bearer ${token}` }
});
export const updateBlog = (id, data, token) => axios.patch(`${API_URL}/${id}`, data, {
  headers: { Authorization: `Bearer ${token}` }
});
export const deleteBlog = (id, token) => axios.delete(`${API_URL}/${id}`, {
  headers: { Authorization: `Bearer ${token}` }
});
export const likeBlog = (id, token) => axios.patch(`${API_URL}/${id}/like`, null, {
  headers: { Authorization: `Bearer ${token}` }
});
export const viewBlog = (id) => axios.patch(`${API_URL}/${id}/view`);
export const commentOnBlog = (id, text, token) => axios.post(`${API_URL}/${id}/comment`, { text }, {
  headers: { Authorization: `Bearer ${token}` }
});
