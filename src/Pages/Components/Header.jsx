import { useLocation } from "react-router-dom";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";

const Header = () => {
  const location = useLocation();
  const { user } = useAuthStateContext();

  const getTitle = () => {
    const path = location.pathname;
    if (path.startsWith("/admin/mahasiswa")) return "Mahasiswa";
    if (path.startsWith("/admin/dosen")) return "Dosen";
    if (path.startsWith("/admin/matakuliah")) return "Mata Kuliah";
    if (path.startsWith("/admin/dashboard")) return "Dashboard";
    if (path.startsWith("/login")) return "Login";
    return "Aplikasi";
  };

  return (
    <header className="bg-white shadow-2xl">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold text-blue-700">{getTitle()}</h1>
        {user && (
          <span className="text-sm text-gray-600">
            Login sebagai: <strong>{user.role}</strong>
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
