import { getAxios, getConfig } from "../utility";

const apiAxios = () => getAxios(getConfig().apiBaseUrl);

export const CreatePortfolioApi = async (payload: any) =>
  await apiAxios().post("/portfolios", payload);
