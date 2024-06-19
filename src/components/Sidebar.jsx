import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Button,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  QuestionMarkCircleIcon,
  Squares2X2Icon,
  CalendarDaysIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BarChartIcon, 
  BugIcon, 
  CalendarIcon, 
  DumbbellIcon, 
  FilePenIcon, 
  HomeIcon, 
  LogOutIcon, 
  SaladIcon, 
  SettingsIcon, 
  UsersIcon  } from '../assets/icons'

  
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
            prefetch={false ? 'true' : undefined}
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
              prefetch={false ? 'true' : undefined}
            >
              <HomeIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Overview</span>
            </Link>
            <Link
              to="/Workout"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
              prefetch={false ? 'true' : undefined}
            >
              <DumbbellIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Workout</span>
            </Link>
            <Link
              to="/DietPlan"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
              prefetch={false ? 'true' : undefined}
            >
              <SaladIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Diet Plan</span>
            </Link>
            <Link
              to="/BlogPage"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
              prefetch={false ? 'true' : undefined}
            >
              <BugIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Blogs</span>
            </Link>
            <Link
              to="/MySchedule"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
              prefetch={false ? 'true' : undefined}
            >
              <CalendarIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Schedule</span>
            </Link>
            <Link
              to="/Biometrics"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
              prefetch={false ? 'true' : undefined}
            >
              <BarChartIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Biometrics</span>
            </Link>
            <Link
              to="/PostPage"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
              prefetch={false ? 'true' : undefined}
            >
              <FilePenIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Post Page</span>
            </Link>
            <Link
              to="/Adminpage"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
              prefetch={false ? 'true' : undefined}
            >
              <UsersIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Admin Page</span>
            </Link>
            <Link
              to="/Exercise"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
              prefetch={false ? 'true' : undefined}
            >
              <DumbbellIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Exercises</span>
            </Link>
          </div>
        </nav>
        <div className="border-t px-4 py-4 dark:border-gray-800">
          <Link
            to="#"
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
            prefetch={false ? 'true' : undefined}
          >
            <LogOutIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Logout</span>
          </Link>
        </div>
      </div>
    );
  };
  
  export default Sidebar;
  