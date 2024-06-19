import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UserDetailsForm = () => {
  const [formData, setFormData] = useState({
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

  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const userId = 1; // Replace with actual user ID logic, e.g., from authentication context

  useEffect(() => {
    if (isEdit) {
      axios.get(`http://localhost:3001/userdetails/${id}`)
        .then(response => {
          setFormData(response.data);
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
        });
    } else {
      axios.get(`http://localhost:3001/userdetails/user/${userId}`)
        .then(response => {
          if (response.data.length > 0) {
            setFormData(response.data[0]);
          }
        })
        .catch(error => {
          console.error('Error fetching user details by userId:', error);
        });
    }
  }, [id, isEdit, userId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.patch(`http://localhost:3001/userdetails/${id}`, formData);
        console.log('User details updated');
      } else {
        await axios.post('http://localhost:3001/userdetails', formData);
        console.log('User details created');
      }
      navigate('/success-page'); // Redirect to a success page or another relevant page
    } catch (error) {
      console.error('Error saving user details:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Height (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Mass (kg)</label>
          <input
            type="number"
            name="mass"
            value={formData.mass}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Gender</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Year of Birth</label>
          <input
            type="number"
            name="yearofbirth"
            value={formData.yearofbirth}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Physical Activity Level</label>
          <select
            name="physicalActivityLevel"
            value={formData.physicalActivityLevel}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Sedentary_lifestyle">Little or no exercise</option>
            <option value="Slightly_active_lifestyle">Light exercise or sports 1-2 days/week</option>
            <option value="Moderately_active_lifestyle">Moderate exercise or sports 2-3 days/week</option>
            <option value="Very_active_lifestyle">Hard exercise or sports 4-5 days/week</option>
            <option value="Extra_active_lifestyle">Very hard exercise, physical job, or sports 6-7 days/week</option>
            <option value="Professional_athlete">Professional athlete</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Dietary Preferences</label>
          <input
            type="text"
            name="dietaryPreferences"
            value={formData.dietaryPreferences}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Medical History</label>
          <input
            type="text"
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Fitness Goals</label>
          <input
            type="text"
            name="fitnessGoals"
            value={formData.fitnessGoals}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Current Fitness Level</label>
          <input
            type="text"
            name="currentFitnessLevel"
            value={formData.currentFitnessLevel}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Sleep Patterns</label>
          <input
            type="text"
            name="sleepPatterns"
            value={formData.sleepPatterns}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Stress Level</label>
          <input
            type="text"
            name="stressLevel"
            value={formData.stressLevel}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Waist Circumference (cm)</label>
          <input
            type="number"
            name="waistCircumference"
            value={formData.waistCircumference}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Hip Circumference (cm)</label>
          <input
            type="number"
            name="hipCircumference"
            value={formData.hipCircumference}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Body Fat Percentage</label>
          <input
            type="number"
            name="bodyFatPercentage"
            value={formData.bodyFatPercentage}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Blood Pressure</label>
          <input
            type="text"
            name="bloodPressure"
            value={formData.bloodPressure}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Cholesterol Levels</label>
          <input
            type="text"
            name="cholesterolLevels"
            value={formData.cholesterolLevels}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Blood Sugar Levels</label>
          <input
            type="text"
            name="bloodSugarLevels"
            value={formData.bloodSugarLevels}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Fitness Assessment Results</label>
          <input
            type="text"
            name="fitnessAssessmentResults"
            value={formData.fitnessAssessmentResults}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Activity Tracking Data</label>
          <input
            type="text"
            name="activityTrackingData"
            value={formData.activityTrackingData}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Nutritional Intake</label>
          <input
            type="text"
            name="nutritionalIntake"
            value={formData.nutritionalIntake}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Hydration Level</label>
          <input
            type="text"
            name="hydrationLevel"
            value={formData.hydrationLevel}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Mental Health Information</label>
          <input
            type="text"
            name="mentalHealthInfo"
            value={formData.mentalHealthInfo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Injury History</label>
          <input
            type="text"
            name="injuryHistory"
            value={formData.injuryHistory}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Social Support Network</label>
          <input
            type="text"
            name="socialSupportNetwork"
            value={formData.socialSupportNetwork}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            {isEdit ? 'Update' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserDetailsForm;
