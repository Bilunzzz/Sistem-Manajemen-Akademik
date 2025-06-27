import axios from "@/Utils/AxiosInstance";

// Ambil semua rencana studi/kelas dengan dukungan query params
export const getAllRencanaStudi = (params = {}) =>
  axios.get("/kelas", { params });

// Ambil satu rencana studi berdasarkan ID
export const getRencanaStudi = (id) => axios.get(`/kelas/${id}`);

// Tambah rencana studi baru
export const storeRencanaStudi = (data) => axios.post("/kelas", data);

// Update rencana studi
export const updateRencanaStudi = (id, data) => axios.put(`/kelas/${id}`, data);

// Hapus rencana studi
export const deleteRencanaStudi = (id) => axios.delete(`/kelas/${id}`);
