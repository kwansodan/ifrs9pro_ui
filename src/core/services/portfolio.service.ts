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
  await getAxios().get(
    `/portfolios/${id}/calculate-ecl?reporting_date=${reporting_date}`
  );

export const CreatePortfolioLocalImpairmentCalculation = async (
  id: number | string,
  reporting_date: string | HTMLInputElement
) =>
  await getAxios().get(
    `/portfolios/${id}/calculate-local-impairment?reporting_date=${reporting_date}`
  );

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

export const DeleteReport = async (
  id: number | string,
  report_id: number | string
) => await getAxios().delete(`/reports/${id}/report/${report_id}`);

export const GetQualityIssues = async (portfolio_id: number | string) =>
  await getAxios().get(`/portfolios/${portfolio_id}/quality-issues`);

export const AddCommentToQualityIssue = async (
  portfolio_id: number | string,
  issue_id: number | string,
  payload: any
) =>
  await getAxios().post(
    `/portfolios/${portfolio_id}/quality-issues/${issue_id}/comments`,
    payload
  );

export const ApproveQualityIssue = async (portfolio_id: number | string) =>
  await getAxios().post(
    `/portfolios/${portfolio_id}/approve-all-quality-issues`
  );

export const DownloadQualityIssuesReport = async (
  id: number | string,
  issue_id: number | string
) =>
  await getAxios().get(`/portfolios/${id}/quality-issues/${issue_id}/download`);
