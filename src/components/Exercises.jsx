
const exercises = [
  { title: 'Treadmill', img: 'treadmill.jpg', calories: 250, duration: '58:24' },
  { title: 'Stretching', img: 'stretching.jpg', calories: 210, duration: '58:24' },
  { title: 'Yoga', img: 'yoga.jpg', calories: 250, duration: '58:24' },
  { title: 'Cycling', img: 'cycling.jpg', calories: 200, duration: '58:24' },
  { title: 'Boxing', img: 'boxing.jpg', calories: 240, duration: '58:24' },
  { title: 'Strength Training', img: 'strength_training.jpg', calories: 260, duration: '58:24' },
];

const Exercises = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Popular Exercises</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exercises.map((exercise, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={`/images/${exercise.img}`} alt={exercise.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-bold">{exercise.title}</h3>
              <p className="text-sm text-gray-600">{exercise.calories} est calories</p>
              <p className="text-sm text-gray-600">{exercise.duration}</p>
              <div className="flex justify-center mt-2">
                <button className="bg-red-500 text-white p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-5.197-3.026a1 1 0 00-1.5.866v6.024a1 1 0 001.5.866l5.197-3.026a1 1 0 000-1.732z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exercises;
