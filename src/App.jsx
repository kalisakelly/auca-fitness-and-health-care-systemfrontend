import { 
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import { SignUp, Login, Otp, Workout, Questions, DietPlan, MySchedule, Biometrics, PostPage, Adminpage, Exercise, BlogDetail } from './pages';
import ProtectedRoute from './components/ProtectedRoute';
import VideoFormPage from './pages/AddVideo'; 
import VideoListPage from './pages/VideoListPage';
import NutritionPage from './pages/NutritionPage';
import UserDetailPage from './pages/UserDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import BlogListPage from './pages/BlogListPage';
import BlogDetailsPage from './pages/BlogDetailsPage';
import AddEditBlogPage from './pages/AddEditBlogPage';
import UserDetailsForm from './pages/UserDetailsForm';
import NutritionDetails from './pages/NutritionDetails';
import AddNutrition from './pages/AddNutrition';
import OverView from './pages/Overview';
import RequestPasswordReset from './pages/Forgotpassword';
import ResetPassword from './pages/ResetPassword';






const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      
      <Route path='SignUp' element={<SignUp />} />
      <Route path='Login' element={<Login />} />
      <Route path='OTP' element={<Otp />} />
      <Route path= "Forgot-password" element={<RequestPasswordReset/>} />
      <Route path='Reset-password' element={<ResetPassword/>}/>
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route path="/blogs" element={<BlogListPage />} />
        <Route path="/blog/:id" element={<BlogDetailsPage />} />
        <Route path="/add-blog" element={<AddEditBlogPage />} />
        <Route path="/edit-blog/:id" element={<AddEditBlogPage />} />
        <Route path='/UserDetailsForm' element={<UserDetailsForm />} />
        <Route path='VideoFormPage' element={<VideoFormPage />} />
        <Route path="/nutrition" element={<NutritionPage />} />
        <Route path="/userdetails/:id?" element={<UserDetailPage />} />
        <Route  path='Workout' element={<Workout />} />
        <Route  path='DietPlan'  element={  <DietPlan /> }  />
        <Route path="/nutrition/add" element={<AddNutrition />} />
        <Route path="/nutrition/:id" element={<NutritionDetails />} />
        <Route   path='Questions' element={ <Questions /> } />
        <Route path='MySchedule'   element={   <MySchedule />} />
        <Route path='Biometrics' element={<Biometrics />} />
        <Route path='PostPage' element={<PostPage />} />
        <Route path='Adminpage' element={  <Adminpage />} />
        <Route path='Exercise' element={  <Exercise />} />
        <Route path="BlogDetail" element={<BlogDetail />} />
        <Route path="UploadVideo" element={<VideoFormPage />} />
         <Route path="Videos" element={<VideoListPage />} />
      </Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
