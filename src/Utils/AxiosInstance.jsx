import axios from "axios";

// Ini akan secara otomatis menggunakan '/api' saat di-deploy,
// dan alamat lokal saat development.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002"; // Sesuaikan port lokal jika perlu

const AxiosInstance = axios.create({
  baseURL: API_URL,
});

export default AxiosInstance;
