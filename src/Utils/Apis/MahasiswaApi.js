import axios from "@/Utils/AxiosInstance";

// Ambil semua mahasiswa dengan dukungan query params
export const getAllMahasiswa = (params = {}) =>
  axios.get("/mahasiswa", { params });

// Ambil satu mahasiswa berdasarkan ID
export const getMahasiswa = (id) => axios.get(`/mahasiswa/${id}`);

// Tambah mahasiswa baru
export const storeMahasiswa = (data) => axios.post("/mahasiswa", data);

// Update mahasiswa
export const updateMahasiswa = (id, data) =>
  axios.put(`/mahasiswa/${id}`, data);

// Hapus mahasiswa
export const deleteMahasiswa = (id) => axios.delete(`/mahasiswa/${id}`);
