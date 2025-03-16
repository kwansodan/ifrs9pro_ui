import { getAxios } from "../utility";

export const CreatePortfolioApi = async (payload: any) =>
  await getAxios().post("/portfolios", payload);

export const CreateSecondStepPortfolioApi = async (id: number, payload: any) =>
  await getAxios().put("/portfolios/" + id, payload);

export const GetAllPortfolios = async () => await getAxios().get("/portfolios");

export const DeleteAPortfolio = async (id: number) =>
  await getAxios().delete("/portfolios/" + id);

export const CreatePortfolioIngestion = async (
  id: number | string,
  payload: FormData
) => await getAxios().post(`/portfolios/${id}/ingest`, payload);
