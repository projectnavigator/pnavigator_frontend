import { lazy } from "react";

const AdminNav = lazy(() => import("./AdminNav"));
const Sidebar = lazy(() => import("./Sidebar"));
const Navbar = lazy(() => import("./Navbar"));
const FormRow = lazy(() => import("./FormRow"));
const FormRowSelect = lazy(() => import("./FormRowSelect"));
const UserContainer = lazy(() => import("./UserContainer"));
const ProjectContainer = lazy(() => import("./ProjectContainer"));
const AreaChart = lazy(() => import("./AreaChart"));
const BarChart = lazy(() => import("./BarChart"));
const ChartsContainer = lazy(() => import("./ChartsContainer"));
const PieChart = lazy(() => import("./PieChart"));
const CompletionStatusContainer = lazy(() =>
  import("./CompletionStatusContainer")
);
const StatusStatsContainer = lazy(() => import("./StatusStatsContainer"));
// export {default as PMProjectContainer} from './PMProjectContainer';
const TaskContainer = lazy(() => import("./TaskContainer"));

export {
  AdminNav,
  Sidebar,
  Navbar,
  FormRow,
  FormRowSelect,
  UserContainer,
  ProjectContainer,
  AreaChart,
  BarChart,
  ChartsContainer,
  PieChart,
  CompletionStatusContainer,
  StatusStatsContainer,
  TaskContainer,
};
