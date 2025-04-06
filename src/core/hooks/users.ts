import { useQuery } from "@tanstack/react-query";
import { GetAdminUsers, GetAUser } from "../services/users.service";

export const useAdminUsers = () => {
  const adminUsersQuery = useQuery({
    queryKey: ["adminUsersQuery"],
    queryFn: () => GetAdminUsers(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });
  return {
    adminUsersQuery,
  };
};

export const useAdminUser = (id: number) => {
  const adminUserQuery = useQuery({
    queryKey: ["adminUserQuery"],
    queryFn: () => GetAUser(id),
    refetchOnWindowFocus: true,
  });
  return {
    adminUserQuery,
  };
};
