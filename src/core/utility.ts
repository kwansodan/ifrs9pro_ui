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

export const getAxios = () => {
  const instance = axios.create({
    baseURL: "https://ifrs9pro-backend.onrender.com",
  });

  const token = localStorage.getItem("u_token");

  const checkExpiry = () => {
    const tokenExpiry = localStorage.getItem("u_token_expiry");
    let now = moment();
    let dateToCheck = moment(tokenExpiry);
    if (dateToCheck.isBefore(now)) {
      return true;
    }
    return false;
  };

  if (token != null && token !== "") {
    instance.defaults.headers.common["Authorization"] = "Bearer " + token;
  }

  instance.interceptors.response.use(
    (response) => {
      if (response.status === 200 && response.data.data == 401) {
        clearUserData();
        window.location.reload();
      }
      if (response.status === 401 || checkExpiry()) {
        clearUserData();
        window.location.reload();
      }
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        clearUserData();
      }
      if (error?.response?.status === 429) {
        return Promise.resolve(error);
      }
      return Promise.reject(error);
    }
  );
  return instance;
};

export const clearUserSession = () => {
  localStorage.clear();
  window.location.reload();
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
