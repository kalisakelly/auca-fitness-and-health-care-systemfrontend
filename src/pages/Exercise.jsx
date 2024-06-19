import Navbar from '../components/Workoutnavbar';
import Achievements from '../components/Achievements';
import Exercises from '../components/Exercises';

const Exercise = () => {
  return (
    <div className="container mx-auto p-4">
      <header className="bg-blue-600 text-white p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-2xl font-bold">Start Your Workout From Today</h1>
        <p>Unlock a better you with our personalized programs. Track your progress, achieve your goals, and stay motivated.</p>
      </header>
      <Navbar />
      <Achievements />
      <Exercises />
    </div>
  );
};

export default Exercise;
