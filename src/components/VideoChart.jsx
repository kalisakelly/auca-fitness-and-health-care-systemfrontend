import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const VideoChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [{
      label: 'Video Uploads',
      data: [],
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
      borderColor: 'rgba(153, 102, 255, 1)',
      fill: false,
    }],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/videos/count/videos');
        console.log('Response Data:', response.data);
        const uploadsPerDay = response.data.uploads || []; // Adjust this based on actual response structure

        if (!Array.isArray(uploadsPerDay)) {
          throw new Error('Response data is not an array');
        }

        const labels = uploadsPerDay.map(item => new Date(item.date).toLocaleDateString());
        const counts = uploadsPerDay.map(item => item.count);

        setData({
          labels,
          datasets: [{
            label: 'Video Uploads',
            data: counts,
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            fill: false,
          }],
        });
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-2xl mx-auto my-10">
      <h2 className="text-2xl font-bold mb-5">Video Uploads</h2>
      <Line data={data} />
    </div>
  );
};

export default VideoChart;
