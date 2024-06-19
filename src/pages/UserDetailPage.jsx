import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import UserDetailForm from '../components/UserDetailForm';
import UserDetailList from '../components/UserDetailList';

const UserDetailPage = () => {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState([]);

  const handleSave = (newDetail) => {
    setUserDetails([...userDetails, newDetail]);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Details Management</h1>
      <UserDetailForm userId={id} onSave={handleSave} />
      <UserDetailList />
    </div>
  );
};

export default UserDetailPage;
