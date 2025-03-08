import { useQuery } from "@tanstack/react-query";
import { GetAdminRequests } from "../services/dashboard.service";

export const useAdminRequests = () => {
  const adminRequestsQuery = useQuery({
    queryKey: ["adminRequestsQuery"],
    queryFn: () => GetAdminRequests(),
  });
  return {
    adminRequestsQuery,
  };
};
