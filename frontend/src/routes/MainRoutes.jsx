import { lazy } from 'react';
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const ForgetPassword = lazy(() => import('../pages/ForgetPassword'));
const ChangePassword = lazy(() => import('../pages/ChangePassword'));
const Developer = lazy(() => import('../components/developer/Developer'));
const Client = lazy(() => import('../components/client/Client'));
const Tester = lazy(() => import('../components/tester/Tester'));
const Admin = lazy(() => import('../components/admin/Admin'));
const Designer = lazy(() => import('../components/designer/Designer'));
const UpdateProfile = lazy(() => import('../pages/UpdateProfile'));


const MainRoutes = [
  { path: '/', Component: Home },
  { path: '/login', Component: Login },
  { path: '/register', Component: Register },
  { path: '/forget-password', Component: ForgetPassword },
  { path: '/reset-password/:id/:token', Component: ChangePassword },
  { path: '/developer', Component: Developer, protected: true },
  { path: '/client', Component: Client, protected: true },
  { path: '/tester', Component: Tester, protected: true },
  { path: '/admin', Component: Admin, protected: true },
  { path: '/designer', Component: Designer, protected: true },
  { path: '/update-profile', Component: UpdateProfile, protected: true },

];

export default MainRoutes;
