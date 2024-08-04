import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import { getAllUsers, createUser, updateUser, deleteUser } from '../apis/userApi';
import VisitorInsights from '../components/VisitorInsights';
import VideoChart from '../components/VideoChart';
import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

Modal.setAppElement('#root'); // Adjust according to your app's root element

const Adminpage = () => {
  const [videoCount, setVideoCount] = useState(0);
  const [nutritionCount, setNutritionCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({ username: '', email: '', role: '' });
  const [userIdToEdit, setUserIdToEdit] = useState(null);
  const [bmiData, setBmiData] = useState({
    labels: ['Healthy', 'Obese', 'Underweight'],
    datasets: [
      {
        label: 'BMI Categories',
        data: [],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      },
    ],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [videoResponse, nutritionResponse, blogResponse, usersResponse] = await Promise.all([
          axios.get('http://localhost:3001/videos/count/videos'),
          axios.get('http://localhost:3001/nutrition/count/nutrition'),
          axios.get('http://localhost:3001/blog/count/blog'),
          getAllUsers(),
        ]);

        setVideoCount(videoResponse.data.count);
        setNutritionCount(nutritionResponse.data.count);
        setBlogCount(blogResponse.data.count);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error('Error fetching counts and users:', error);
      }
    };

    fetchCounts();
  }, []);

  useEffect(() => {
    const fetchBMIStats = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No auth token found');
        }

        const response = await axios.get('http://localhost:3001/userdetails/bmi/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { healthy, obese, underweight } = response.data;

        setBmiData({
          labels: ['Healthy', 'Obese', 'Underweight'],
          datasets: [
            {
              label: 'BMI Categories',
              data: [healthy, obese, underweight],
              backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
              hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching BMI stats:', error);
      }
    };

    fetchBMIStats();
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

  const openModal = (user = { username: '', email: '', role: '' }, isEdit = false) => {
    setCurrentUser(user);
    setIsEditing(isEdit);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentUser({ username: '', email: '', role: '' });
    setUserIdToEdit(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateUser(userIdToEdit, currentUser);
      } else {
        await createUser(currentUser);
      }
      const usersResponse = await getAllUsers();
      setUsers(usersResponse.data);
      closeModal();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      const usersResponse = await getAllUsers();
      setUsers(usersResponse.data);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditUser = (user) => {
    setUserIdToEdit(user.id);
    openModal(user, true);
  };

  const bmiOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
        <div className="bg-white p-4 rounded-lg shadow h-96">
          <h3 className="text-xl font-bold mb-4">BMI Categories</h3>
          <Doughnut data={bmiData} options={bmiOptions} />
          <div className="mt-4">
            <ul>
              {bmiData.labels.map((label, index) => (
                <li key={index}>
                  {label}: {bmiData.datasets[0].data[index]} (
                  {Math.round(
                    (bmiData.datasets[0].data[index] /
                      bmiData.datasets[0].data.reduce((a, b) => a + b, 0)) *
                      100
                  )}
                  %)
                </li>
              ))}
            </ul>
          </div>
        </div>
        <VideoChart />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Users</h2>
        <button
          className="bg-green-500 text-white p-2 rounded mb-4"
          onClick={() => openModal()}
        >
          Add New User
        </button>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Role</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id || user.userid}>
                <td className="py-2 px-4 border">{user.userid}</td>
                <td className="py-2 px-4 border">{user.username}</td>
                <td className="py-2 px-4 border">{user.email}</td>
                <td className="py-2 px-4 border">{user.role}</td>
                <td className="py-2 px-4 border">
                  <button
                    className="bg-blue-500 text-white p-2 rounded mr-2"
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded"
                    onClick={() => handleDeleteUser(user.id || user.userid)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="User Modal">
        <h2>{isEditing ? 'Edit User' : 'Add New User'}</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>
              Name:
              <input
                type="text"
                name="username"
                value={currentUser.username}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={currentUser.email}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Role:
              <input
                type="text"
                name="role"
                value={currentUser.role}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <button type="submit" className="bg-green-500 text-white p-2 rounded">
            {isEditing ? 'Update User' : 'Add User'}
          </button>
          <button type="button" className="bg-gray-500 text-white p-2 rounded ml-2" onClick={closeModal}>
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Adminpage;
