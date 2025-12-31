import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ChangePlanPrice,
  GetBillingOverview,
  GetBillingSubscription,
  GetDashboardStats,
  GetPricing,
  GetPricingPlans,
} from "../services/dashboard.service";

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

export const usePricingPlans = (page = 1, perPage = 50) =>
  useQuery({
    queryKey: ["pricing-plans", page, perPage],
    queryFn: () => GetPricingPlans(page, perPage),
    staleTime: 5 * 60 * 1000,
  });

export const useBillingOverview = () =>
  useQuery({
    queryKey: ["billing-overview"],
    queryFn: GetBillingOverview,
    staleTime: 5 * 60 * 1000,
  });

export const useBillingPricing = () =>
  useQuery({
    queryKey: ["billing-pricing"],
    queryFn: GetPricing,
    staleTime: 5 * 60 * 1000,
  });

export const useBillingSubscription = () =>
  useQuery({
    queryKey: ["billing-subscription"],
    queryFn: GetBillingSubscription,
    staleTime: 5 * 60 * 1000,
  });

export const useInitializeTransaction = () =>
  useMutation({
    mutationFn: ChangePlanPrice,
  });
