import { useEffect, useState } from "react";
import Button from "../../components/button/_component";
import NoReport from "../../components/no_report/_component";
import { Images } from "../../data/Assets";
import { Modal } from "../../components/modal/_component";
import UploadData from "./upload_data";
import CalculateEcl from "./calculate_elc";
import CalculateLocalImpairment from "./calculate_local";
import GenerateReport from "./generate_report";
import AfterUpload from "./after_upload";
import YesReport from "./yes_report";
import { useParams } from "react-router-dom";
import { usePorfolioReports, usePortfolio } from "../../core/hooks/portfolio";
import PageLoader from "../../components/page_loader/_component";
import TextLoader from "../../components/text_loader/component";

function FilteredResults() {
  const { id } = useParams();
  const { portfolioQuery } = usePortfolio(Number(id));
  const { portfoliosReportsQuery } = usePorfolioReports(Number(id));
  const [openUploadModal, setOpenUploadModal] = useState<boolean>(false);
  const [openEclModal, setOpenEclModal] = useState<boolean>(false);
  const [openLocalImpairmentModal, setOpenLocalImpairmentModal] =
    useState<boolean>(false);
  const [openGenerateReportModal, setOpenGenerateReportModal] =
    useState<boolean>(false);

  const dataSummary =
    portfolioQuery &&
    portfolioQuery.data &&
    portfolioQuery.data.data &&
    portfolioQuery.data.data;

  useEffect(() => {
    portfolioQuery.refetch();
  }, [id]);

  const handleOpenUploadData = () => {
    if (dataSummary && dataSummary?.has_ingested_data) {
      if (
        window.confirm(
          "Ingestion already done. This ingestion will overwrite the previous one. Do you want to continue?"
        )
      ) {
        setOpenUploadModal(true);
      } else {
        setOpenUploadModal(false);
      }
    } else {
      setOpenUploadModal(true);
    }
  };
  const handleOpenCalculateEclModal = () => {
    if (dataSummary && dataSummary?.has_calculated_ecl) {
      if (
        window.confirm(
          "ECL calculation already done. This calculation will overwrite the previous one. Do you want to continue?"
        )
      ) {
        setOpenEclModal(true);
      } else {
        setOpenEclModal(false);
      }
    } else {
      setOpenEclModal(true);
    }
  };
  const handleOpenCalculateBoGImpairmentModal = () => {
    if (dataSummary && dataSummary?.has_calculated_local_impairment) {
      if (
        window.confirm(
          "BoG impairment calculation already done. This calculation will overwrite the previous one. Do you want to continue?"
        )
      ) {
        setOpenLocalImpairmentModal(true);
      } else {
        setOpenLocalImpairmentModal(false);
      }
    } else {
      setOpenLocalImpairmentModal(true);
    }
  };
  return (
    <>
      <Modal
        modalHeader="Upload data"
        open={openUploadModal}
        close={() => setOpenUploadModal(false)}
      >
        <div className="bg-white pt-5 pb-3 px-16 rounded-[20px]">
          <UploadData close={() => setOpenUploadModal(false)} />
        </div>
      </Modal>
      <Modal
        modalHeader="Calculate ECL"
        open={openEclModal}
        close={() => setOpenEclModal(false)}
      >
        <div className="bg-white min-w-[600px] p-8 px-16 rounded-[20px]">
          <CalculateEcl close={() => setOpenEclModal(false)} />
        </div>
      </Modal>
      <Modal
        modalHeader="Calculate BOG impairment"
        open={openLocalImpairmentModal}
        close={() => setOpenLocalImpairmentModal(false)}
      >
        <div className="bg-white min-w-[600px] p-8 px-8 rounded-[20px]">
          <CalculateLocalImpairment
            close={() => setOpenLocalImpairmentModal(false)}
          />
        </div>
      </Modal>
      <Modal
        modalHeader="Generate report"
        open={openGenerateReportModal}
        close={() => setOpenGenerateReportModal(false)}
      >
        <div className="bg-white min-w-[600px] p-8 px-8 rounded-[20px]">
          <GenerateReport close={() => setOpenGenerateReportModal(false)} />
        </div>
      </Modal>
      <div className="flex min-h-screen">
        <aside className="w-1/4 p-4 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-lg font-semibold">Personal loans</h2>
          <p className="mb-4 px-[12px] py-[7px] text-sm text-gray-500 text-[13px] bg-[#FAFAFA]">
            {portfolioQuery?.isLoading ? (
              <>
                <TextLoader />
              </>
            ) : (
              <>
                {portfolioQuery &&
                  portfolioQuery.data &&
                  portfolioQuery.data.data.description}
              </>
            )}
          </p>
          <hr />
          {portfolioQuery?.isLoading ? (
            <>
              <TextLoader />
              <div className="-mt-20">
                <TextLoader />
              </div>
              <div className="-mt-20">
                <TextLoader />
              </div>
              <div className="-mt-20">
                <TextLoader />
              </div>
            </>
          ) : (
            <>
              <div className="mt-5 space-y-3 text-sm ">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Asset type:</span>
                  <span className="font-medium capitalize">
                    {portfolioQuery &&
                      portfolioQuery.data &&
                      portfolioQuery.data.data.asset_type}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Customer type:</span>
                  <span className="font-medium capitalize">
                    {portfolioQuery &&
                      portfolioQuery.data &&
                      portfolioQuery.data.data.customer_type}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Repayment source:</span>
                  <span className="font-medium capitalize">
                    {portfolioQuery &&
                    portfolioQuery.data &&
                    portfolioQuery.data.data.repayment_source
                      ? "Yes"
                      : "No"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Funding source:</span>
                  <span className="font-medium capitalize">
                    {portfolioQuery &&
                      portfolioQuery.data &&
                      portfolioQuery.data.data.funding_source}
                  </span>
                </div>
              </div>
            </>
          )}
        </aside>

        <main className="flex-1 p-6">
          <div className="p-4 mb-6 bg-[#FAFAFA] rounded-[11px]">
            <h3 className="text-[#1E1E1E] mb-2 font-medium">Actions</h3>
            <div className="flex mb-6 space-x-4">
              {portfolioQuery?.isLoading ? (
                <>
                  <TextLoader />
                </>
              ) : (
                <>
                  <Button
                    onClick={handleOpenUploadData}
                    text={
                      <>
                        <img
                          className="w-[18px] h-[18px]"
                          src={Images.upload}
                          alt=""
                        />
                        <p>Upload data</p>
                      </>
                    }
                    className="flex items-center gap-2 px-4 py-2 text-[#166E94] !w-[190px]  bg-[#D9EFF9]"
                  />
                </>
              )}

              {portfolioQuery?.isLoading ? (
                <>
                  <TextLoader />
                </>
              ) : (
                <>
                  <Button
                    onClick={handleOpenCalculateEclModal}
                    text={
                      <>
                        <img
                          className="w-[18px] h-[18px]"
                          src={Images.calc_ecl}
                          alt=""
                        />
                        Calculate ECL
                      </>
                    }
                    className="flex items-center gap-2 px-4 py-2 text-[#166E94] !w-[190px]  bg-[#D9EFF9]"
                  />
                </>
              )}

              {portfolioQuery?.isLoading ? (
                <>
                  <TextLoader />
                </>
              ) : (
                <>
                  <Button
                    onClick={handleOpenCalculateBoGImpairmentModal}
                    text={
                      <>
                        <img
                          className="w-[24px] h-[18px]"
                          src={Images.calc_local}
                          alt=""
                        />
                        Calculate BOG impairment
                      </>
                    }
                    className="flex items-center gap-2 px-4 py-2 text-[#166E94] !w-[260px] !h-[45px] bg-[#D9EFF9]"
                  />
                </>
              )}

              {portfolioQuery?.isLoading ? (
                <>
                  <TextLoader />
                </>
              ) : (
                <>
                  <Button
                    onClick={() => setOpenGenerateReportModal(true)}
                    text={
                      <>
                        <img
                          className="w-[18px] h-[18px]"
                          src={Images.report}
                          alt=""
                        />
                        Generate reports
                      </>
                    }
                    className="flex items-center gap-2 px-4 py-2 text-[#166E94] !w-[190px]  bg-[#D9EFF9]"
                  />
                </>
              )}
            </div>
          </div>
          {portfolioQuery?.isLoading ? (
            <>
              <PageLoader />
            </>
          ) : (
            <>
              <AfterUpload
                ecl={
                  (dataSummary?.calculation_summary?.ecl?.["Stage 1"]
                    ?.provision_amount ?? 0) +
                  (dataSummary?.calculation_summary?.ecl?.["Stage 2"]
                    ?.provision_amount ?? 0) +
                  (dataSummary?.calculation_summary?.ecl?.["Stage 3"]
                    ?.provision_amount ?? 0)
                }
                bog_impairment={
                  (dataSummary?.calculation_summary?.local_impairment?.Current
                    ?.provision_amount ?? 0) +
                  (dataSummary?.calculation_summary?.local_impairment?.OLEM
                    ?.provision_amount ?? 0) +
                  (dataSummary?.calculation_summary?.local_impairment
                    ?.Substandard?.provision_amount ?? 0) +
                  (dataSummary?.calculation_summary?.local_impairment?.Doubtful
                    ?.provision_amount ?? 0) +
                  (dataSummary?.calculation_summary?.local_impairment?.Loss
                    ?.provision_amount ?? 0)
                }
                has_all_issues_approved={dataSummary?.has_all_issues_approved}
                is_graph_loading={portfolioQuery?.isFetching}
                has_ingested_data={dataSummary?.has_ingested_data}
                total_loans={dataSummary?.overview.total_loans}
                total_loan_value={dataSummary?.overview.total_loan_value}
                average_loan={dataSummary?.overview.average_loan_amount}
                total_customers={dataSummary?.overview.total_customers}
                individual_customers={
                  dataSummary?.customer_summary.individual_customers
                }
                ecl_summary_data={
                  (dataSummary?.calculation_summary &&
                    dataSummary?.calculation_summary?.ecl) ||
                  {}
                }
                bog_summary_data={
                  (dataSummary?.calculation_summary &&
                    dataSummary?.calculation_summary?.local_impairment) ||
                  {}
                }
                institutions={dataSummary?.customer_summary.institutions}
                mixed={dataSummary?.customer_summary.mixed}
                active_customers={
                  dataSummary?.customer_summary.active_customers
                }
              />
            </>
          )}

          <div>
            {portfoliosReportsQuery &&
            portfoliosReportsQuery.data &&
            portfoliosReportsQuery.data.data &&
            portfoliosReportsQuery.data.data.items.length < 1 ? (
              <>
                <div className="p-6 text-center bg-white rounded-lg">
                  <NoReport />
                </div>
              </>
            ) : (
              <>
                {portfoliosReportsQuery?.isLoading ? (
                  <>
                    <PageLoader />
                  </>
                ) : (
                  <>
                    <YesReport />
                  </>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default FilteredResults;
