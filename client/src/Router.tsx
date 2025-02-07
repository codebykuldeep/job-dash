import { createBrowserRouter } from "react-router-dom";



import RootLayout from './components/Layout/RootLayout';
import AuthPage from './components/Common/AuthPage/AuthPage';
import AdminLayout from './components/Admin/AdminLayout';
import UserLayout from './components/User/UserLayout';
import EmployerLayout from './components/Employer/EmployerLayout';
import { authPageLoader } from './utils/authLoader';
//import Employers from './components/Admin/Employers/Employers';
import AdminHome from './components/Admin/Home/AdminHome';
//import PendingEmps from './components/Admin/Employers/PendingEmps';
import Logout from './components/Common/Logout';
//import AdminAccount from './components/Admin/Account/AdminAccount';
import Home from './components/Common/Home/Home';
//import Posts from './components/Employer/Posts/Posts';
import AddPost from './components/Employer/PostsForm/AddPost';
import PostDetail from './components/Employer/PostsDetails/PostDetail';
//import EmpAccount from './components/Employer/Account/EmpAccount'
import EditPost from './components/Employer/PostsForm/EditPost';
//import JobsPage from './components/User/JobsPage/JobsPage';
//import Applications from './components/User/Applications/Applications';
//import UserAccount from './components/User/Account/UserAccount';
import UserHome from './components/User/Home/UserHome';
import EmpHomeLayout from './components/Employer/Home/EmpHomeLayout';
//import Find from './components/Employer/Find/Find';
import { lazy } from "react";
import NotFound from "./components/Common/NotFound";
import UserMessage from "./components/User/Message/UserMessage";

//USER ROUTES
const Applications = lazy(()=>import('./components/User/Applications/Applications'))
const JobsPage  = lazy(()=>import('./components/User/JobsPage/JobsPage'));
const UserAccount = lazy(()=>import('./components/User/Account/UserAccount'));



//EMPLOYERS ROUTES
const Posts = lazy(()=>import('./components/Employer/Posts/Posts'));
const Find = lazy(()=>import('./components/Employer/Find/Find'));
const EmpAccount = lazy(()=>import('./components/Employer/Account/EmpAccount'));


//ADMIN ROUTES
const Employers = lazy(()=>import('./components/Admin/Employers/Employers'));
const PendingEmps = lazy(()=>import('./components/Admin/Employers/PendingEmps'));
const AdminAccount = lazy(()=>import('./components/Admin/Account/AdminAccount'));

export const routerRoutes = createBrowserRouter([
    {
      path: "/",
      errorElement:<NotFound/>,
      element:<RootLayout/>,
      children:[
        {
          path:'',
          element: <Home/>,
        },
        {
          path:'auth',
          loader:authPageLoader,
          element: <AuthPage/>,
        },
        {
          path:'logout',
          element: <Logout/>,
        },
        {
          path: "user",
          element:<UserLayout/>,
          children:
          [
            {
              path:'',
              element: <UserHome/>,
            },
            {
              path:'jobs',
              element: <JobsPage/>,
            },
            {
              path:'applications',
              element: <Applications/>,
            },
            {
              path:'messages',
              element: <UserMessage/>,
            },
            {
              path:'account',
              element: <UserAccount/>,
            }
          ]
        },
        {
          path: "employer",
          element:<EmployerLayout/>,
          children:
          [
            {
              path:'',
              element: <EmpHomeLayout/>,
            },
            {
              path:'posts',
              element: <Posts/>,
            },
            {
              path:'posts/:id',
              element: <PostDetail/>,
            },
            {
              path:'add-post',
              element: <AddPost/>,
            },
            {
              path:'posts/edit/:id',
              element: <EditPost/>,
            },
            {
              path:'find',
              element: <Find/>,
            },
            {
              path:'messages',
              element: <UserMessage/>,
            },
            {
              path:'account',
              element: <EmpAccount/>,
            }
          ]
        },
        {
          path: "admin",
          element:<AdminLayout/>,
          children:
          [
            {
              path:'',
              element: <AdminHome/>,
            },
            {
              path:'employers',
              element: <Employers/>,
            },
            {
              path:'pendings',
              element: <PendingEmps/>,
            },
            {
              path:'account',
              element: <AdminAccount/>,
            }
          ]
        }
      ]
    },
    
]);