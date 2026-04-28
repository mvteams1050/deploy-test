import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { TooltipProvider } from "@/components/ui/tooltip";

import AdminDashboardPage from "./pages/dashboard/Dashboard";
import AdminLoginPage from "./pages/auth/SignIn";
import AdminSignupPage from "./pages/auth/SignUp";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <TooltipProvider>
      <Router>
        <Routes>
          <Route path="/sign-up" element={<AdminSignupPage />} />
          <Route path="/sign-in" element={<AdminLoginPage />} />
          <Route path="/" element={<AdminDashboardPage />} />
        </Routes>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </TooltipProvider>
  );
};

export default App;