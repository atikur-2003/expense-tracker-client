import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/authPages/Login";
import Signup from "../pages/authPages/Signup";
import DashboardLayout from "../layouts/DashboardLayout";
import Overview from "../pages/dashboardPages/Overview";

export const router = createBrowserRouter([
    {
        path:'/',
        Component: MainLayout,
        children:[
            {
                index: true,
                Component: Home
            },
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'signup',
                Component: Signup
            }
        ]
    },
    {
        path: '/dashboard',
        Component: DashboardLayout,
        children:[
            {
                path:'overview',
                Component: Overview
            }
        ]
    }
])