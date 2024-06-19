import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SchedulePage = () => {
  const [schedules, setSchedules] = useState([]);
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get('http://localhost:3001/schedules');
      setSchedules(response.data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const schedule = { date, hour: parseInt(hour), minute: parseInt(minute) };
    try {
      if (editingId) {
        await axios.put(`http://localhost:3001/schedules/${editingId}`, schedule);
      } else {
        await axios.post('http://localhost:3001/schedules', schedule);
      }
      fetchSchedules();
      resetForm();
    } catch (error) {
      console.error('Error saving schedule:', error);
    }
  };

  const handleEdit = (schedule) => {
    setDate(schedule.date);
    setHour(schedule.hour.toString());
    setMinute(schedule.minute.toString());
    setEditingId(schedule.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/schedules/${id}`);
      fetchSchedules();
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  const resetForm = () => {
    setDate('');
    setHour('');
    setMinute('');
    setEditingId(null);
  };

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold mb-6">Schedule</h2>
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
        </div>
        <div className="flex justify-end space-x-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {editingId ? 'Update Schedule' : 'Add Schedule'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          )}
        </div>
      </form>
      <div>
        {schedules.map((schedule) => (
          <div key={schedule.id} className="bg-white p-6 rounded shadow-md mb-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-lg">{schedule.date}</p>
                <p className="text-gray-700">{`${schedule.hour.toString().padStart(2, '0')}:${schedule.minute.toString().padStart(2, '0')}`}</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(schedule)} className="bg-yellow-500 text-white px-4 py-2 rounded">
                  Edit
                </button>
                <button onClick={() => handleDelete(schedule.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchedulePage;
