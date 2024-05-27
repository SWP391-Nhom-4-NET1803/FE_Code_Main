import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage'; // Import the HomePage component
import BookingPage from '../pages/Booking/BookingPage'; // Import the BookingPage component
import AdminPage from '../pages/Admin/AdminPage';
import AdminUserPage from '../pages/Admin/AdminUser/AdminUserPage';
import AdminClinic from '../pages/Admin/AdminClinic/AdminClinic';
import ClinicRegisterForm from '../pages/ClinicRegister/ClinicRegister';
import UserProfile from '../pages/UserProfile/UserProfile';
import ClinicOwnerPage from '../pages/ClinicOwnerPage/ClinicOwnerPage';
import LoginPage from '../pages/Login/LoginPage';
import UserAccount from '../pages/UserAccount/UserAccount';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/booking', element: <BookingPage /> },
  { path: '/detail/:id', element: <div>Detail</div> },
  { path: '/admin', element: < AdminPage /> },
  { path: '/admin/users', element: <AdminUserPage /> },
  { path: '/admin/clinic', element: <AdminClinic /> },
  { path: '/for-owner', element: <ClinicRegisterForm /> },
  { path: "/owner", element: <ClinicOwnerPage /> },
  { path: "/profile", element: <UserProfile /> },
  { path: "/account", element: <UserAccount /> }, // DEVELOPMENT!!!
  { path: "/login", element: <LoginPage /> },

]);

export default router;
