import { getAxios } from "../utility";

export const GetFrontendConfig = async () =>
  await getAxios().get("/frontend-config.json");
