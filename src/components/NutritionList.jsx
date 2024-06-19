import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NutritionList = () => {
  const [nutritions, setNutritions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNutritions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/nutrition');
        setNutritions(response.data);
      } catch (err) {
        console.error('Error fetching nutrition entries:', err);
        setError('Failed to fetch nutrition entries');
      }
    };

    fetchNutritions();
  }, []);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Uploaded Nutrition Entries</h2>
      {error && <div className="bg-red-500 text-white p-2 mb-4 rounded">{error}</div>}
      <ul>
        {nutritions.map((nutrition) => (
          <li key={nutrition.id} className="mb-4 p-2 border border-gray-300 rounded">
            <h3 className="text-xl font-bold">{nutrition.name}</h3>
            <p>{nutrition.description}</p>
            <p>Category: {nutrition.category}</p>
            {nutrition.image && (
              <img
                src={`http://localhost:3001/uploads/${nutrition.image}`}
                alt={nutrition.name}
                className="w-full mt-2 rounded"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NutritionList;
