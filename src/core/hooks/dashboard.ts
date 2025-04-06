import { useQuery } from "@tanstack/react-query";
import { GetDashboardStats } from "../services/dashboard.service";

export const useDashboardStats = () => {
  const dashboardStatsQuery = useQuery({
    queryKey: ["dashboardStatsQuery"],
    queryFn: () => GetDashboardStats(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });
  return {
    dashboardStatsQuery,
  };
};
