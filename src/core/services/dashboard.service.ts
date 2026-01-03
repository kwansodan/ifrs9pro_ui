import { InitializeTransactionPayload } from "../interfaces";
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

export const GetBillingOverview = async () =>
  await getAxios().get("/billing/overview");

export const GetPricing = async () => await getAxios().get("/billing/pricing");

export const GetBillingSubscription = async () =>
  await getAxios().get("/billing/subscriptions");

export const ChangePlanPrice = async (
  payload: InitializeTransactionPayload
) => {
  return getAxios().post("/billing/transactions/initialize", payload, {});
};
