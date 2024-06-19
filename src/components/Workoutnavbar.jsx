
const Navbar = () => {
  return (
    <nav className="mb-6">
      <ul className="flex flex-wrap gap-4">
        <li className="bg-gray-200 rounded p-2 cursor-pointer">Workout at</li>
        <li className="bg-gray-200 rounded p-2 cursor-pointer">Intensity</li>
        <li className="bg-gray-200 rounded p-2 cursor-pointer">Videos</li>
        <li className="bg-gray-200 rounded p-2 cursor-pointer">Calories</li>
      </ul>
    </nav>
  );
};

export default Navbar;
