import { createBrowserRouter } from "react-router";
import Login from "../pages/authPages/Login";
import MainLayout from "../layouts/MainLayout";
import Signup from "../pages/authPages/Signup";
import Home from "../pages/Home";

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
    
])