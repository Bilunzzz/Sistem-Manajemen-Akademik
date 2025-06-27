import { useState, useEffect } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { login as loginAPI } from "@/Utils/Apis/AuthApi";
import { toastSuccess, toastError } from "@/Utils/Helpers/toastHelpers";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";
import Input from "../Components/Input";
import Button from "../Components/Button";
import Form from "../Components/Form";
import Label from "../Components/Label";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuthStateContext();

  if (user) return <Navigate to="/admin/dashboard" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const loggedInUser = await loginAPI(email, password);
      setUser(loggedInUser);
      toastSuccess("Login berhasil!");
    } catch (err) {
      console.error(err.message || "Login gagal!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
        Login
      </h2>
      <Form id="loginForm" className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            required
            placeholder="Masukkan Email"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            required
            placeholder="Masukkan Password"
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-600">Ingat saya</span>
          </label>
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Lupa Password
          </a>
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Memproses..." : "Login"}
        </Button>
      </Form>
      <p className="text-sm text-center text-gray-600 mt-4">
        Belum punya akun?{" "}
        <Link to="/register" className="text-blue-500 hover:underline">
          Daftar
        </Link>
      </p>
    </div>
  );
};

export default Login;
