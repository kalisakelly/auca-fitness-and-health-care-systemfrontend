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
      
      <Route path='/SignUp' element={<SignUp />} />
      <Route path='/' element={<Login />} />
      <Route path='/OTP' element={<Otp />} />
      <Route path= "/Forgot-password" element={<RequestPasswordReset/>} />
      <Route path='/Reset-password' element={<ResetPassword/>}/>
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path='/home' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route path="/home/blogs" element={<BlogListPage />} />
        <Route path="/home/blog/:id" element={<BlogDetailsPage />} />
        <Route path="/home/add-blog" element={<AddEditBlogPage />} />
        <Route path="/home/edit-blog/:id" element={<AddEditBlogPage />} />
        <Route path='/home/UserDetailsForm' element={<UserDetailsForm />} />
        <Route path='/home/VideoFormPage' element={<VideoFormPage />} />
        <Route path="/home/nutrition" element={<NutritionPage />} />
        <Route  path='/home/Workout' element={<Workout />} />
        <Route  path='/home/DietPlan'  element={  <DietPlan /> }  />
        <Route path="/home/nutrition/add" element={<AddNutrition />} />
        <Route path="/home/nutrition/:id" element={<NutritionDetails />} />
        <Route   path='/home/Questions' element={ <Questions /> } />
        <Route path='/home/MySchedule'   element={   <MySchedule />} />
        <Route path='/home/Biometrics' element={<Biometrics />} />
        <Route path='/home/PostPage' element={<PostPage />} />
        <Route path='/home/Adminpage' element={  <Adminpage />} />
        <Route path='/home/Exercise' element={  <Exercise />} />
        <Route path="/home/BlogDetail" element={<BlogDetail />} />
        <Route path="/home/UploadVideo" element={<VideoFormPage />} />
         <Route path="/home/Videos" element={<VideoListPage />} />
      </Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
