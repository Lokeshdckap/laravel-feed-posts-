import {createBrowserRouter, Navigate} from "react-router-dom";
// import Dashboard from "./Dashboard.jsx";
import DefaultLayout from "./src/components/DefaultLayout";
import GuestLayout from "./src/components/GuestLayout";
import Login from "./src/Auth/Login";
// import NotFound from "./views/NotFound";
import Signup from "./src/Auth/Signup";
import Dashboard from "./src/Dashboard";
import NotFound from "./src/NotFound";
// import Users from "./views/Users";
// import UserForm from "./views/UserForm";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/posts"/>
      },
      {
        path: '/posts',
        element: <Dashboard/>
      },
      // {
      //   path: '/users',
      //   element: <Users/>
      // },
      // {
      //   path: '/users/new',
      //   element: <UserForm key="userCreate" />
      // },
      // {
      //   path: '/users/:id',
      //   element: <UserForm key="userUpdate" />
      // }
    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <Signup/>
      }
    ]
  },
  {
    path: "*",
    element: <NotFound/>
  }
])

export default router;