import { 
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import { SignUp, Login, Otp, Workout, Questions, DietPlan, MySchedule, Biometrics, PostPage, Adminpage, Exercise, BlogDetail, BlogPage } from './pages';
import ProtectedRoute from './components/ProtectedRoute';
import VideoFormPage from './pages/VideoPage'; 
import VideoListPage from './pages/VideoListPage';
import NutritionPage from './pages/NutritionPage';
import UserDetailPage from './pages/UserDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import BlogListPage from './pages/BlogListPage';
import BlogDetailsPage from './pages/BlogDetailsPage';
import AddEditBlogPage from './pages/AddEditBlogPage';
import UserDetailsForm from './pages/UserDetailsForm';





const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      
      <Route path='SignUp' element={<SignUp />} />
      <Route path='Login' element={<Login />} />
      <Route path='OTP' element={<Otp />} />
      <Route path='VideoFormPage' element={<VideoFormPage />} />
      <Route path="/nutrition" element={<NutritionPage />} />
      <Route path="/userdetails/:id?" element={<UserDetailPage />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route path="/blogs" element={<BlogListPage />} />
        <Route path="/blog/:id" element={<BlogDetailsPage />} />
        <Route path="/add-blog" element={<AddEditBlogPage />} />
        <Route path="/edit-blog/:id" element={<AddEditBlogPage />} />
        <Route path='/UserDetailsForm' element={<UserDetailsForm />} />

        {/*<Route 
          path='Workout' 
          element={
            <ProtectedRoute roles={['admin', 'nutritionist', 'user']}>
              <Workout />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='DietPlan' 
          element={
            <ProtectedRoute roles={['admin', 'nutritionist']}>
              <DietPlan />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='Questions' 
          element={
            <ProtectedRoute roles={['admin', 'user']}>
              <Questions />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='MySchedule' 
          element={
            <ProtectedRoute roles={['user']}>
              <MySchedule />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='Biometrics' 
          element={
            <ProtectedRoute roles={['admin', 'nutritionist', 'user']}>
              <Biometrics />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='PostPage' 
          element={
            <ProtectedRoute roles={['admin', 'user']}>
              <PostPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='Adminpage' 
          element={
            <ProtectedRoute roles={['admin']}>
              <Adminpage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='Exercise' 
          element={
            <ProtectedRoute roles={['admin', 'nutritionist', 'user']}>
              <Exercise />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='BlogDetail' 
          element={
            <ProtectedRoute roles={['admin', 'nutritionist', 'user']}>
              <BlogDetail />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='BlogPage' 
          element={
            <ProtectedRoute roles={['admin', 'nutritionist', 'user']}>
              <BlogPage />
            </ProtectedRoute>
          } 
        />
        {/* <Route 
          path='UploadVideo' 
          element={
            <ProtectedRoute roles={['admin', 'nutritionist']}>
              <VideoFormPage />
            </ProtectedRoute>
          } 
        /> 
        <Route 
          path='Videos' 
          element={
            <ProtectedRoute roles={['admin', 'nutritionist', 'user']}>
              <VideoListPage />
            </ProtectedRoute>
          } 
        />*/}


        <Route 
          path='Workout' 
          element={<Workout />} />
        <Route 
          path='DietPlan' 
          element={
            
              <DietPlan />

          } 
        />
        <Route 
          path='Questions' 
          element={
            
              <Questions />
            
          } 
        />
        <Route 
          path='MySchedule' 
          element={
            
              <MySchedule />
            
          } 
        />
        <Route 
          path='Biometrics' 
          element={
            
              <Biometrics />
            
          } 
        />
        <Route 
          path='PostPage' 
          element={
            
              <PostPage />
            
          } 
        />
        <Route 
          path='Adminpage' 
          element={
            
              <Adminpage />
            
          } 
        />
        <Route 
          path='Exercise' 
          element={
            
              <Exercise />
            
          } 
        />
        <Route 
          path='BlogDetail' 
          element={
            
              <BlogDetail />
            
          } 
        />
        <Route 
          path='BlogPage' 
          element={
            
              <BlogPage />
            
          } 
        />
        <Route 
          path='UploadVideo' 
          element={
           
              <VideoFormPage />
            
          } 
        />
        <Route 
          path='Videos' 
          element={
            
              <VideoListPage />
            
          } 
        />


      </Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
