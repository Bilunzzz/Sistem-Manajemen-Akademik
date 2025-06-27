import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllMatkul,
  storeMatkul,
  updateMatkul,
  deleteMatkul,
} from "@/Utils/Apis/MatkulApi"; // Pastikan path ini benar
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers"; // Pastikan path ini benar

// Hook untuk mengambil semua mata kuliah
export const useMataKuliah = (params = {}) =>
  useQuery({
    queryKey: ["mata-kuliah", params],
    queryFn: () => getAllMatkul(params),
    select: (res) => {
      if (params._page && params._limit) {
        // Mode pagination: return {data, total}
        return {
          data: res?.data ?? [],
          total: parseInt(res?.headers?.["x-total-count"] ?? "0", 10),
        };
      }
      // Mode non-pagination: return data saja
      return res?.data ?? [];
    },
    keepPreviousData: true,
    onError: () => toastError("Gagal mengambil data mata kuliah."),
  });

// [+] Hook untuk menambah mata kuliah baru
export const useStoreMataKuliah = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: storeMatkul,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mata-kuliah"] });
      toastSuccess("Mata kuliah berhasil ditambahkan!");
    },
    onError: (err) =>
      toastError(
        err.response?.data?.message || "Gagal menambahkan mata kuliah."
      ),
  });
};

// [+] Hook untuk mengupdate mata kuliah
export const useUpdateMataKuliah = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateMatkul(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mata-kuliah"] });
      toastSuccess("Mata kuliah berhasil diperbarui!");
    },
    onError: (err) =>
      toastError(
        err.response?.data?.message || "Gagal memperbarui mata kuliah."
      ),
  });
};

// [+] Hook untuk menghapus mata kuliah
export const useDeleteMataKuliah = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMatkul,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mata-kuliah"] });
      toastSuccess("Mata kuliah berhasil dihapus!");
    },
    onError: (err) =>
      toastError(err.response?.data?.message || "Gagal menghapus mata kuliah."),
  });
};
