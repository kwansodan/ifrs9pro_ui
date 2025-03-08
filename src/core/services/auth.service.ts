import { getAxios, getConfig } from "../utility";

const apiAxios = () => getAxios(getConfig().apiBaseUrl);

export const UserLogin = async (email: string, password: string) =>
  await apiAxios().post("/login", { email, password });

export const UserRequestAccess = async (email: string) =>
  await apiAxios().post("/request-access", { email });

export const UserSendRequestToAdmin = async (
  user_email: string,
  admin_email: string
) =>
  await apiAxios().post("/submit-admin-request", { user_email, admin_email });

export const VerifyUserEmail = async (token: string) =>
  await apiAxios().post("/verify-email/" + token);

export const VerifyAdminApproval = async (token: string) =>
  await apiAxios().post("/set-password/" + token);

export const GetUserCurrentSession = async () =>
  await apiAxios().post("/Auth/GetCurrentSessionInternalUser", {});

export const ExpireToken = async () =>
  await apiAxios().post("/Auth/ExpireToken", {});
