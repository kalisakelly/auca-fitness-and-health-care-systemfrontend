import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

const NutritionChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [{
      label: 'Nutrition Categories',
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
      ],
    }],
  });

  useEffect(() => {
    axios.get('http://localhost:3000/nutrition')
      .then((response) => {
        const nutrition = response.data;
        const labels = nutrition.map(nutr => nutr.name);
        const categoryCounts = nutrition.reduce((acc, curr) => {
          acc[curr.category] = (acc[curr.category] || 0) + 1;
          return acc;
        }, {});
        const data = Object.values(categoryCounts);
        setData({
          labels: Object.keys(categoryCounts),
          datasets: [{
            label: 'Nutrition Categories',
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
            ],
          }],
        });
      });
  }, []);

  return (
    <div className="max-w-2xl mx-auto my-10">
      <h2 className="text-2xl font-bold mb-5">Nutrition Categories</h2>
      <Pie data={data} />
    </div>
  );
};

export default NutritionChart;
