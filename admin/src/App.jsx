import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "./context/AppContext";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Navigate, Route, Routes } from "react-router-dom";
import DashBoard from "./pages/Admin/Dashboard";

import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";
import { DoctorContext } from "./context/DontorContext";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointmets from "./pages/Doctor/DoctorAppointments";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import TopLoadingBar from "./components/TopLoadingBar";
const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  const { isLoading } = useContext(AppContext);
  return aToken || dToken ? (
    <>
      {/* {isLoading && <TopLoadingBar />} */}
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-slate-50">
        <ToastContainer />
        <Navbar />
        <div className="flex items-start">
          <Sidebar />

          <main className="min-h-[calc(100vh-73px)] flex-1 overflow-x-hidden p-4 md:p-6">
          <Routes>
            {/* Admin Routes */}
            <Route path="/" element={<Navigate to={aToken ? "/admin-dashboard" : "/doctor-dashboard"} replace />} />
            <Route path="/admin-dashboard" element={aToken ? <DashBoard /> : <Navigate to="/doctor-dashboard" replace />} />
            <Route path="/all-appointments" element={aToken ? <AllAppointments /> : <Navigate to="/doctor-dashboard" replace />} />
            <Route path="/add-doctor" element={aToken ? <AddDoctor /> : <Navigate to="/doctor-dashboard" replace />} />
            <Route path="/doctor-list" element={aToken ? <DoctorsList /> : <Navigate to="/doctor-dashboard" replace />} />

            {/* Doctor Routes */}
            <Route path="/doctor-dashboard" element={dToken ? <DoctorDashboard /> : <Navigate to="/admin-dashboard" replace />} />
            <Route
              path="/doctor-appointments"
              element={dToken ? <DoctorAppointmets /> : <Navigate to="/admin-dashboard" replace />}
            />
            <Route path="/doctor-profile" element={dToken ? <DoctorProfile /> : <Navigate to="/admin-dashboard" replace />} />
          </Routes>
          </main>
        </div>
      </div>
    </>
  ) : (
    <div>
      {isLoading && <TopLoadingBar />}
      <Login />
      <ToastContainer />
    </div>
  );
};

export default App;
