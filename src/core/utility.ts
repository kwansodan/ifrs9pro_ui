import moment from "moment";
import { IConfig } from "./interfaces";
import axios from "axios";

let options: IConfig = {} as IConfig;
export const setBaseApi = (v: any) => (options = { apiBaseUrl: v });
export const getConfig = (): IConfig => options;

export const clearUserData = () => {
  localStorage.removeItem("u_user_info");
  localStorage.removeItem("u_token");
  localStorage.removeItem("u_token_expiry");
  localStorage.removeItem("selectedLanguage");
  localStorage.removeItem("coverImage");
};

export const clearUserSession = () => {
  localStorage.clear();
  window.location.reload();
};

export const getAxios = () => {
  const instance = axios.create({
    // baseURL: "https://ifrs9pro-backend.onrender.com",
    baseURL: "https://ifrs9pro-api.service4gh.com",
  });

  const token = localStorage.getItem("u_token");

  let currentDate = new Date();
  let currentTimestamp = moment(currentDate).valueOf();
  let expiry = localStorage.getItem("u_token_expiry");
  if (expiry) {
    let expiryTimestamp = parseInt(expiry, 10);
    if (token != null && token !== "") {
      instance.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    if (expiryTimestamp < currentTimestamp) {
      clearUserSession();
    }
  }

  // const checkExpiry = () => {
  //   const tokenExpiry = localStorage.getItem("u_token_expiry");
  //   let now = moment();
  //   let dateToCheck = moment(tokenExpiry);
  //   if (dateToCheck.isBefore(now)) {
  //     return true;
  //   }
  //   return false;
  // };

  // if (token != null && token !== "") {
  //   instance.defaults.headers.common["Authorization"] = "Bearer " + token;
  // }

  instance.interceptors.response.use(
    (response) => {
      if (response.status === 200 && response.data.data == 401) {
        clearUserSession();
      }
      // if (response.status === 401 || checkExpiry()) {
      //   clearUserSession();
      // }
      return response;
    },
    (error) => {
      // if (error?.response?.status === 401) {
      //   clearUserSession();
      // }
      if (error?.response?.status === 429) {
        return Promise.resolve(error);
      }
      return Promise.reject(error);
    }
  );
  return instance;
};

export const cacheUserSession = (token: string, expiry: any) => {
  localStorage.setItem("u_token", token);
  localStorage.setItem("u_token_expiry", expiry.toString());
};

export const cacheUserRole = (role: string) => {
  localStorage.setItem("u_role", role);
};

export const getUserSession = () => {
  try {
    const token = localStorage.getItem("u_token");
    const expiry = localStorage.getItem("u_token_expiry");

    if (!token || !expiry) {
      return undefined;
    }

    const currentTimestamp = Date.now();
    const expiryTimestamp = parseInt(expiry, 10);

    if (currentTimestamp >= expiryTimestamp) {
      clearUserSession();
      return undefined;
    }

    return token;
  } catch (error) {
    console.error("Error retrieving user session:", error);
    return undefined;
  }
};

export const addCommasToNumber = (number: number) => {
  return number.toLocaleString();
};

export const renderStatusColors = (status: string) => {
  return status.toLocaleLowerCase() === "pending"
    ? "text-yellow-500"
    : status.toLocaleLowerCase() === "approved"
    ? "text-green-500"
    : "text-red-500";
};

export const renderReportLabel = (value: string) => {
  if (value === "collateral_summary") return "Summary of Collateral data";
  if (value === "guarantee_summary") return "Summary of Guarantee data";
  if (value === "interest_rate_summary") return "Summary of Interest rates";
  if (value === "repayment_summary") return "Summary of repayments";
  if (value === "assumptions_summary") return "Summary of assumptions";
  if (value === "amortised_loan_balances")
    return "Amortised loan balances report (caveat that the BOG non-accrual rule has not been considered)";
  if (value === "probability_default") return "Probability of default report";
  if (value === "exposure_default") return "Exposure at default report";
  if (value === "loss_given_default") return "Loss given default report";

  return "Report not found";
};

export const renderFeedbackStatusColors = (status: string) => {
  if (status.toLocaleLowerCase() === "submitted") return "text-[#3D88A8]";
  if (status === "open") return "text-[#FF3B30]";
  if (status === "closed") return "text-[#34C759]";
  if (status === "in development") return "text-[#F7941E]";
  if (status === "completed") return "text-[#3434C7]";
  if (status === "returned") return "text-[#E4C00B]";

  return "Status not found";
};
