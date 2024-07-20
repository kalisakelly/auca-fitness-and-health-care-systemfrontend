import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDetailsForm = ({ isEdit, id, formData }) => {
  const navigate = useNavigate();

  const defaultFormData = {
    name: '',
    height: '',
    mass: '',
    age: '',
    gender: '',
    yearofbirth: '',
    physicalActivityLevel: 'Sedentary',
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

  const [formState, setFormState] = useState(formData || defaultFormData);

  useEffect(() => {
    setFormState(formData || defaultFormData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name: formState.name || null,
        height: parseFloat(formState.height) || null,
        mass: parseFloat(formState.mass) || null,
        age: formState.age ? parseInt(formState.age, 10) : null,
        gender: formState.gender || null,
        yearofbirth: formState.yearofbirth ? parseInt(formState.yearofbirth, 10) : null,
        physicalActivityLevel: formState.physicalActivityLevel,
        dietaryPreferences: formState.dietaryPreferences || null,
        medicalHistory: formState.medicalHistory || null,
        fitnessGoals: formState.fitnessGoals || null,
        currentFitnessLevel: formState.currentFitnessLevel || null,
        sleepPatterns: formState.sleepPatterns || null,
        stressLevel: formState.stressLevel || null,
        waistCircumference: formState.waistCircumference ? parseFloat(formState.waistCircumference) : null,
        hipCircumference: formState.hipCircumference ? parseFloat(formState.hipCircumference) : null,
        bodyFatPercentage: formState.bodyFatPercentage ? parseFloat(formState.bodyFatPercentage) : null,
        bloodPressure: formState.bloodPressure || null,
        cholesterolLevels: formState.cholesterolLevels || null,
        bloodSugarLevels: formState.bloodSugarLevels || null,
        fitnessAssessmentResults: formState.fitnessAssessmentResults || null,
        activityTrackingData: formState.activityTrackingData || null,
        nutritionalIntake: formState.nutritionalIntake || null,
        hydrationLevel: formState.hydrationLevel || null,
        mentalHealthInfo: formState.mentalHealthInfo || null,
        injuryHistory: formState.injuryHistory || null,
        socialSupportNetwork: formState.socialSupportNetwork || null,
      };

      console.log('Submitting data:', data);

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      };

      let response;
      if (isEdit) {
        response = await axios.patch(`http://localhost:3001/userdetails/${id}`, data, config);
      } else {
        response = await axios.post('http://localhost:3001/userdetails', data, config);
      }

      console.log('User details saved:', response.data);
      navigate('/success-page');
    } catch (error) {
      console.error('Error saving user details:', error);
      if (error.response && error.response.data) {
        console.error('Backend response:', error.response.data);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Name:</label>
        <input
          type="text"
          name="name"
          value={formState.name}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter your name"
        />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Height (cm):</label>
        <input
          type="number"
          name="height"
          value={formState.height}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter height in cm"
        />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Mass (kg):</label>
        <input
          type="number"
          name="mass"
          value={formState.mass}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter mass in kg"
        />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Age:</label>
        <input
          type="number"
          name="age"
          value={formState.age}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter age"
        />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Gender:</label>
        <input
          type="text"
          name="gender"
          value={formState.gender}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter gender"
        />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Year of Birth:</label>
        <input
          type="number"
          name="yearofbirth"
          value={formState.yearofbirth}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter year of birth"
        />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Physical Activity Level:</label>
        <select
          name="physicalActivityLevel"
          value={formState.physicalActivityLevel}
          onChange={handleChange}
          style={styles.select}
        >
          <option value="Sedentary">Sedentary</option>
          <option value="Moderately_active_lifestyle">Moderately active lifestyle</option>
          <option value="Vigorously_active_lifestyle">Vigorously active lifestyle</option>
        </select>
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Dietary Preferences:</label>
        <input
          type="text"
          name="dietaryPreferences"
          value={formState.dietaryPreferences}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter dietary preferences"
        />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Medical History:</label>
        <textarea
          name="medicalHistory"
          value={formState.medicalHistory}
          onChange={handleChange}
          style={styles.textarea}
          placeholder="Enter medical history"
        />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Fitness Goals:</label>
        <textarea
          name="fitnessGoals"
          value={formState.fitnessGoals}
          onChange={handleChange}
          style={styles.textarea}
          placeholder="Enter fitness goals"
        />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Current Fitness Level:</label>
        <input
          type="text"
          name="currentFitnessLevel"
          value={formState.currentFitnessLevel}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter current fitness level"
        />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Sleep Patterns:</label>
        <textarea
          name="sleepPatterns"
          value={formState.sleepPatterns}
          onChange={handleChange}
          style={styles.textarea}
          placeholder="Enter sleep patterns"
        />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Stress Level:</label>
        <input
          type="text"
          name="stressLevel"
          value={formState.stressLevel}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter stress level"
        />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Waist Circumference (cm):</label>
        <input
          type="number"
          name="waistCircumference"
          value={formState.waistCircumference}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter waist circumference"
        />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Hip Circumference (cm):</label>
        <input
          type="number"
          name="hipCircumference"
          value={formState.hipCircumference}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter hip circumference"
        />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Body Fat Percentage:</label>
        <input
          type="number"
          name="bodyFatPercentage"
          value={formState.bodyFatPercentage}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter body fat percentage"
        />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Blood Pressure:</label>
        <input
          type="text"
          name="bloodPressure"
          value={formState.bloodPressure}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter blood pressure"
        />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Cholesterol Levels:</label>
        <input
          type="text"
          name="cholesterolLevels"
          value={formState.cholesterolLevels}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter cholesterol levels"
        />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Blood Sugar Levels:</label>
        <input
          type="text"
          name="bloodSugarLevels"
          value={formState.bloodSugarLevels}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter blood sugar levels"
        />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Fitness Assessment Results:</label>
        <textarea
          name="fitnessAssessmentResults"
          value={formState.fitnessAssessmentResults}
          onChange={handleChange}
          style={styles.textarea}
          placeholder="Enter fitness assessment results"
        />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Activity Tracking Data:</label>
        <textarea
          name="activityTrackingData"
          value={formState.activityTrackingData}
          onChange={handleChange}
          style={styles.textarea}
          placeholder="Enter activity tracking data"
        />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Nutritional Intake:</label>
        <textarea
          name="nutritionalIntake"
          value={formState.nutritionalIntake}
          onChange={handleChange}
          style={styles.textarea}
          placeholder="Enter nutritional intake"
        />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Hydration Level:</label>
        <input
          type="text"
          name="hydrationLevel"
          value={formState.hydrationLevel}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter hydration level"
        />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Mental Health Info:</label>
        <textarea
          name="mentalHealthInfo"
          value={formState.mentalHealthInfo}
          onChange={handleChange}
          style={styles.textarea}
          placeholder="Enter mental health info"
        />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Injury History:</label>
        <textarea
          name="injuryHistory"
          value={formState.injuryHistory}
          onChange={handleChange}
          style={styles.textarea}
          placeholder="Enter injury history"
        />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Social Support Network:</label>
        <textarea
          name="socialSupportNetwork"
          value={formState.socialSupportNetwork}
          onChange={handleChange}
          style={styles.textarea}
          placeholder="Enter social support network"
        />
      </div>
      <button type="submit" style={styles.button}>
        {isEdit ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

// Simple styles for demonstration purposes
const styles = {
  form: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  fieldGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  },
  select: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    minHeight: '100px',
  },
  button: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};

export default UserDetailsForm;
