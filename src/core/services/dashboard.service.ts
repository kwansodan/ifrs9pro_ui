import { getAxios, getConfig } from "../utility";

const apiAxios = () => getAxios(getConfig().apiBaseUrl);

export const GetAdminRequests = async () =>
  await apiAxios().get("/admin/requests");
