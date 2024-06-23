import { Link, useNavigate } from 'react-router-dom';
import { DumbbellIcon, HomeIcon, SaladIcon, BugIcon, CalendarIcon, BarChartIcon, UsersIcon, LogOutIcon,FilePenIcon } from '../assets/icons';

const Sidebar = () => {
  const userRole = localStorage.getItem('userRole');
  const isAuthenticated = !!localStorage.getItem('userToken');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    navigate('/Login');
  };

  return (
    <div className="flex h-full min-h-screen flex-col border-r bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex h-[60px] items-center justify-between border-b px-4 dark:border-gray-800">
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-50"
        >
          <DumbbellIcon className="h-6 w-6" />
          <span className="hidden sm:inline">Fitness App</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-auto py-4">
        <div className="grid gap-2 px-4">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
          >
            <HomeIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Overview</span>
          </Link>
          {/* {isAuthenticated && (
            <>
              <Link
                to="/Workout"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
              >
                <DumbbellIcon className="h-5 w-5" />
                <span className="hidden sm:inline">Workout</span>
              </Link>
            </>
          )} */}
          <Link
            to="/DietPlan"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
          >
            <SaladIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Diet Plan</span>
          </Link>
          <Link
            to="/Blogs"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
          >
            <BugIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Blogs</span>
          </Link>
          <Link
            to="/Workout"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
          >
            <DumbbellIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Videos</span>
          </Link>
          {isAuthenticated && (
            <>
              <Link
                to="/MySchedule"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
              >
                <CalendarIcon className="h-5 w-5" />
                <span className="hidden sm:inline">Schedule</span>
              </Link>
              <Link
                to="/Biometrics"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
              >
                <BarChartIcon className="h-5 w-5" />
                <span className="hidden sm:inline">Biometrics</span>
              </Link>
              {userRole === 'admin' && (
                <Link
                  to="/Adminpage"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                >
                  <UsersIcon className="h-5 w-5" />
                  <span className="hidden sm:inline">Admin Page</span>
                </Link>
              )}
            </>
          )}
        </div>
      </nav>
      {isAuthenticated && (
        <div className="border-t px-4 py-4 dark:border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
          >
            <LogOutIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
