import { Link, useNavigate } from 'react-router-dom';
import { 
  DumbbellIcon, 
  HomeIcon, 
  SaladIcon, 
  BugIcon, 
  CalendarIcon, 
  BarChartIcon, 
  UsersIcon, 
  LogOutIcon, 
  FilePenIcon 
} from '../assets/icons';

const userLinks = [
  { to: "/", icon: HomeIcon, label: "Overview" },
  { to: "/DietPlan", icon: SaladIcon, label: "Diet Plan" },
  { to: "/Blogs", icon: BugIcon, label: "Blogs" },
  { to: "/Workout", icon: DumbbellIcon, label: "Videos" },
  { to: "/MySchedule", icon: CalendarIcon, label: "Schedule" },
  { to: "/Biometrics", icon: BarChartIcon, label: "Biometrics" }
];

const nutritionistLinks = [
  { to: "/", icon: HomeIcon, label: "Overview" },
  { to: "/DietPlan", icon: SaladIcon, label: "Diet Plan" },
  { to: "/Blogs", icon: BugIcon, label: "Blogs" },
  { to: "/Workout", icon: DumbbellIcon, label: "Videos" },
  { to: "/MySchedule", icon: CalendarIcon, label: "Schedule" },
  { to: "/Biometrics", icon: BarChartIcon, label: "Biometrics" },
  { to: "/UserDetail", icon: FilePenIcon, label: "User Details" }
];

const adminLinks = [
  { to: "/", icon: HomeIcon, label: "Overview" },
  { to: "/DietPlan", icon: SaladIcon, label: "Diet Plan" },
  { to: "/Blogs", icon: BugIcon, label: "Blogs" },
  { to: "/Workout", icon: DumbbellIcon, label: "Videos" },
  { to: "/MySchedule", icon: CalendarIcon, label: "Schedule" },
  { to: "/Biometrics", icon: BarChartIcon, label: "Biometrics" },
  { to: "/Adminpage", icon: UsersIcon, label: "Admin Page" }
];

const Sidebar = () => {
  const userRole = localStorage.getItem('userRole');
  const isAuthenticated = !!localStorage.getItem('userToken');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    navigate('/Login');
  };

  const getLinks = () => {
    if (userRole === 'admin') return adminLinks;
    if (userRole === 'nutritionist') return nutritionistLinks;
    return userLinks;
  };

  const links = getLinks();

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
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
            >
              <link.icon className="h-5 w-5" />
              <span className="hidden sm:inline">{link.label}</span>
            </Link>
          ))}
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
