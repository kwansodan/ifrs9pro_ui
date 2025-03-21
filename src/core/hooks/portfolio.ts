import { useQuery } from "@tanstack/react-query";
import {
  GetAllPortfolios,
  GetReportHistory,
} from "../services/portfolio.service";

export const usePortfolios = () => {
  const portfoliosQuery = useQuery({
    queryKey: ["portfoliosQuery"],
    queryFn: () => GetAllPortfolios(),
  });
  return {
    portfoliosQuery,
  };
};

export const usePorfolioReports = (id: number) => {
  const portfoliosReportsQuery = useQuery({
    queryKey: ["portfoliosReportsQuery"],
    queryFn: () => GetReportHistory(id),
  });
  return {
    portfoliosReportsQuery,
  };
};
