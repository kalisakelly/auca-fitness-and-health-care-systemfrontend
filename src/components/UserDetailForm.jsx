import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserIdFromToken } from '../utils/auth';

const UserDetailForm = ({ onSave }) => {
  const [form, setForm] = useState({
    name: '',
    height: '',
    mass: '',
    age: '',
    gender: '',
    yearofbirth: '',
    physicalActivityLevel: 'Moderately_active_lifestyle',
    dietaryPreferences: '',
    medicalHistory: '',
    fitnessGoals: '',
    currentFitnessLevel: '',
    sleepPatterns: '',
    stressLevel: '',
    waistCircumference: '',
    hipCircumference: '',
    bodyFatPercentage: '',
    bloodPressure: '',
    cholesterolLevels: '',
    bloodSugarLevels: '',
    fitnessAssessmentResults: '',
    activityTrackingData: '',
    nutritionalIntake: '',
    hydrationLevel: '',
    mentalHealthInfo: '',
    injuryHistory: '',
    socialSupportNetwork: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const userId = getUserIdFromToken();

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3001/userdetails/user/${userId}`)
        .then(response => {
          if (response.data.length > 0) {
            setForm(response.data[0]);
          }
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
        });
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('Token not found. Please login.');
        return;
      }

      let response;
      if (form.id) {
        response = await axios.patch(`http://localhost:3001/userdetails/${form.id}`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        response = await axios.post('http://localhost:3001/userdetails', form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      onSave(response.data);
      setSuccess('User details saved successfully');
    } catch (err) {
      console.error('Error saving user details:', err);
      setError('Failed to save user details');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">{form.id ? 'Update User Details' : 'Create User Details'}</h2>
      {error && <div className="bg-red-500 text-white p-2 mb-4 rounded">{error}</div>}
      {success && <div className="bg-green-500 text-white p-2 mb-4 rounded">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        {/* Other input fields go here */}
        <div className="mb-4">
          <label htmlFor="height" className="block text-gray-700">Height (cm)</label>
          <input
            type="number"
            id="height"
            name="height"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={form.height}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mass" className="block text-gray-700">Mass (kg)</label>
          <input
            type="number"
            id="mass"
            name="mass"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={form.mass}
            onChange={handleChange}
            required
          />
        </div>
        {/* Add more fields as necessary */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{form.id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default UserDetailForm;
