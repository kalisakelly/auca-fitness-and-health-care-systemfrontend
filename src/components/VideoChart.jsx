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
    axios.get('http://localhost:3000/videos')
      .then((response) => {
        const videos = response.data;
        const labels = videos.map(video => video.name);
        const uploads = videos.map(video => new Date(video.createdate).getTime());
        setData({
          labels,
          datasets: [{
            label: 'Video Uploads',
            data: uploads,
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            fill: false,
          }],
        });
      });
  }, []);

  return (
    <div className="max-w-2xl mx-auto my-10">
      <h2 className="text-2xl font-bold mb-5">Video Uploads</h2>
      <Line data={data} />
    </div>
  );
};

export default VideoChart;
