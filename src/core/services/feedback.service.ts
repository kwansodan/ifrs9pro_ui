import { getAxios } from "../utility";

export const SendFeedback = async (payload: any) =>
  await getAxios().post("/user/feedback", payload);

export const GetAllFeedbacks = async () =>
  await getAxios().get("/user/feedback");

export const GetFeedback = async (id: number | string) =>
  await getAxios().get(`/user/feedback/${id}`);

export const UpdateFeedback = async (id: number | string, payload: any) =>
  await getAxios().put(`/admin/feedback/${id}/status`, payload);

export const DeleteAFeedback = async (id: number | string) =>
  await getAxios().delete(`/admin/feedback/${id}`);

export const LikeFeedback = async (id: number | string) =>
  await getAxios().post(`/user/feedback/${id}/like`);

export const SendHelp = async (payload: any) =>
  await getAxios().post("/user/help", payload);

export const GetNotifications = async () =>
  await getAxios().get(`/user/notifications`);
