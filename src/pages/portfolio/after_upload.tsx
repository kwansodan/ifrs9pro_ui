import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Tabs from "../../components/tabs/tab";
import Card from "../../components/card/_component";
import { Images } from "../../data/Assets";
import Button from "../../components/button/_component";
import { Modal } from "../../components/modal/_component";
import Comment from "./comment";
import { useParams } from "react-router-dom";
import { useQualityIssues } from "../../core/hooks/portfolio";
import { ApexOptions } from "apexcharts";
import PageLoader from "../../components/page_loader/_component";
import {
  currencyFormatter,
  currencyFormatterWithoutCediSign,
} from "../../core/utility";
import { ApproveQualityIssue } from "../../core/services/portfolio.service";
import { showToast } from "../../core/hooks/alert";
import ViewDuplicate from "./view_duplicates";

function AfterUpload({
  ecl,
  bog_impairment,
  has_all_issues_approved,
  total_loans,
  total_loan_value,
  average_loan,
  total_customers,
  has_ingested_data,
  is_graph_loading,
  ecl_summary_data,
  bog_summary_data,
  individual_customers,
  institutions,
}: // mixed,
// active_customers,
any) {
  const { id } = useParams();
  const { qualityIssuesQuery } = useQualityIssues(Number(id));

  const [activeTab, setActiveTab] = useState("Summary");
  const [issue_id, setSelectedIssueId] = useState<string | null>(null);
  const [details_issue_id, setDetailsId] = useState<string | null>(null);
  const [calculateActiveTab, setCalculateActiveTab] = useState("ECL summary");
  const [openCommentModal, setOpenCommentModal] = useState<boolean>(false);
  const [approving, setApproving] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  const checkForQualityIssues =
    qualityIssuesQuery &&
    qualityIssuesQuery.data &&
    qualityIssuesQuery.data.data &&
    qualityIssuesQuery.data.data.detail === "No quality issues found"
      ? false
      : true;

  useEffect(() => {
    qualityIssuesQuery.refetch();
  }, [issue_id]);

  const actualIssues =
    qualityIssuesQuery &&
    qualityIssuesQuery.data &&
    qualityIssuesQuery.data.data &&
    qualityIssuesQuery.data.data;

  const categories = ["Stage 1", "Stage 2", "Stage 3"];
  const bog_categories = ["Current", "OLEM", "Substandard", "Doubtful", "Loss"];

  const numLoansData = ecl_summary_data
    ? categories.map(
        (stage) => ecl_summary_data?.[stage]?.total_loan_value ?? 0
      )
    : [];

  const bog_numLoansData = bog_summary_data
    ? bog_categories.map(
        (stage) => bog_summary_data?.[stage]?.total_loan_value ?? 0
      )
    : [];

  const ecl_options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    xaxis: {
      categories: categories,
      title: { text: "Stages" },
    },
    yaxis: {
      title: {
        text: "Outstanding loan amount",
        style: {
          fontSize: "14px",
          fontWeight: 600,
          color: "#333",
        },
        offsetX: 5,
        offsetY: 0,
        rotate: -90,
      },
      labels: {
        formatter: (val: number) => currencyFormatterWithoutCediSign(val),
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => currencyFormatterWithoutCediSign(val),
    },
    tooltip: {
      y: {
        formatter: (val: number) => currencyFormatterWithoutCediSign(val),
      },
    },
  };

  const ecl_series = [
    {
      name: "Loan amount",
      data: numLoansData,
    },
  ];

  const bog_options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    xaxis: {
      categories: bog_categories,
      title: { text: "Stages" },
    },
    yaxis: {
      title: {
        text: "Outstanding loan amount",
        style: {
          fontSize: "14px",
          fontWeight: 600,
          color: "#333",
        },
        offsetX: 5,
        offsetY: 0,
        rotate: -90,
      },
      labels: {
        formatter: (val: number) => currencyFormatterWithoutCediSign(val),
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => currencyFormatterWithoutCediSign(val),
    },
    tooltip: {
      y: {
        formatter: (val: number) => currencyFormatterWithoutCediSign(val),
      },
    },
  };

  const bog_series = [
    {
      name: "Loan amount",
      data: bog_numLoansData,
    },
  ];

  const approveIssue = () => {
    setApproving(true);
    ApproveQualityIssue(Number(id))
      .then((res) => {
        setApproving(false);
        showToast(res.data.message ?? "Approval successful", true);
      })
      .catch((err) => {
        setApproving(false);
        showToast(
          err?.response?.data.detail[0].msg ??
            "An error occurred, please try again",
          false
        );
      });
  };
  const selectedIssue = Array.isArray(actualIssues)
    ? actualIssues.find((issue: any) => issue.id === Number(details_issue_id))
    : null;

  return (
    <>
      <Modal
        modalHeader="Add comment"
        open={openCommentModal}
        close={() => setOpenCommentModal(false)}
      >
        <div className="p-12 bg-white rounded-[20px]">
          <Comment
            issue_id={issue_id}
            close={() => setOpenCommentModal(false)}
            portfolio_id={id}
          />
        </div>
      </Modal>
      <Modal
        modalHeader="View duplicate names"
        open={openEditModal}
        close={() => setOpenEditModal(false)}
      >
        <div className="p-12 bg-white rounded-[20px]">
          <ViewDuplicate
            selectedIssueId={details_issue_id}
            affected_records={selectedIssue?.affected_records || []}
          />
        </div>
      </Modal>
      <div className="bg-white border rounded-lg shadow-sm ">
        <div className="flex items-center justify-between p-3 bg-[#F0F0F0]">
          <h2 className="text-lg font-semibold">Data summary</h2>
          <Tabs
            tabTitle={["Summary", "Quality issues"]}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {activeTab === "Summary" ? (
          <>
            <div className="p-3 mt-4">
              <h3 className="font-medium text-[#6F6F6F] my-3">
                Portfolio overview
              </h3>
              <div className="flex gap-2">
                {[
                  { title: "Loan count", value: total_loans },
                  {
                    title: "Total loan value",
                    value: currencyFormatter(total_loan_value),
                  },
                  {
                    title: "Average loan amount",
                    value: currencyFormatter(average_loan),
                  },
                  { title: "Total customers", value: total_customers },
                ].map((item, idx) => (
                  <React.Fragment key={idx}>
                    <Card
                      key={idx}
                      parentClassName="!h-[110px]"
                      valueClassName="!text-[27px] !text-[#1E1E1E]"
                      title={item.title}
                      value={item.value}
                    />
                  </React.Fragment>
                ))}
              </div>
              <div className="flex gap-2 mt-3">
                {[
                  { title: "ECL", value: currencyFormatter(ecl) ?? 0 },
                  {
                    title: "BOG impairment",
                    value: currencyFormatter(bog_impairment) ?? 0,
                  },
                  {
                    title: "Risk reserve",
                    value: currencyFormatter(bog_impairment - ecl) ?? 0,
                  },
                ].map((item, idx) => (
                  <React.Fragment key={idx}>
                    <Card
                      key={idx}
                      parentClassName="!h-[110px]"
                      valueClassName="!text-[27px] !text-[#1E1E1E]"
                      title={item.title}
                      value={item.value}
                    />
                  </React.Fragment>
                ))}
              </div>
              <h3 className="mt-6 mb-3 font-medium text-[#6F6F6F]">
                Customer summary
              </h3>
              <div className="flex gap-2">
                {[
                  {
                    title: "Individual customers",
                    value: individual_customers,
                  },
                  { title: "Institutions", value: institutions },
                  // { title: "Mixed", value: mixed },
                  // { title: "Active customers", value: active_customers },
                ].map((item, idx) => (
                  <Card
                    key={idx}
                    parentClassName="!h-[110px]"
                    valueClassName="!text-[33px] !text-[#1E1E1E]"
                    title={item.title}
                    value={item.value}
                  />
                ))}
              </div>
            </div>
            {is_graph_loading ? (
              <>
                <PageLoader />
              </>
            ) : (
              <>
                {has_ingested_data ? (
                  <>
                    <div className=" p-3 bg-[#F0F0F0]">
                      <div className="flex justify-between">
                        <h2 className="text-lg font-semibold">
                          Calculations summary
                        </h2>
                        <Tabs
                          tabTitle={["ECL summary", "BOG summary"]}
                          activeTab={calculateActiveTab}
                          setActiveTab={setCalculateActiveTab}
                        />
                      </div>
                      {calculateActiveTab === "ECL summary" ? (
                        <Chart
                          options={ecl_options}
                          series={ecl_series}
                          type="bar"
                          height={350}
                        />
                      ) : (
                        <Chart
                          options={bog_options}
                          series={bog_series}
                          type="bar"
                          height={350}
                        />
                      )}
                    </div>
                  </>
                ) : (
                  <>{null}</>
                )}
              </>
            )}
          </>
        ) : qualityIssuesQuery && qualityIssuesQuery?.isLoading ? (
          <PageLoader />
        ) : (
          <div className="mt-4 overflow-y-scroll h-[32rem]">
            <div className="p-3 mt-4">
              <div className="flex items-center p-3 mb-4 text-orange-700 bg-[#FEF4E8] rounded-md">
                <img
                  src={Images.triangle}
                  className="w-[18px] h-[18px] mr-2"
                  alt=""
                />
                {!checkForQualityIssues ? (
                  <>
                    <span className="text-sm text-[#6F6F6F]">
                      {qualityIssuesQuery &&
                        qualityIssuesQuery.data &&
                        qualityIssuesQuery.data.data &&
                        qualityIssuesQuery.data.data.detail}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-sm text-[#6F6F6F]">
                      <strong>{actualIssues && actualIssues?.length}</strong>{" "}
                      quality issues detected. Review issues, provide comments
                      and approve.
                    </span>
                  </>
                )}
              </div>

              <div className="bg-white border rounded-lg shadow-sm">
                {!checkForQualityIssues ? (
                  <></>
                ) : (
                  <>
                    {actualIssues &&
                      actualIssues?.map((issue: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-4 border-b last:border-0"
                        >
                          <span className="text-gray-700">
                            {issue?.description}
                          </span>
                          <div className="flex items-center space-x-4">
                            <span
                              title="Number of affected records"
                              className={`cursor-default  font-semibold text-[#F7941E]`}
                            >
                              {issue?.affected_records.length}
                            </span>
                            <img
                              onClick={() => {
                                setOpenEditModal(true);
                                setDetailsId(issue && issue.id);
                              }}
                              title="view details"
                              src={Images.see}
                              className="w-[14px] h-[14px] cursor-pointer"
                              alt=""
                            />
                            <img
                              onClick={() => {
                                setOpenCommentModal(true);
                                setSelectedIssueId(issue && issue.id);
                              }}
                              title="add comment"
                              src={Images.add_comment}
                              className="w-[14px] h-[14px] cursor-pointer"
                              alt=""
                            />
                          </div>
                        </div>
                      ))}
                  </>
                )}
              </div>
              {checkForQualityIssues ? (
                <>
                  <div className="flex justify-end mt-4 text-center ">
                    {has_all_issues_approved && has_all_issues_approved ? (
                      <>
                        <Button
                          text={"Approved"}
                          className="!text-center !cursor-default gap-2 py-2 font-normal !text-[14px] text-white !w-[120px] bg-[#34C7592E]"
                        />
                      </>
                    ) : (
                      <>
                        <Button
                          isLoading={approving}
                          text={"Approve"}
                          onClick={approveIssue}
                          className="!text-center gap-2 py-2 font-normal !text-[14px] text-white !w-[120px] bg-[#166E94]"
                        />
                      </>
                    )}
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AfterUpload;
