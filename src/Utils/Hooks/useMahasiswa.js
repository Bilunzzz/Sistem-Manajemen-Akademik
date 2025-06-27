import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllMahasiswa,
  getMahasiswa,
  storeMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
} from "@/Utils/Apis/MahasiswaApi";

// Hook untuk mengambil data mahasiswa dengan dukungan query params
export const useMahasiswa = (query = {}) =>
  useQuery({
    queryKey: ["mahasiswa", query],
    queryFn: () => getAllMahasiswa(query),
    select: (res) => ({
      data: res?.data ?? [],
      total: parseInt(res.headers["x-total-count"] ?? "0", 10),
    }),
    keepPreviousData: true,
  });

// Hook untuk mengambil satu mahasiswa berdasarkan ID
export const useMahasiswaDetail = (id) =>
  useQuery({
    queryKey: ["mahasiswa", id],
    queryFn: () => getMahasiswa(id),
    select: (res) => res?.data,
    enabled: !!id, // Hanya jalankan jika id tersedia
  });

// Hook untuk tambah mahasiswa baru
export const useStoreMahasiswa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: storeMahasiswa,
    onSuccess: () => {
      // Invalidate dan refetch data mahasiswa
      queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
    },
  });
};

// Hook untuk update mahasiswa
export const useUpdateMahasiswa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateMahasiswa(id, data),
    onSuccess: () => {
      // Invalidate dan refetch data mahasiswa
      queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
    },
  });
};

// Hook untuk hapus mahasiswa
export const useDeleteMahasiswa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMahasiswa,
    onSuccess: () => {
      // Invalidate dan refetch data mahasiswa
      queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
    },
  });
};
