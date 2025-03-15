import { useQuery } from "@tanstack/react-query";
import { GetAllPortfolios } from "../services/portfolio.service";

export const usePortfolios = () => {
  const portfoliosQuery = useQuery({
    queryKey: ["portfoliosQuery"],
    queryFn: () => GetAllPortfolios(),
  });
  return {
    portfoliosQuery,
  };
};
