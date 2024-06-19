import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const VideoList = ({ videos }) => {
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/videos/${id}`);
    // Handle delete in parent component or refetch videos after deletion
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Videos</h2>
      <ul>
        {videos.map((video) => (
          <li key={video.id} className="mb-2">
            <Link to={`/video/${video.id}`} className="text-blue-300 hover:underline">
              {video.name}
            </Link>
            <button
              onClick={() => handleDelete(video.id)}
              className="ml-4 text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
