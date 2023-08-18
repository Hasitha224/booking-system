import React from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Home from '../pages/Home';
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Welcome from "../pages/welcome";

import PublicRoute from "../utils/PublicRouterWrapper";



/**AppRouter Component */
function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<PublicRoute> <Home/> </PublicRoute>}>
                {}
                <Route path="/" element={<PublicRoute> <Welcome/> </PublicRoute> }/>
                {}
                <Route path="/login" element={<PublicRoute> <Login/> </PublicRoute> }/>
                <Route path="/signup" element={<PublicRoute> <Signup/> </PublicRoute> }/>
            </Route>
            
            {}
            <Route path="/dashboard" element={<Dashboard/> }>

            </Route>
        </Routes>
    );
}

export default AppRouter;