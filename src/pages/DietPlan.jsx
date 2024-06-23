import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    navigate(`/nutrition/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/nutrition/edit/${id}`);
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
      <div className="bg-blue-500 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Plan Your Diet Plan This Week</h1>
        <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
      </div>
      <div className="flex-1 p-6">
        <div className="flex flex-col md:flex-row mb-6">
          <div className="md:w-2/3">
            <form onSubmit={handleSearchSubmit} className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search nutrients..."
                className="w-full p-2 border rounded mb-2"
              />
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Search</button>
            </form>
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {nutritionList.map((nutrition) => (
                    <tr key={nutrition.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                      {nutrition.image && (
                          <img
                            src={nutrition.image}
                            alt={nutrition.name}
                            className="h-10 w-10 rounded-full"
                          />
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => handleViewDetails(nutrition.id)}>
                        {nutrition.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{nutrition.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{nutrition.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleEdit(nutrition.id)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleRemove(nutrition.id)}
                          className="ml-4 text-red-600 hover:text-red-900"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                onClick={() => navigate('/nutrition/add')}
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
