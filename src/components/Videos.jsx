import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoList from '../components/VideoList';
import VideoForm from '../components/VideoForm';

const HomePage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get('http://localhost:3001/videos');
      setVideos(response.data);
    };
    fetchVideos();
  }, []);

  const handleVideoUpload = (newVideo) => {
    setVideos([...videos, newVideo]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Video Upload and Management</h1>
      <VideoForm onUpload={handleVideoUpload} />
      <VideoList videos={videos} />
    </div>
  );
};

export default HomePage;
