import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';

Chart.register(...registerables);

const BMICategoryChart = () => {
  const [data, setData] = useState({
    labels: ['Healthy', 'Obese', 'Underweight'],
    datasets: [
      {
        label: 'BMI Categories',
        data: [],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      },
    ],
  });

  useEffect(() => {
    const fetchBMIStats = async () => {
      try {
      
        const response = await axios.get('http://localhost:3001/userdetails/bmi/stats');

        const { healthy, obese, underweight } = response.data;

        setData({
          labels: ['Healthy', 'Obese', 'Underweight'],
          datasets: [
            {
              label: 'BMI Categories',
              data: [healthy, obese, underweight],
              backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
              hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching BMI stats:', error);
      }
    };

    fetchBMIStats();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow h-96">
      <h3 className="text-xl font-bold mb-4">BMI Categories</h3>
      <Doughnut data={data} options={options} />
      <div className="mt-4">
        <ul>
          {data.labels.map((label, index) => (
            <li key={index}>
              {label}: {data.datasets[0].data[index]} (
              {Math.round(
                (data.datasets[0].data[index] /
                  data.datasets[0].data.reduce((a, b) => a + b, 0)) *
                  100
              )}
              %)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BMICategoryChart;
