import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginLayout from "./Pages/Layout/AuthLayout";
import AdminLayout from "./Pages/Layout/AdminLayout";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Dashboard from "./Pages/Admin/Dashboard";
import Mahasiswa from "./Pages/Admin/Mahasiswa";
import MahasiswaDetail from "./Pages/Admin/MahasiswaDetail";
import Dosen from "./Pages/Admin/Dosen";
import DosenDetail from "./Pages/Admin/DosenDetail";
import Matkul from "./Pages/Admin/MataKuliah";
import RencanaStudi from "./Pages/Admin/RencanaStudi";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("user");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginLayout />}>
            <Route index element={<Login />} />
          </Route>
          <Route path="/register" element={<LoginLayout />}>
            <Route index element={<Register />} />
          </Route>
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="mahasiswa" element={<Mahasiswa />} />
            <Route path="dosen" element={<Dosen />} />
            <Route path="dosen/:id" element={<DosenDetail />} />
            <Route path="matakuliah" element={<Matkul />} />
            <Route path="rencanastudi" element={<RencanaStudi />} />
            <Route path="mahasiswa/:id" element={<MahasiswaDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
