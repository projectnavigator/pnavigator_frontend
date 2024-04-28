import { Suspense, Lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  LandingPage,
  LoginPage,
  RegisterPage,
  AdminPage,
  ErrorPage,
  StatusPage,
  ProfilePage,
  DashboardPage,
  addTaskPage,
  addProjectPage,
  allProjectPage,
  allTaskPage,
  UpdateProjectPage,
  UpdateTaskPage,
  // PMHome,
  Home,
  ProgressReport,
  Database,
  Dash,
} from "./pages";
import { action as registerAction } from "./pages/RegisterPage";
import { action1 as addUserAction } from "./pages/Database";
import { action as loginAction, loader as getAuth } from "./pages/LoginPage";
import { action as deleteUserAction } from "./pages/deleteUser";
import { action as deleteProjectAction } from "./pages/deleteProjectPage";
import { action as updateProjectStatusAction } from "./pages/updateProjectStatusPage";
import { loader as dashboardLoader } from "./pages/DashboardPage";
import { loader as databaseLoader } from "./pages/Database";
import { loader as homeLoader } from "./pages/Home";
import { loader as statsLoader } from "./pages/ProgressReport";
import { action as addProject } from "./pages/Home";
import { loader as taskLoader } from "./pages/Dash";
import { action as addTask } from "./pages/Dash";
// import { loader as pmhomeLoader } from "./pages/PMHome";
// import { action as addPMProject } from "./pages/PMHome";
import { action as deleteTaskPage } from "./pages/deleteTaskPage";
import { loader as UpdateProjectPageLoader } from "./pages/updateProjectPage";
import { action as updateProjectPageAction } from "./pages/updateProjectPage";
import { loader as updateTaskPageLoader } from "./pages/UpdateTaskPage";
import { action as updateTaskPageAction } from "./pages/UpdateTaskPage";
import Loading from "./components/Loading";

const Router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <Suspense fallback={<Loading />}>
          <HomeLayout />
        </Suspense>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Loading />}>
              <LoginPage />
            </Suspense>
          ),
          loader: getAuth,
          action: loginAction,
        },
        {
          path: "register",
          element: (
            <Suspense fallback={<Loading />}>
              <RegisterPage />
            </Suspense>
          ),
          action: registerAction,
        },
        {
          path: "dashboard",
          element: (
            <Suspense fallback={<Loading />}>
              <DashboardPage />
            </Suspense>
          ),
          loader: dashboardLoader,
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={<Loading />}>
                  <Dash />
                </Suspense>
              ),
              loader: taskLoader,
              action: addTask,
            },
            {
              path: "dash",
              element: (
                <Suspense fallback={<Loading />}>
                  <Home />
                </Suspense>
              ),
              loader: homeLoader,
              action: addProject,
            },
            {
              path: "progress-report",
              element: (
                <Suspense fallback={<Loading />}>
                  <ProgressReport />
                </Suspense>
              ),
              loader: statsLoader,
            },
            {
              path: "database",
              element: (
                <Suspense fallback={<Loading />}>
                  <Database />
                </Suspense>
              ),
              action: addUserAction,
              loader: databaseLoader,
            },
            { path: "delete-user/:id", action: deleteUserAction },
            { path: "delete-project/:id", action: deleteProjectAction },
            { path: "project-status/:id", action: updateProjectStatusAction },
            { path: "delete-task/:id", action: deleteTaskPage },
            {
              path: "update-project/:id",
              element: (
                <Suspense fallback={<Loading />}>
                  <UpdateProjectPage />
                </Suspense>
              ),
              loader: UpdateProjectPageLoader,
              action: updateProjectPageAction,
            },
            {
              path: "update-task/:id",
              element: (
                <Suspense fallback={<Loading />}>
                  <UpdateTaskPage />
                </Suspense>
              ),
              loader: updateTaskPageLoader,
              action: updateTaskPageAction,
            },
            // {
            //   path: "pmhome",
            //   element: <PMHome />,
            //   loader: pmhomeLoader,
            //   action: addPMProject,
            // },
          ],
        },
      ],
    },

    // {
    //   path: "/about",
    //   element: <LandingPage />,
    // },
    // {
    //   path: "/about",
    //   element: <LandingPage />,
    // },
    // {
    //   path: "/about",
    //   element: <LandingPage />,
    // },
    // {
    //   path: "/about",
    //   element: <LandingPage />,
    // },
    // {
    //   path: "/about",
    //   element: <LandingPage />,
    // },
    // {
    //   path: "/about",
    //   element: <LandingPage />,
    // },
  ],
  {
    basename: "/",
  }
);

const App = () => {
  return <RouterProvider router={Router} />;
};

export default App;
