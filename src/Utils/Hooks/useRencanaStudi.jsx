import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllRencanaStudi,
  getRencanaStudi,
  storeRencanaStudi,
  updateRencanaStudi,
  deleteRencanaStudi,
} from "@/Utils/Apis/RencanaStudiApi";
import { toastSuccess, toastError } from "@/Utils/Helpers/toastHelpers";

// Hook untuk mengambil semua rencana studi/kelas
export const useRencanaStudi = (params = {}) =>
  useQuery({
    queryKey: ["rencana-studi", params],
    queryFn: () => getAllRencanaStudi(params),
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
    onError: () => toastError("Gagal mengambil data rencana studi."),
  });

// Hook untuk mengambil satu rencana studi berdasarkan ID
export const useRencanaStudiById = (id) =>
  useQuery({
    queryKey: ["rencana-studi", id],
    queryFn: () => getRencanaStudi(id),
    select: (res) => res?.data,
    enabled: !!id,
    onError: () => toastError("Gagal mengambil detail rencana studi."),
  });

// Hook untuk menambah rencana studi baru
export const useStoreRencanaStudi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: storeRencanaStudi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rencana-studi"] });
      toastSuccess("Rencana studi berhasil ditambahkan!");
    },
    onError: (err) =>
      toastError(
        err.response?.data?.message || "Gagal menambahkan rencana studi."
      ),
  });
};

// Hook untuk mengupdate rencana studi
export const useUpdateRencanaStudi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateRencanaStudi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rencana-studi"] });
      toastSuccess("Rencana studi berhasil diperbarui!");
    },
    onError: (err) =>
      toastError(
        err.response?.data?.message || "Gagal memperbarui rencana studi."
      ),
  });
};

// Hook untuk menghapus rencana studi
export const useDeleteRencanaStudi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRencanaStudi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rencana-studi"] });
      toastSuccess("Rencana studi berhasil dihapus!");
    },
    onError: (err) =>
      toastError(
        err.response?.data?.message || "Gagal menghapus rencana studi."
      ),
  });
};
