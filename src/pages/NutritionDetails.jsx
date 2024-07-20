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
    return <div className="flex justify-center items-center h-screen bg-gray-100">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-6">{nutrition.name}</h2>
        {nutrition.image && (
          <img
            src={nutrition.image}
            alt={nutrition.name}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}
        <p className="text-lg mb-4"><strong>Description:</strong> {nutrition.description}</p>
        <p className="text-lg mb-6"><strong>Category:</strong> {nutrition.category}</p>
        <button
          onClick={() => navigate(-1)}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default NutritionDetails;
