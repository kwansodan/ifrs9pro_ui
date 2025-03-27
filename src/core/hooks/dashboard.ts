import { useQuery } from "@tanstack/react-query";
import { GetDashboardStats } from "../services/dashboard.service";

export const useDashboardStats = () => {
  const dashboardStatsQuery = useQuery({
    queryKey: ["dashboardStatsQuery"],
    queryFn: () => GetDashboardStats(),
  });
  return {
    dashboardStatsQuery,
  };
};
