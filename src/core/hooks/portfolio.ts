import { useQuery } from "@tanstack/react-query";
import {
  GetAllPortfolios,
  GetPortfolio,
  GetQualityIssues,
  GetReportHistory,
} from "../services/portfolio.service";

export const usePortfolios = () => {
  const portfoliosQuery = useQuery({
    queryKey: ["portfoliosQuery"],
    queryFn: () => GetAllPortfolios(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });
  return {
    portfoliosQuery,
  };
};

export const usePortfolio = (id: number | string) => {
  const portfolioQuery = useQuery({
    queryKey: ["portfolioQuery"],
    queryFn: () => GetPortfolio(id),
    staleTime: 0,
  });
  return {
    portfolioQuery,
  };
};

export const usePorfolioReports = (id: number) => {
  const portfoliosReportsQuery = useQuery({
    queryKey: ["portfoliosReportsQuery"],
    queryFn: () => GetReportHistory(id),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });
  return {
    portfoliosReportsQuery,
  };
};

export const useQualityIssues = (id: number) => {
  const qualityIssuesQuery = useQuery({
    queryKey: ["qualityIssuesQuery"],
    queryFn: () => GetQualityIssues(id),
  });
  return {
    qualityIssuesQuery,
  };
};
