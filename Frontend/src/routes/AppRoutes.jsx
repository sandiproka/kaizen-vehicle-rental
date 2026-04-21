import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import About from "../pages/About";
import Vehicles from "../pages/Vehicles";
import VehicleDetails from "../pages/VehicleDetails";
import Payment from "../pages/Payment";

import Login from "../pages/authentication/Login";
import Signup from "../pages/authentication/Signup";

import MainLayout from "../components/layout/MainLayout";

import ProtectedRoute from "./ProtectedRoute";
import Profile from "../pages/Profile";

import Admin from "../pages/admin";
import AdminRoute from "./AdminRoute";
import Dashboard from "../pages/Dashboard";
import PaymentSuccess from "../pages/PaymentSuccess";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* ✅ Layout Wrapper */}
        <Route element={<MainLayout />}>

          <Route path="/about" element={<About />} />
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/vehicle/:id" element={<VehicleDetails />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />


          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

        </Route>

       <Route element={<MainLayout />}>
                      <Route
                path="/dashboard"
                element={
                  <ProtectedRoute role="user">
                    <Dashboard />
                  </ProtectedRoute>
                }
        />
      </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;