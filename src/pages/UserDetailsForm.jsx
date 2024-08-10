import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';  // Correct import for jwt-decode
import { useNavigate } from 'react-router-dom';

const UserDetailsForm = ({ isEdit }) => {
  const navigate = useNavigate();

  const defaultFormData = {
    name: '',
    height: '',
    mass: '',
    age: '',
    gender: '',
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
  };

  const [formState, setFormState] = useState(defaultFormData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          navigate('/home/Overview');
          return;
        }
        
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`http://localhost:3001/userdetails/user/${userId}`, config);
        const data = response.data;
        console.log('Fetched user data:', data);

        const { id, ...userData } = data;
        setFormState(userData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    if (isEdit) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [isEdit, navigate]);

  useEffect(() => {
    console.log('Form state updated:', formState);
  }, [formState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formState,
        height: formState.height ? parseFloat(formState.height) : null,
        mass: formState.mass ? parseFloat(formState.mass) : null,
        age: formState.age ? parseInt(formState.age, 10) : null,
        waistCircumference: formState.waistCircumference ? parseFloat(formState.waistCircumference) : null,
        hipCircumference: formState.hipCircumference ? parseFloat(formState.hipCircumference) : null,
        bodyFatPercentage: formState.bodyFatPercentage ? parseFloat(formState.bodyFatPercentage) : null,
      };
    
      console.log('Submitting data:', data); // Add this line to see the data being sent
    
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      };
    
      let response;
      if (isEdit) {
        response = await axios.patch(`http://localhost:3001/userdetails/${formState.id}`, data, config);
      } else {
        response = await axios.post('http://localhost:3001/userdetails/create', data, config);
      }
    
      navigate('/home');
    } catch (error) {
      console.error('Error saving user details:', error.response?.data || error.message); // Adjust this line to log detailed error info
    }
  };
  
  
  const handleDelete = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      const response = await axios.delete(`http://localhost:3001/userdetails/${formState.id}`, config);
      console.log('User details deleted:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error deleting user details:', error);
    }
  };

  const handleFetch = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        navigate('/');
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`http://localhost:3001/userdetails/user/${userId}`, config);
      const data = response.data;
      console.log('Fetched user data:', data);
      setFormState(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-3xl font-bold mb-6 text-center">{isEdit ? 'Edit User Details' : 'Create User Details'}</h2>
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {Object.keys(defaultFormData).map((key) => (
            <div key={key}>
              <label className="block text-gray-700 font-bold mb-2">
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
              </label>
              {key === 'gender' ? (
                <select
                  name={key}
                  value={formState[key]}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              ) : key.includes('History') || key.includes('Goals') || key.includes('Results') ||
                key.includes('Data') || key.includes('Intake') || key.includes('Info') ||
                key.includes('Network') ? (
                <textarea
                  name={key}
                  value={formState[key]}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                />
              ) : (
                <input
                  type={['height', 'mass', 'age', 'waistCircumference', 'hipCircumference', 'bodyFatPercentage'].includes(key) ? 'number' : 'text'}
                  name={key}
                  value={formState[key]}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
            {isEdit ? 'Update' : 'Create'}
          </button>
          {isEdit && (
            <>
              <button type="button" onClick={handleFetch} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
                Fetch
              </button>
              <button type="button" onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200">
                Delete
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserDetailsForm;
