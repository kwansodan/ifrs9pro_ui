import { getAxios } from "../utility";

export const CreatePortfolioApi = async (payload: any) =>
  await getAxios().post("/portfolios", payload);
