import { getAxios } from "../utility";

export const SendFeedback = async (payload: any) =>
  await getAxios().post("/user/feedback", payload);

export const GetAllFeedbacks = async () =>
  await getAxios().get("/user/feedback");
