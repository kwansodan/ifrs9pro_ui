import axios from "axios";
import { getAxios } from "../utility";
import { getBillingToken } from "../storage/billing";
import { InitializeTransactionPayload } from "../interfaces";

const STAGING_API_BASE_URL = "https://do-site-staging.service4gh.com";
const PRODUCTION_API_BASE_URL = "https://do-site.service4gh.com";

const URL = PRODUCTION_API_BASE_URL;

export const UserLogin = async (email: string, password: string) =>
  await getAxios().post("/login", { email, password });

export const UserRequestAccess = async (email: string) =>
  await getAxios().post("/request-access", { email });

export const UserSendRequestToAdmin = async (
  email: string,
  admin_email: string
) => await getAxios().post("/submit-admin-request/", { email, admin_email });

//using api directly for some reasons
export const VerifyUserEmail = async (token: string) =>
  await axios.get(`https://do-site.service4gh.com/verify-email/${token}`);

export const VerifyAdminApproval = async (
  token: string,
  password: string,
  confirm_password: string
) =>
  await getAxios().post(`/set-password/${token}`, {
    password,
    confirm_password,
  });

export const RegisterTenant = async (payload: {
  company_name: string;
  industry: string;
  country: string;
  preferred_accounting_standard: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  job_role: string;
  password: string;
}) => await getAxios().post("/register-tenant", payload);

export const CreateBillingCustomer = async (billingToken: string) => {
  return await axios.post(
    `${URL}/billing/customers`,
    {},
    {
      headers: {
        Authorization: `Bearer ${billingToken}`,
      },
    }
  );
};

export const GetBillingPlans = async (page = 1, perPage = 50) => {
  const billingToken = getBillingToken();
  if (!billingToken) {
    throw new Error("Billing token missing");
  }

  return axios.get(`${URL}/billing/plans`, {
    params: {
      page,
      per_page: perPage,
    },
    headers: {
      Authorization: `Bearer ${billingToken}`,
    },
  });
};

export const InitializeBillingTransaction = async (
  payload: InitializeTransactionPayload
) => {
  const billingToken = getBillingToken();

  if (!billingToken) {
    throw new Error("Billing token missing");
  }

  return axios.post(`${URL}/billing/transactions/initialize`, payload, {
    headers: {
      Authorization: `Bearer ${billingToken}`,
    },
  });
};
