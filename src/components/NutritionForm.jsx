import React, { useState } from 'react';
import axios from 'axios';

const NutritionForm = ({ onUpload }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Cabohydrate');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    if (image) {
      formData.append('image', image);
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token not found. Please login.');
        return;
      }

      const response = await axios.post('http://localhost:3001/nutrition', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      onUpload(response.data);
      setSuccess('Nutrition entry uploaded successfully');
      setName('');
      setDescription('');
      setCategory('Cabohydrate');
      setImage(null);
    } catch (err) {
      console.error('Error uploading nutrition entry:', err);
      setError('Failed to upload nutrition entry');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Upload Nutrition Entry</h2>
      {error && <div className="bg-red-500 text-white p-2 mb-4 rounded">{error}</div>}
      {success && <div className="bg-green-500 text-white p-2 mb-4 rounded">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name</label>
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
            <option value="Cabohydrate">Cabohydrate</option>
            <option value="Protein">Protein</option>
            <option value="Lipids">Lipids</option>
            <option value="Vitamins">Vitamins</option>
            <option value="Minerals">Minerals</option>
            <option value="Water">Water</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700">Image</label>
          <input
            type="file"
            id="image"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Upload</button>
      </form>
    </div>
  );
};

export default NutritionForm;
