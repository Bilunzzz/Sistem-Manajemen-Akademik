import axios from "@/Utils/AxiosInstance";

// Ambil semua mata kuliah dengan dukungan query params
export const getAllMatkul = (params = {}) => axios.get("/matkul", { params });
export const getMatkul = (id) => axios.get(`/matkul/${id}`);
export const storeMatkul = (data) => axios.post("/matkul", data);
export const updateMatkul = (id, data) => axios.put(`/matkul/${id}`, data);
export const deleteMatkul = (id) => axios.delete(`/matkul/${id}`);
