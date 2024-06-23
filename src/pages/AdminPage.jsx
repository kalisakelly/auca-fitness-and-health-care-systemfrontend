import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserActions from '../components/UserActions';
import VisitorInsights from '../components/VisitorInsights';
import StudyTypeChart from '../components/StudyTypeChart';
import VideoChart from '../components/VideoChart';
import { useNavigate } from 'react-router-dom';

const Adminpage = () => {
  const [videoCount, setVideoCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideoCount = async () => {
      try {
        const response = await axios.get('http://localhost:3001/videos/count');
        setVideoCount(response.data.count);
      } catch (error) {
        console.error('Error fetching video count:', error);
      }
    };

    fetchVideoCount();
  }, []);

  const handleAddVideo = () => {
    navigate('/VideoFormPage');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Overall activities</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow text-center">
          <h3 className="text-xl mb-2">Exercise Videos</h3>
          <p className="text-3xl mb-4">{videoCount}</p>
          <button className="bg-gray-800 text-white p-2 rounded mb-2" onClick={handleAddVideo}>
            Add New Video
          </button>
        </div>
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow text-center">
          <h3 className="text-xl mb-2">Nutrition</h3>
          {/* Add your content here */}
        </div>
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow text-center">
          <h3 className="text-xl mb-2">Blogs</h3>
          {/* Add your content here */}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <VisitorInsights />
        <StudyTypeChart />
        <VideoChart />
      </div>
    </div>
  );
};

export default Adminpage;
