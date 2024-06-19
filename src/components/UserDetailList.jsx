import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserDetailList = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3001/userdetails');
        setUserDetails(response.data);
      } catch (err) {
        console.error('Error fetching user details:', err);
        setError('Failed to fetch user details');
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      {error && <div className="bg-red-500 text-white p-2 mb-4 rounded">{error}</div>}
      <ul>
        {userDetails.map((detail) => (
          <li key={detail.id} className="mb-4 p-2 border border-gray-300 rounded">
            <h3 className="text-xl font-bold">{detail.name}</h3>
            <p>Height: {detail.height} cm</p>
            <p>Mass: {detail.mass} kg</p>
            <Link to={`/userdetails/${detail.id}`} className="text-blue-500">View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetailList;
