import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllDosen,
  storeDosen,
  updateDosen,
  deleteDosen,
} from "@/Utils/Apis/DosenApi";
import { toastSuccess, toastError } from "@/Utils/Helpers/toastHelpers"; // Pastikan path ini benar

// Hook untuk mengambil semua data dosen dengan dukungan query params
export const useDosen = (query = {}) =>
  useQuery({
    queryKey: ["dosen", query],
    queryFn: () => getAllDosen(query),
    select: (res) => ({
      data: res?.data ?? [],
      total: parseInt(res.headers["x-total-count"] ?? "0", 10),
    }),
    keepPreviousData: true,
    onError: () => toastError("Gagal mengambil data dosen."),
  });

// Hook untuk menambah data dosen baru
export const useStoreDosen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: storeDosen,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dosen"] });
      toastSuccess("Dosen berhasil ditambahkan!");
    },
    onError: () => toastError("Gagal menambahkan dosen."),
  });
};

// Hook untuk mengupdate data dosen
export const useUpdateDosen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateDosen(id, data), // Wrapper untuk API yang butuh id dan data
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dosen"] });
      toastSuccess("Dosen berhasil diperbarui!");
    },
    onError: () => toastError("Gagal memperbarui dosen."),
  });
};

// Hook untuk menghapus data dosen
export const useDeleteDosen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDosen,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dosen"] });
      toastSuccess("Dosen berhasil dihapus!");
    },
    onError: () => toastError("Gagal menghapus dosen."),
  });
};
