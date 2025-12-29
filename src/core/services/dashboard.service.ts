import { getAxios } from "../utility";

export const GetDashboardStats = async () => await getAxios().get("/dashboard");

export const GetAdminRequests = async () =>
  await getAxios().get("/admin/requests");

export const ApproveUserRequest = async (
  request_id: number,
  status: string,
  role: string
) => await getAxios().put("/admin/requests/" + request_id, { status, role });

export const GetPricingPlans = async (page = 1, perPage = 50) => {
  return getAxios().get("/billing/plans", {
    params: {
      page,
      per_page: perPage,
    },
  });
};
