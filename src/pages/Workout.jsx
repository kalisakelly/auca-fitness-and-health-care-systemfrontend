import { useEffect, useState } from 'react';
import Achievements from '../components/Achievements';
import axios from 'axios';

const Workout = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVideos, setFilteredVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:3001/videos");
        setVideos(response.data);
        setFilteredVideos(response.data);
      } catch (e) {
        console.error("Error getting videos", e);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    const results = videos.filter(video =>
      video.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVideos(results);
  }, [searchTerm, videos]);

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : description;
  };

  return (
    <div className="flex flex-col">
      <header className="bg-blue-500 text-white p-8">
        <h1 className="text-4xl font-bold">Start Your Workout From Today</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </header>

      <section className="bg-white p-8">
      <Achievements />

      </section>

      <section className="bg-gray-50 p-8">
        <h2 className="text-2xl font-bold mb-4">Popular Exercises</h2>
        <input
          type="text"
          placeholder="Search by name or category"
          className="mb-4 p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="grid grid-cols-3 gap-4">
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video, index) => (
              <div key={index} className="bg-white rounded overflow-hidden shadow-lg">
                <div className="video-container" dangerouslySetInnerHTML={{ __html: video.url }} />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{video.name}</h3>
                  <p className="text-gray-500">{truncateDescription(video.description, 50)}</p>
                  <p className="text-gray-500">{video.createdate}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No videos available</p>
          )}
        </div>
      </section>

      <style jsx>{`
        .video-container {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 aspect ratio */
          height: 0;
          overflow: hidden;
          max-width: 100%;
          background: #000;
        }

        .video-container iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
      `}</style>
    </div>
  );
};

export default Workout;
