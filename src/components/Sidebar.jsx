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
    // <Card className="h-full p-4 shadow-xl shadow-blue-gray-900/5 fixed">
    //   <div className="flex space-x-4 mx-auto w-1/2 items-center">
    //     <Typography variant="h5" color="blue-gray" className="hidden sm:inline">
    //       FITNESS 
    //     </Typography>
    //     <FontAwesomeIcon icon={faDumbbell} className="h-10 w-10" />
    //   </div>
    //   <List>
    //     <ListItem>
    //       <ListItemPrefix>
    //         <Squares2X2Icon className="h-5 w-5" />
    //       </ListItemPrefix>
    //       <Link to="/" className="hidden sm:inline">Overview</Link>
    //     </ListItem>
        
    //       <ListItem>
    //         <ListItemPrefix>
    //           <FontAwesomeIcon icon={faDumbbell} className="h-5 w-5" />
    //         </ListItemPrefix>
    //         <Link to="/Workout" className="hidden sm:inline">Workout</Link>
    //       </ListItem>

    //       {/* <nav className="flex-1 overflow-auto py-4">
    //         <div className="grid gap-2 px-4">
    //           <Link
    //             href="#"
    //             className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
    //             prefetch={false}
    //           >
    //             <Squares2X2Icon className="h-5 w-5" />
    //             <span className="hidden sm:inline">Overview</span>
    //           </Link>
    //         </div>
    //       </nav> */}
        
    //       <ListItem>
    //         <ListItemPrefix>
    //           <AdjustmentsHorizontalIcon className="h-5 w-5" />
    //         </ListItemPrefix>
    //         <Link to="/DietPlan" className="hidden sm:inline">Diet Plan</Link>
    //       </ListItem>
        
        
    //       <ListItem>
    //         <ListItemPrefix>
    //           <QuestionMarkCircleIcon className="h-5 w-5" />
    //         </ListItemPrefix>
    //         <Link to="/Questions" className="hidden sm:inline">Questions</Link>
    //       </ListItem>
        
        
    //       <ListItem>
    //         <ListItemPrefix>
    //           <CalendarDaysIcon className="h-5 w-5" />
    //         </ListItemPrefix>
    //         <Link to="/MySchedule" className="hidden sm:inline">Schedule</Link>
    //       </ListItem>
        
        
    //       <ListItem>
    //         <ListItemPrefix>
    //           <BarChartIcon className="h-5 w-5" />
    //         </ListItemPrefix>
    //         <Link to="/Biometrics" className="hidden sm:inline">Biometrics</Link>
    //       </ListItem>
        
        
    //       <ListItem>
    //         <ListItemPrefix>
    //           <QuestionMarkCircleIcon className="h-5 w-5" />
    //         </ListItemPrefix>
    //         <Link to="/PostPage" className="hidden sm:inline">Post Page</Link>
    //       </ListItem>
        
        
    //       <ListItem>
    //         <ListItemPrefix>
    //           <Cog6ToothIcon className="h-5 w-5" />
    //         </ListItemPrefix>
    //         <Link to="/Adminpage" className="hidden sm:inline">Admin Page</Link>
    //       </ListItem>
        
        
    //       <ListItem>
    //         <ListItemPrefix>
    //           <FontAwesomeIcon icon={faDumbbell} className="h-5 w-5" />
    //         </ListItemPrefix>
    //         <Link to="/Exercise" className="hidden sm:inline">Exercise</Link>
    //       </ListItem>
        
    //     {/* <div className="border-t px-4 py-4">
    //       <ListItem>
    //         <ListItemPrefix>
    //           <Cog6ToothIcon className="h-5 w-5" />
    //         </ListItemPrefix>
    //         Settings
    //       </ListItem>
    //       <ListItem onClick={handleLogout}>
    //         <ListItemPrefix >
    //           <PowerIcon className="h-5 w-5" />
    //         </ListItemPrefix>
    //         Log Out
    //       </ListItem>
    //     </div> */}
    //   </List>
    // </Card>

    <div className="flex h-full min-h-screen flex-col border-r bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex h-[60px] items-center justify-between border-b px-4 dark:border-gray-800">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-50"
          prefetch={false}
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
            prefetch={false}
          >
            <HomeIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Overview</span>
          </Link>
          <Link
            to="/Workout"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
            prefetch={false}
          >
            <DumbbellIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Workout</span>
          </Link>
          <Link
            to="/DietPlan"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
            prefetch={false}
          >
            <SaladIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Diet Plan</span>
          </Link>
          <Link
            to="/BlogPage"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
            prefetch={false}
          >
            <BugIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Blogs</span>
          </Link>
          <Link
            to="/MySchedule"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
            prefetch={false}
          >
            <CalendarIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Schedule</span>
          </Link>
          <Link
            to="/Biometrics"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
            prefetch={false}
          >
            <BarChartIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Biometrics</span>
          </Link>
          <Link
            to="/PostPage"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
            prefetch={false}
          >
            <FilePenIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Post Page</span>
          </Link>
          <Link
            to="/Adminpage"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
            prefetch={false}
          >
            <UsersIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Admin Page</span>
          </Link>
          <Link
            to="/Exercise"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
            prefetch={false}
          >
            <DumbbellIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Exercises</span>
          </Link>
        </div>
      </nav>
      <div className="border-t px-4 py-4 dark:border-gray-800">
        <Link
          href="#"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
          prefetch={false}
        >
          <LogOutIcon className="h-5 w-5" />
          <span className="hidden sm:inline">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
