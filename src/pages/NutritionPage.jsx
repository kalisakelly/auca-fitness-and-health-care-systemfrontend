import React, { useState } from 'react';
import NutritionForm from '../components/NutritionForm';
import NutritionList from '../components/NutritionList';

const NutritionPage = () => {
  const [nutritions, setNutritions] = useState([]);

  const handleUpload = (newNutrition) => {
    setNutritions([...nutritions, newNutrition]);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Nutrition Management</h1>
      <NutritionForm onUpload={handleUpload} />
      <NutritionList nutritions={nutritions} />
    </div>
  );
};

export default NutritionPage;
