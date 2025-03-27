import { getAxios } from "../utility";

export const CreatePortfolioApi = async (payload: any) =>
  await getAxios().post("/portfolios/", payload);

export const CreateSecondStepPortfolioApi = async (id: number, payload: any) =>
  await getAxios().put("/portfolios/" + id, payload);

export const GetAllPortfolios = async () =>
  await getAxios().get("/portfolios/");

export const GetPortfolio = async (id: number | string) =>
  await getAxios().get("/portfolios/" + id);

export const DeleteAPortfolio = async (id: number) =>
  await getAxios().delete("/portfolios/" + id);

export const CreatePortfolioIngestion = async (
  id: number | string,
  payload: FormData
) => await getAxios().post(`/portfolios/${id}/ingest`, payload);

export const CreatePortfolioECLCalculation = async (
  id: number | string,
  reporting_date: string | HTMLInputElement
) =>
  await getAxios().post(
    `/portfolios/calculate-ecl-provision?reporting_date=${reporting_date}`,
    {
      portfolio_id: id,
    }
  );

export const CreatePortfolioLocalImpairmentCalculation = async (
  id: number | string,
  payload: any
) =>
  await getAxios().post(`/portfolios/${id}/calculate-local-provision`, payload);

export const GenerateReports = async (id: number | string, payload: any) =>
  await getAxios().post(`/reports/${id}/generate`, payload);

export const SaveReports = async (id: number | string, payload: any) =>
  await getAxios().post(`/reports/${id}/save`, payload);

export const GetReportHistory = async (id: number | string) =>
  await getAxios().get(`/reports/${id}/history`);

export const DownloadReportHistory = async (
  id: number | string,
  report_id: number | string
) => await getAxios().get(`/reports/${id}/report/${report_id}/download`);
