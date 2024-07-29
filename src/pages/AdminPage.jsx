import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserActions from '../components/UserActions';
import VisitorInsights from '../components/VisitorInsights';
import StudyTypeChart from '../components/StudyTypeChart';
import VideoChart from '../components/VideoChart';
import { useNavigate } from 'react-router-dom';

const Adminpage = () => {
  const [videoCount, setVideoCount] = useState(0);
  const [nutritionCount, setNutritionCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const videoResponse = await axios.get('c');
        setVideoCount(videoResponse.data.count);

        const nutritionResponse = await axios.get('http://localhost:3001/nutrition/count');
        setNutritionCount(nutritionResponse.data.count);

        const blogResponse = await axios.get('http://localhost:3001/blogs/count');
        setBlogCount(blogResponse.data.count);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  const handleAddVideo = () => {
    navigate('/home/VideoFormPage');
  };

  const handleAddNutrition = () => {
    navigate('/home/NutritionFormPage');
  };

  const handleAddBlog = () => {
    navigate('/home/BlogFormPage');
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
          <p className="text-3xl mb-4">{nutritionCount}</p>
          <button className="bg-gray-800 text-white p-2 rounded mb-2" onClick={handleAddNutrition}>
            Add New Nutrition
          </button>
        </div>
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow text-center">
          <h3 className="text-xl mb-2">Blogs</h3>
          <p className="text-3xl mb-4">{blogCount}</p>
          <button className="bg-gray-800 text-white p-2 rounded mb-2" onClick={handleAddBlog}>
            Add New Blog
          </button>
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
