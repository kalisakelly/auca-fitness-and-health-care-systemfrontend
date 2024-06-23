import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const NutritionDetails = () => {
  const { id } = useParams();
  const [nutrition, setNutrition] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNutritionDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/nutrition/${id}`);
        setNutrition(response.data);
      } catch (error) {
        console.error('Error fetching nutrition details:', error);
      }
    };

    fetchNutritionDetails();
  }, [id]);

  if (!nutrition) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md max-w-lg h-100 w-screen">
        <h2 className="text-2xl mb-4">{nutrition.name}</h2>
        {nutrition.image && (
            <img
             src={nutrition.image}
              alt={nutrition.name}
              className="h-10 w-10 rounded-full"
              />
         )}
        <p className="mb-4"><strong>Description:</strong> {nutrition.description}</p>
        <p className="mb-4"><strong>Category:</strong> {nutrition.category}</p>
        <button
          onClick={() => navigate(-1)}
          className="justify-center w-50 bg-blue-500 text-white p-2 rounded "
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default NutritionDetails;
