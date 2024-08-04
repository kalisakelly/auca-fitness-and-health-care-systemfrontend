import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

const Biometrics = () => {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.id;
          const response = await axios.get(`http://localhost:3001/userdetails/user/test`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUserDetails(response.data);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  if (userDetails === null) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="mb-4">No user details found.</p>
        <Button
          onClick={() => navigate('/home/UserDetailsForm')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
        >
          Add Your Details
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8 dark:bg-gray-900 dark:text-gray-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Health Report</h1>
              <p className="text-gray-500 dark:text-gray-400">Download your personalized health report</p>
            </div>
            <Button
              as="a"
              href={`http://localhost:3001/download/pdf`}
              download
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
            >
              Download PDF
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Personal Information</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Name:</span>
                  <span>{userDetails.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Age:</span>
                  <span>{userDetails.age}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Gender:</span>
                  <span>{userDetails.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Height:</span>
                  <span>{userDetails.height} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Weight:</span>
                  <span>{userDetails.weight} kg</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Medical History</h2>
              <div className="space-y-2">
                {/* <div className="flex justify-between">
                  <span className="font-medium">Allergies:</span>
                  <span>{userDetails.allergies.join(', ')}</span>
                </div> */}
                {/* <div className="flex justify-between">
                  <span className="font-medium">Chronic Conditions:</span>
                  <span>{userDetails.chronicConditions.join(', ')}</span>
                </div> */}
                {/* <div className="flex justify-between">
                  <span className="font-medium">Medications:</span>
                  <span>{userDetails.medications.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Surgeries:</span>
                  <span>{userDetails.surgeries.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Family History:</span>
                  <span>{userDetails.familyHistory.join(', ')}</span>
                </div> */}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Test Results</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Blood Pressure:</span>
                  <span>{userDetails.bloodPressure}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Cholesterol:</span>
                  <span>{userDetails.cholesterol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Blood Sugar:</span>
                  <span>{userDetails.bloodSugar}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Vitamin D:</span>
                  <span>{userDetails.vitaminD}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Hemoglobin A1C:</span>
                  <span>{userDetails.hemoglobinA1C}</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Recommendations</h2>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Diet:</span>
                  <p>{userDetails.diet}</p>
                </div>
                <div>
                  <span className="font-medium">Exercise:</span>
                  <p>{userDetails.exercise}</p>
                </div>
                <div>
                  <span className="font-medium">Sleep:</span>
                  <p>{userDetails.sleep}</p>
                </div>
                <div>
                  <span className="font-medium">Stress Management:</span>
                  <p>{userDetails.stressManagement}</p>
                </div>
                <div>
                  <span className="font-medium">Follow-up:</span>
                  <p>{userDetails.followUp}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-2">Blood Pressure</h3>
            <p className="text-2xl">{userDetails.bloodPressure}</p>
            <p className="text-green-600">{userDetails.bloodPressureStatus}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-2">Blood Sugar</h3>
            <p className="text-2xl">{userDetails.bloodSugar}</p>
            <p className="text-green-600">{userDetails.bloodSugarStatus}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-2">Heart Rate</h3>
            <p className="text-2xl">{userDetails.heartRate}</p>
            <p className="text-green-600">{userDetails.heartRateStatus}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-2">Intake Goal</h3>
            <p className="text-2xl text-blue-600">{userDetails.intakeGoal} / {userDetails.totalIntakeGoal}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Biometrics;
