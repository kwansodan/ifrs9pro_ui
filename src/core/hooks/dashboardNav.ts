import { useMemo } from "react";
import { getCachedUserRole } from "../storage/auth";
import { dashboardNavItems } from "../../data";
import { UserRole } from "../enums";

export const useDashboardNav = () => {
  const role = getCachedUserRole();

  const filteredNavItems = useMemo(() => {
    return dashboardNavItems.filter((item) => {
      if (!item.allowedRoles) return true;

      if (!role) return false;

      return item.allowedRoles.includes(role as UserRole);
    });
  }, [role]);

  return filteredNavItems;
};
