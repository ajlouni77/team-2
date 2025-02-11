import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  Profile,
  Task,
  TaskDetails,
  Dashboard,
  Articles,
  Contact,
  About,
  Notfound,
  Eisenhower,
  Rule,
  Quiz,
  Kanban,
  Pomodoro,
  Productivity,
} from "./components/exports";
function App() {
  const router = createBrowserRouter([
    {
      path: "/", // 1
      element: <Home />,
      errorElement: <Notfound />,
    },
    {
      path: "/login", // 2
      element: <Login />,
    },
    {
      path: "/register", // 3
      element: <Register />,
    },
    {
      path: "/profile", // 4
      element: <Profile />,
    },
    {
      path: "/About", // 5
      element: <About />,
    },
    {
      path: "/task", // 6
      element: <Task />,
    },
    {
      path: "/taskdetails", // 7
      element: <TaskDetails />,
    },
    {
      path: "/dashboard", // 8
      element: <Dashboard />,
    },
    {
      path: "/articles", // 9
      element: <Articles />,
    },
    {
      path: "/contact", // 10
      element: <Contact />,
    },
    {
      path: "/about", // 11
      element: <About />,
    },
    {
      path: "/Eisenhower", // 11
      element: <Eisenhower />,
    },

    {
      path: "/Rule", // 11
      element: <Rule />,
    },

    {
      path: "/Quiz", // 11
      element: <Quiz />,
    },

    {
      path: "/Kanban", // 11
      element: <Kanban />,
    },

    {
      path: "/Pomodoro", // 11
      element: <Pomodoro />,
    },

    {
      path: "/Productivity", // 11
      element: <Productivity />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
