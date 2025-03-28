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
  });
  return {
    portfoliosQuery,
  };
};

export const usePortfolio = (id: number | string) => {
  const portfolioQuery = useQuery({
    queryKey: ["portfolioQuery"],
    queryFn: () => GetPortfolio(id),
  });
  return {
    portfolioQuery,
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

export const useQualityIssues = (id: number) => {
  const qualityIssuesQuery = useQuery({
    queryKey: ["qualityIssuesQuery"],
    queryFn: () => GetQualityIssues(id),
  });
  return {
    qualityIssuesQuery,
  };
};
