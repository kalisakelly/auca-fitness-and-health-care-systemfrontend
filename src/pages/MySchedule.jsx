import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const SchedulePage = () => {
  const [schedules, setSchedules] = useState([]);
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [details, setDetails] = useState('');
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMySchedules();
  }, []);

  const fetchMySchedules = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        const response = await axios.get(`http://localhost:3001/schedules`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSchedules(response.data);
      }
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to be logged in to add or edit schedules.');
      navigate('/login');
      return;
    }
    const schedule = { date, hour: parseInt(hour), minute: parseInt(minute), details };
    try {
      if (editingId) {
        await axios.put(`http://localhost:3001/schedules/${editingId}`, schedule, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        await axios.post('http://localhost:3001/schedules', schedule, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      fetchMySchedules();
      resetForm();
    } catch (error) {
      console.error('Error saving schedule:', error);
    }
  };

  const handleEdit = (schedule) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to be logged in to edit schedules.');
      navigate('/login');
      return;
    }
    setDate(schedule.date);
    setHour(schedule.hour.toString());
    setMinute(schedule.minute.toString());
    setDetails(schedule.details);
    setEditingId(schedule.id);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to be logged in to delete schedules.');
      navigate('/login');
      return;
    }
    try {
      await axios.delete(`http://localhost:3001/schedules/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchMySchedules();
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  const resetForm = () => {
    setDate('');
    setHour('');
    setMinute('');
    setDetails('');
    setEditingId(null);
  };

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-3xl font-bold mb-6 text-center">My Schedule</h2>
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="number"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Hour"
            min="0"
            max="23"
            required
          />
          <input
            type="number"
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Minute"
            min="0"
            max="59"
            required
          />
          <input
            type="text"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Details"
            required
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
            {editingId ? 'Update Schedule' : 'Add Schedule'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200">
              Cancel
            </button>
          )}
        </div>
      </form>
      <div>
        {schedules.length === 0 ? (
          <div className="text-center text-gray-600 py-10">
            <p className="text-xl font-semibold">No schedule yet created</p>
            <p className="text-gray-500 mt-2">Please add a new schedule to get started.</p>
          </div>
        ) : (
          schedules.map((schedule) => (
            <div key={schedule.id} className="bg-white p-6 rounded shadow-md mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg">{schedule.date}</p>
                  <p className="text-gray-700">{`${schedule.hour.toString().padStart(2, '0')}:${schedule.minute.toString().padStart(2, '0')}`}</p>
                  <p className="text-gray-700">{schedule.details}</p>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => handleEdit(schedule)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-200">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(schedule.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SchedulePage;
