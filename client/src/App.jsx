import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import JobDetails from "./pages/JobDetails";
import PostJob from "./pages/PostJob";
import Applications from "./pages/Applications";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

const App = () => {
   return (
      <Router>
         <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/jobs/:id" element={<JobDetails />} />

            {/* Student-Only Routes */}
            <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
               <Route path="/dashboard" element={<Dashboard />} />
               <Route path="/applications" element={<Applications />} />
            </Route>

            {/* Recruiter-Only Routes */}
            <Route element={<ProtectedRoute allowedRoles={["recruiter"]} />}>
               <Route path="/post-job" element={<PostJob />} />
            </Route>

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
         </Routes>
      </Router>
   );
};

export default App;
