import moment from "moment";
import { IConfig } from "./interfaces";
import axios from "axios";
import { showToast } from "./hooks/alert";

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
    // baseURL: "https://do-site-staging.service4gh.com",
    baseURL: "https://do-site.service4gh.com",
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

  instance.interceptors.response.use(
    (response) => {
      if (response.status === 200 && response.data.data == 401) {
        clearUserSession();
      }
      // if (response.status.toLocaleLowerCase() === 401 || checkExpiry()) {
      //   clearUserSession();
      // }
      return response;
    },
    (error) => {
      console.log("eee: ", error);
      // if (error?.response?.status.toLocaleLowerCase() === 401) {
      //   clearUserSession();
      // }
      // if (error?.response?.status.toLocaleLowerCase() === 429) {
      //   return Promise.resolve(error);
      // }
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
  if (value === "ecl_detailed_report") return "ECL detailed report";
  if (value === "ecl_report_summarised_by_stages")
    return "ECL report summarised by stages";
  if (value === "BOG_impairment_detailed_report")
    return "BOG impairment detailed report";
  if (value === "BOG_IMPAIRMENT_REPORT_SUMMARISED")
    return "BOG impairment summary by stages";
  if (value === "JOURNALS_REPORT") return "Journals report";
  // if (value === "local_impairment_detailed_report")
  // if (value === "local_impairment_detailed_report")
  //   return "Local impairment detailed report";
  // if (value === "local_impairment_report_summarised_by_stages")
  //   return "Local impairment report summarised by stages";
  // if (value === "journals_report") return "Journals report";

  return "Report not found";
};

export const renderFeedbackStatusColors = (status: string) => {
  if (status.toLocaleLowerCase() === "submitted") return "text-[#3D88A8]";
  if (status.toLocaleLowerCase() === "open") return "text-[#FF3B30]";
  if (status.toLocaleLowerCase() === "closed") return "text-[#34C759]";
  if (status.toLocaleLowerCase() === "in development") return "text-[#F7941E]";
  if (status.toLocaleLowerCase() === "completed") return "text-[#3434C7]";
  if (status.toLocaleLowerCase() === "returned") return "text-[#E4C00B]";

  return "Status not found";
};

export const currencyFormatter = (amount: number): string => {
  const safeAmount = isNaN(amount) ? 0 : amount;
  const rounded = Math.round(safeAmount);

  // Handle -0 specifically
  const finalAmount = Object.is(rounded, -0) ? 0 : rounded;

  return `₵${finalAmount.toLocaleString("en-GH", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};

export const currencyFormatterWithoutCediSign = (amount: number): string => {
  const safeAmount = isNaN(amount) ? 0 : amount;
  return `${safeAmount.toLocaleString("en-GH", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};

export const validateSequentialRanges = (
  payload: Record<string, { days_range: string; rate: string }>
): boolean => {
  const categoriesOrder = [
    "current",
    "olem",
    "substandard",
    "doubtful",
    "loss",
  ];
  let expectedStart = 0;

  for (const category of categoriesOrder) {
    const range = String(payload[category]?.days_range ?? "").trim();
    const rate = String(payload[category]?.rate ?? "").trim();

    if (!range || !rate) {
      showToast(`Missing range or rate in "${category}"`, false);
      return false;
    }

    if (rate.includes("%") || isNaN(Number(rate))) {
      showToast(
        `Invalid rate format in "${category}": "${rate}". Use decimal or whole numbers only.`,
        false
      );
      return false;
    }

    let start: number, end: number;

    if (range.includes("-")) {
      const [startStr, endStr] = range.split("-").map((s) => s.trim());
      start = parseInt(startStr);
      end = parseInt(endStr);
    } else if (range.includes("+")) {
      const [startStr] = range.split("+").map((s) => s.trim());
      start = parseInt(startStr);
      end = Number.MAX_SAFE_INTEGER;
    } else {
      showToast(`Invalid range format in "${category}": ${range}`, false);
      return false;
    }

    if (start !== expectedStart) {
      showToast(
        `Invalid range in "${category}". Expected start: ${expectedStart}, but got: ${start}`,
        false
      );
      return false;
    }

    expectedStart = end === Number.MAX_SAFE_INTEGER ? end : end + 1;
  }

  return true;
};

export const isEmptyRate = (value: any): boolean => {
  return value === null || value === undefined || value === "";
};
export const isEmptyRange = (value: any): boolean => {
  return value === null || value === undefined || value === "";
};
