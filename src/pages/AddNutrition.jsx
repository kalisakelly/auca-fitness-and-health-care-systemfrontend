import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles

const AddNutrition = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState(''); // HTML formatted description
  const [category, setCategory] = useState('Carbohydrate');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. User might not be authenticated.');
      navigate('/login'); // Redirect to login page if no token
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description); // HTML formatted description
    formData.append('category', category);
    if (image) formData.append('image', image);

    try {
      await axios.post('http://localhost:3001/nutrition', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/home/dietplan');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized. Token might be invalid or expired:', error);
        navigate('/login'); // Redirect to login page if unauthorized
      } else {
        console.error('Error adding nutrition:', error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Add New Nutrition</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <ReactQuill
            value={description}
            onChange={setDescription}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value[0])}
            className="w-full p-2 border rounded"
            required
          >
            <option value="Carbohydrate">High calories</option>
            <option value="Protein">Low calories</option>
            <option value="Fat">Medium calories</option>
            <option value="Vitamin">Balanced diet</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Add Nutrition</button>
      </form>
    </div>
  );
};

export default AddNutrition;
