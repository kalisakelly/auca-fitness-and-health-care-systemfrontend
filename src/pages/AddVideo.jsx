import React, { useState, useEffect } from 'react';
import VideoForm from '../components/VideoForm'; // Adjust the import path as needed
import * as jwt_decode from 'jwt-decode'; // Import the jwt-decode library

const ParentComponent = () => {
  const [videos, setVideos] = useState([]);
  const [userRole, setUserRole] = useState('');

  // useEffect(() => {
  //   const token = localStorage.getItem('token'); // Ensure the correct token key
  //   if (token) {
  //     try {
  //       const decodedToken = jwt_decode(token);
  //       console.log('Decoded Token:', decodedToken); // Log the decoded token for debugging
  //       setUserRole(decodedToken.role);
  //     } catch (error) {
  //       console.error('Invalid token:', error);
  //     }
  //   } else {
  //     console.error('Token not found in localStorage.');
  //   }
  // }, []);

  const handleUpload = (newVideo) => {
    setVideos([...videos, newVideo]);
  };

  // if (userRole !== 'admin' && userRole !== 'uploader') {
  //   return <div>You do not have permission to upload videos.</div>;
  // }

  return (
    <div>
      <h1>Upload a Video</h1>
      <VideoForm onUpload={handleUpload} />
      <h2>Uploaded Videos</h2>
      <ul>
        {videos.map((video, index) => (
          <li key={index}>{video.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ParentComponent;
