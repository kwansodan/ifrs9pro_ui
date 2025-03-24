import axios from "axios";
import { getAxios } from "../utility";

export const UserLogin = async (email: string, password: string) =>
  await getAxios().post("/login", { email, password });

export const UserRequestAccess = async (email: string) =>
  await getAxios().post("/request-access", { email });

export const UserSendRequestToAdmin = async (
  email: string,
  admin_email: string
) => await getAxios().post("/submit-admin-request", { email, admin_email });

//using api directly for some reasons
export const VerifyUserEmail = async (token: string) =>
  await axios.get(`https://ifrs9pro-api.service4gh.com/verify-email/${token}`);

export const VerifyAdminApproval = async (
  token: string,
  password: string,
  confirm_password: string
) =>
  await getAxios().post(`/set-password/${token}`, {
    password,
    confirm_password,
  });
