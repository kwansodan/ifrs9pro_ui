import { UserRole } from "../enums";

const ROLE_KEY = "u_role";

export const cacheUserRole = (role: UserRole) => {
  localStorage.setItem(ROLE_KEY, role);
};

export const getCachedUserRole = (): UserRole | null => {
  const role = localStorage.getItem(ROLE_KEY);
  return role as UserRole | null;
};
