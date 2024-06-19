import React from 'react'

const DietPlan = () => {
  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <div className="bg-blue-500 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Plan Your Diet Plan This Week</h1>
        <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
      </div>
      <div className="flex-1 flex flex-col md:flex-row">
        <div className="md:w-1/3 p-6">
          <h2 className="text-lg font-bold mb-4">Week Plan</h2>
          <ul className="space-y-2">
            {/* List of days */}
            <li className="flex items-center">
              <span className="text-gray-600 font-semibold mr-2">Monday</span>
              <span className="text-gray-500">Pizza | Break Fast</span>
              <span className="ml-auto text-gray-400">08:00 AM</span>
            </li>
            {/* Add more days */}
          </ul>
        </div>
        <div className="md:w-2/3 p-6">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Food</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meal</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calories</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priorities</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carbs</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* Render food items */}
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              {/* Food icon */}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">Meat</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">Break Fast</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Receiving</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">08:00 AM</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">20 gm</td>
                      </tr>
                      {/* Add more food items */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md">Add new</button>
        </div>
      </div>
    </div>
  )
}

export default DietPlan