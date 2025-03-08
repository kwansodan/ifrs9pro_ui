import { getAxios } from "../utility";

export const GetAdminRequests = async () =>
  await getAxios().get("/admin/requests");
