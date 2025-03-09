import { getAxios } from "../utility";

export const GetAdminRequests = async () =>
  await getAxios().get("/admin/requests");

export const ApproveUserRequest = async (
  request_id: number,
  status: string,
  role: string
) => await getAxios().put("/admin/requests/" + request_id, { status, role });
