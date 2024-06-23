import React, { useState, useEffect } from 'react';
import Achievements from '../components/Achievements';
import axios from 'axios';

const Workout = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [limit] = useState(6); // Number of items per page
  const [sort] = useState('desc'); // Sorting order

  useEffect(() => {
    fetchVideos();
  }, [currentPage, searchTerm]);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/videos', {
        params: {
          page: currentPage,
          search: searchTerm,
          limit,
          sort,
        },
      });
      setVideos(response.data.data);
      setTotalItems(response.data.count);
    } catch (e) {
      console.error("Error getting videos", e);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : description;
  };

  const totalPages = Math.ceil(totalItems / limit);

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
          onChange={handleSearchChange}
        />
        <div className="grid grid-cols-3 gap-4">
          {videos.length > 0 ? (
            videos.map((video, index) => (
              <div key={index} className="bg-white rounded overflow-hidden shadow-lg">
                <div className="video-container" dangerouslySetInnerHTML={{ __html: video.url }} />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{video.name}</h3>
                  <p className="text-gray-500">{truncateDescription(video.description, 50)}</p>
                  <p className="text-gray-500">{video.createdDate}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No videos available</p>
          )}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
          >
            Next
          </button>
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
