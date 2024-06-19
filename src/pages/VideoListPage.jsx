import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoList from '../components/VideoList';

const VideoListPage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get('http://localhost:3001/videos');
      setVideos(response.data);
    };
    fetchVideos();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Videos</h1>
      <VideoList videos={videos} />
    </div>
  );
};

export default VideoListPage;
