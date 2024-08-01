import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDetailsForm = ({ isEdit }) => {
  const navigate = useNavigate();

  const defaultFormData = {
    name: '',
    height: '',
    mass: '',
    age: '',
    BMI: '',
    healthstatus: '',
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

  const [formState, setFormState] = useState(defaultFormData);

  useEffect(() => {
    if (isEdit) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get('http://localhost:3001/userdetails/user/test');
          console.log('Fetched user data:', response.data);
          setFormState(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
    }
  }, [isEdit]);

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
        yearofbirth: formState.yearofbirth ? parseInt(formState.yearofbirth, 10) : null,
        waistCircumference: formState.waistCircumference ? parseFloat(formState.waistCircumference) : null,
        hipCircumference: formState.hipCircumference ? parseFloat(formState.hipCircumference) : null,
        bodyFatPercentage: formState.bodyFatPercentage ? parseFloat(formState.bodyFatPercentage) : null,
      };

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
      {Object.keys(defaultFormData).map((key) => (
        <div style={styles.fieldGroup} key={key}>
          <label style={styles.label}>
            {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
          </label>
          {key === 'physicalActivityLevel' ? (
            <select
              name={key}
              value={formState[key]}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="Sedentary">Sedentary</option>
              <option value="moderate exercise or sports 2-3 days/week">
                Moderate exercise or sports 2-3 days/week
              </option>
              <option value="Vigorously_active_lifestyle">Vigorously active lifestyle</option>
            </select>
          ) : key.includes('History') || key.includes('Goals') || key.includes('Results') ||
            key.includes('Data') || key.includes('Intake') || key.includes('Info') ||
            key.includes('Network') ? (
            <textarea
              name={key}
              value={formState[key]}
              onChange={handleChange}
              style={styles.textarea}
              placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
            />
          ) : (
            <input
              type={['height', 'mass', 'age', 'yearofbirth', 'waistCircumference', 'hipCircumference', 'bodyFatPercentage'].includes(key) ? 'number' : 'text'}
              name={key}
              value={formState[key]}
              onChange={handleChange}
              style={styles.input}
              placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
            />
          )}
        </div>
      ))}
      <button type="submit" style={styles.button}>
        {isEdit ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

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
