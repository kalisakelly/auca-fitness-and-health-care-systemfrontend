import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HeaderBlock from '../components/Headerblock';
import workoutImage from '../assets/workout.jpg';

const DietPlan = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [nutritionList, setNutritionList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [limit] = useState(4);
  const [sort, setSort] = useState('desc');
  const navigate = useNavigate();

  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    fetchNutritionList();
  }, [page, searchQuery, sort]);

  const fetchNutritionList = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/nutrition`, {
        params: { page, search: searchQuery, limit, sort },
      });
      setNutritionList(response.data.data);
      setTotalItems(response.data.count);
    } catch (error) {
      console.error('Error fetching nutrition list:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchNutritionList();
  };

  const handleViewDetails = (id) => {
    navigate(`/home/nutrition/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/home/nutrition/edit/${id}`);
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/nutrition/${id}`);
      fetchNutritionList(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error removing nutrition item:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(totalItems / limit);

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
       <HeaderBlock
                title="Fitness and Health Care System"
                description={`Set his rule is land midst likeness they're replenish that have creepeth our is sea. Dominion
                    fly dry darkness it likeness two greater fill, god. Hath signs god. Under green fruitful meat 
                    night second saw god us. It bring third may moving, winged. Multiply that fifth forth creepeth open upon.
                    Seasons without is upon own image creature living sea. One whales were. Let void of divided. Whales herb don't all.
                    For brought yielding. Set tree together kind him after be subdue image creature midst night one stars fruitful moved.
                    From you also itself creature midst fifth him, of image his.`}
                image={workoutImage}
            />
      <div className="flex-1 p-6">
        <div className="flex flex-col md:flex-row mb-6">
          <div className="md:w-2/3">
            <form onSubmit={handleSearchSubmit} className="mb-4 flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search nutrients..."
                className="w-full p-2 border rounded mb-2 md:mb-0"
              />
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Search</button>
            </form>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {nutritionList.map((nutrition) => (
                <div key={nutrition.id} className="bg-white p-4 rounded-lg shadow-lg">
                  {nutrition.image && (
                    <img
                      src={nutrition.image}
                      alt={nutrition.name}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                  )}
                  <div className="p-4">
                    <h2 className="text-lg font-bold mb-2 cursor-pointer" onClick={() => handleViewDetails(nutrition.id)}>
                      {nutrition.name}
                    </h2>
                    <p className="text-gray-700 mb-2">{nutrition.description}</p>
                    <p className="text-gray-500 mb-4">{nutrition.category}</p>
                    {(userRole === 'admin' || userRole === 'nutritionist') && (
                      <div className="flex justify-between">
                        <button
                          onClick={() => handleEdit(nutrition.id)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleRemove(nutrition.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <span>Page {page} of {totalPages}</span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
            {(userRole === 'admin' || userRole === 'nutritionist') && (
              <button
                onClick={() => navigate('/home/nutrition/add')}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Add New Nutrient
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietPlan;
