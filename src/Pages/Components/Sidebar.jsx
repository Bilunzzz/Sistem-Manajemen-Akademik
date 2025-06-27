import { NavLink, useNavigate } from "react-router-dom";
import { confirmDialog } from "@/Utils/Helpers/swalHelpers";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStateContext();

  const handleLogout = async () => {
    const confirmed = await confirmDialog(
      "Logout",
      "Yakin ingin logout?",
      "Logout"
    );
    if (confirmed) {
      // localStorage.removeItem("isAuthenticated");
      // localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    }
  };

  const menuItems = [
    {
      label: "Dashboard",
      to: "/admin/dashboard",
      permission: "dashboard.page",
    },
    {
      label: "Mahasiswa",
      to: "/admin/mahasiswa",
      permission: "mahasiswa.page",
    },
    {
      label: "Dosen",
      to: "/admin/dosen",
      permission: "dosen.page",
    },
    {
      label: "Mata Kuliah",
      to: "/admin/matakuliah",
      permission: "matkul.page",
    },
    {
      label: "Rencana Studi",
      to: "/admin/rencanastudi",
      permission: "rencana-studi.page",
    },
  ];

  return (
    <div className="w-64 h-screen bg-blue-900 text-white p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Admin</h2>
      <ul className="flex-1">
        {menuItems.map(
          (item) =>
            user?.permission.includes(item.permission) && (
              <li key={item.to} className="mb-2">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive
                      ? "p-2 block bg-blue-700 rounded"
                      : "p-2 block hover:bg-blue-800 rounded"
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            )
        )}
      </ul>

      <button
        onClick={handleLogout}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition mt-auto"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
