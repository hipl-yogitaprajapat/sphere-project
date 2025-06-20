import { lazy } from 'react';
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const ForgetPassword = lazy(() => import('../pages/ForgetPassword'));
const ChangePassword = lazy(() => import('../pages/ChangePassword'));
const Developer = lazy(() => import('../components/developer/Developer'));
const Tester = lazy(() => import('../components/tester/Tester'));
const Admin = lazy(() => import('../components/admin/Admin'));
const Designer = lazy(() => import('../components/designer/Designer'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const UpdateProfile = lazy(() => import('../pages/UpdateProfile'));
const ViewProfile = lazy(() => import('../pages/ViewProfile'));
const UserForm = lazy(() => import('../components/admin/form/UserForm'));
const CreateProject = lazy(() => import('../components/admin/form/CreateProject'));
const ViewProjects = lazy(() => import('../components/admin/ViewProjects'));
const EditProject = lazy(() => import('../components/admin/form/EditProject'));
const CreateTask = lazy(() => import('../components/admin/form/CreateTask'));
const ViewTask = lazy(() => import('../components/admin/ViewTask'));
const UpdateTask = lazy(() => import('../components/admin/form/UpdateTask'));
const UpdateStatus = lazy(() => import('../components/admin/form/UpdateStatus'));
const Comments = lazy(()=> import("../components/admin/comments"))


const MainRoutes = [
  { path: '/', Component: Home },
  { path: '/login', Component: Login },
  { path: '/register', Component: Register },
  { path: '/forget-password', Component: ForgetPassword },
  { path: '/reset-password/:id/:token', Component: ChangePassword },
  { path: '/developer', Component: Developer, protected: true },
  { path: '/tester', Component: Tester, protected: true },
  { path: '/admin', Component: Admin, protected: true },
  { path: '/designer', Component: Designer, protected: true },
  { path: '/dashboard', Component: Dashboard, protected: true },
  { path: '/update-profile', Component: UpdateProfile, protected: true },
  { path: '/view-profile', Component: ViewProfile, protected: true },
  { path: '/user-form', Component: UserForm, protected: true },
  { path: '/create-project', Component: CreateProject, protected: true },
  { path: '/view-projects', Component: ViewProjects, protected: true },
  { path: '/edit-project/:id', Component: EditProject, protected: true },
  { path: '/create-task', Component: CreateTask, protected: true },
  { path: '/view-task', Component: ViewTask, protected: true },
  { path: '/update-task/:id', Component: UpdateTask, protected: true },
  { path: '/update-status/:id', Component: UpdateStatus, protected: true },
  { path: '/comments/:id', Component: Comments, protected: true },
];

export default MainRoutes;
