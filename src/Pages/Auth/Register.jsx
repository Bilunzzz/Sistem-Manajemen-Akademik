import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { showToast } from "@/Utils/Helpers/toastHelpers";
import { register } from "@/Utils/Apis/AuthApi";

const Register = () => {
  const [form, setForm] = useState({ email: "", password: "", nama: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      showToast("Registrasi berhasil! Silakan login.", "success");
      navigate("/login");
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-105"
    >
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        Daftar Akun Baru
      </h2>
      <div className="space-y-6">
        <div>
          <label
            htmlFor="nama"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nama Lengkap
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="Masukkan nama lengkap Anda"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Alamat Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="contoh@email.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Kata Sandi
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="Buat kata sandi yang kuat"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-8 w-full bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold py-3 px-4 rounded-md hover:from-green-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 ease-in-out transform hover:-translate-y-1"
      >
        Daftar Sekarang
      </button>
      <p className="mt-6 text-center text-gray-600 text-sm">
        Sudah punya akun?{" "}
        <Link
          to="/login"
          className="font-medium text-blue-600 hover:text-blue-800 transition duration-200"
        >
          Masuk di sini
        </Link>
      </p>
    </form>
  );
};

export default Register;
