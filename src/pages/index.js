import { lazy } from "react";

const addActivityPage = lazy(() => import("./addActivityPage"));
const addProjectPage = lazy(() => import("./addProjectPage"));
const addTaskPage = lazy(() => import("./addTaskPage"));
const AdminPage = lazy(() => import("./AdminPage"));
const allProjectPage = lazy(() => import("./allProjectPage"));
const allTaskPage = lazy(() => import("./allTaskPage"));
const HomeLayout = lazy(() => import("./HomeLayout"));
const LandingPage = lazy(() => import("./LandingPage"));
const LoginPage = lazy(() => import("./LoginPage"));
const ProfilePage = lazy(() => import("./ProfilePage"));
const RegisterPage = lazy(() => import("./RegisterPage"));
const StatusPage = lazy(() => import("./StatusPage"));
const UpdateProjectPage = lazy(() => import("./updateProjectPage"));
const UpdateTaskPage = lazy(() => import("./UpdateTaskPage"));
const DashboardPage = lazy(() => import("./DashboardPage"));
const ErrorPage = lazy(() => import("./ErrorPage"));
const Dash = lazy(() => import("./Dash"));
const Home = lazy(() => import("./Home"));
const ProgressReport = lazy(() => import("./ProgressReport"));
const Database = lazy(() => import("./Database"));
const UpdateUserProfile = lazy(()=>import("./updateUserProfile"))
// export {default as PMHome} from './PMHome';

export {
  addActivityPage,
  addProjectPage,
  addTaskPage,
  AdminPage,
  allProjectPage,
  allTaskPage,
  HomeLayout,
  LandingPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  StatusPage,
  UpdateProjectPage,
  UpdateTaskPage,
  UpdateUserProfile,
  DashboardPage,
  ErrorPage,
  Dash,
  Home,
  ProgressReport,
  Database,
};
