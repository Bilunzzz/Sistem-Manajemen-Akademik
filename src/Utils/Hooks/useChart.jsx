import { useQuery } from "@tanstack/react-query";
import { getAllChartData } from "@/Utils/Apis/ChartApi";

// Hook untuk mengambil data chart
export const useChartData = () =>
  useQuery({
    queryKey: ["chart", "all"],
    queryFn: getAllChartData,
    select: (res) => res?.data ?? {},
    staleTime: 5 * 60 * 1000, // 5 menit
    onError: () => console.error("Gagal mengambil data chart."),
  });
