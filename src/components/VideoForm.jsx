import React, { useState } from 'react';
import axiosInstance from '../apis/axios'; // Ensure this path is correct

const VideoForm = ({ onUpload }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const newVideo = { name, url, description, category };

    try {
      const token = localStorage.getItem('token');
      console.log('Token from localStorage:', token);

      if (!token) {
        setError('Token not found. Please login.');
        return;
      }

      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        setError('Invalid token format.');
        return;
      }

      const response = await axiosInstance.post('/videos/upload', newVideo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onUpload(response.data);
      setSuccess('Video uploaded successfully');
      setName('');
      setUrl('');
      setDescription('');
      setCategory('');
    } catch (err) {
      console.error('Error uploading video:', err.response ? err.response.data : err.message);
      setError('Failed to upload video');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Upload a Video</h2>
      {error && <div className="bg-red-500 text-white p-2 mb-4 rounded">{error}</div>}
      {success && <div className="bg-green-500 text-white p-2 mb-4 rounded">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Video Name</label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="url" className="block text-gray-700">Video URL</label>
          <input
            type="text"
            id="url"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description</label>
          <textarea
            id="description"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700">Category</label>
          <select
            id="category"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>Select Category</option>
            <option value="Fitness">Fitness</option>
            <option value="Nutrition">Nutrition</option>
            <option value="Wellness">Wellness</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Upload Video</button>
      </form>
    </div>
  );
};

export default VideoForm;
