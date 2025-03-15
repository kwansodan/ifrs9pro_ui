import { useQuery } from "@tanstack/react-query";
import { GetAdminUsers, GetAUser } from "../services/users.service";

export const useAdminUsers = () => {
  const adminUsersQuery = useQuery({
    queryKey: ["adminUsersQuery"],
    queryFn: () => GetAdminUsers(),
  });
  return {
    adminUsersQuery,
  };
};

export const useAdminUser = (id: number) => {
  const adminUserQuery = useQuery({
    queryKey: ["adminUserQuery"],
    queryFn: () => GetAUser(id),
  });
  return {
    adminUserQuery,
  };
};
