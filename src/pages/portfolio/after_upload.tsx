import { useState } from "react";
import Chart from "react-apexcharts";
import Tabs from "../../components/tabs/tab";
import Card from "../../components/card/_component";
import { Images } from "../../data/Assets";
import Button from "../../components/button/_component";
import { Modal } from "../../components/modal/_component";
import Comment from "./comment";
import EditComment from "./edit";
import { options, series } from "../../data";

function AfterUpload() {
  const [activeTab, setActiveTab] = useState("Summary");
  const [calculateActiveTab, setCalculateActiveTab] = useState("Summary");
  const [openCommentModal, setOpenCommentModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const issues = [
    { name: "Duplicate names", count: 15 },
    { name: "Duplicate address", count: 15 },
    { name: "Missing repayment history", count: 45 },
  ];
  return (
    <>
      <Modal
        modalHeader="Add comment"
        open={openCommentModal}
        close={() => setOpenCommentModal(false)}
      >
        <div className="p-12 bg-white rounded-[20px]">
          <Comment close={() => setOpenCommentModal(false)} />
        </div>
      </Modal>
      <Modal
        modalHeader="Add comment"
        open={openEditModal}
        close={() => setOpenEditModal(false)}
      >
        <div className="p-12 bg-white rounded-[20px]">
          <EditComment close={() => setOpenEditModal(false)} />
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
                  { title: "Total loans", value: "2,543" },
                  { title: "Total loan value", value: "$1.25 M" },
                  { title: "Average loan amount", value: "$500" },
                  { title: "Total customers", value: "1,093" },
                ].map((item) => (
                  <>
                    {/* <div key={item.title} className="p-4 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-600">{item.title}</p>
                    <p className="text-2xl font-semibold">{item.value}</p>
                  </div> */}
                    <Card
                      parentClassName="!h-[110px]"
                      valueClassName="!text-[33px] !text-[#1E1E1E]"
                      title={item.title}
                      value={item.value}
                    />
                  </>
                ))}
              </div>
              <h3 className="mt-6 mb-3 font-medium text-[#6F6F6F]">
                Customer summary
              </h3>
              <div className="flex gap-2">
                {[
                  { title: "Individual customers", value: "568" },
                  { title: "Institutions", value: "325" },
                  { title: "Mixed", value: "200" },
                  { title: "Active customers", value: "1,005" },
                ].map((item) => (
                  <Card
                    parentClassName="!h-[110px]"
                    valueClassName="!text-[33px] !text-[#1E1E1E]"
                    title={item.title}
                    value={item.value}
                  />
                ))}
              </div>
            </div>

            <div className=" p-3 bg-[#F0F0F0]">
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold">Calculations summary</h2>
                <Tabs
                  tabTitle={["ECL summary", "BOG summary"]}
                  activeTab={calculateActiveTab}
                  setActiveTab={setCalculateActiveTab}
                />
              </div>
              <Chart
                options={options}
                series={series}
                type="scatter"
                height={350}
              />
              ;
            </div>
          </>
        ) : (
          <div className="mt-4">
            <div className="p-3 mt-4">
              <div className="flex items-center p-3 mb-4 text-orange-700 bg-[#FEF4E8] rounded-md">
                <img
                  src={Images.triangle}
                  className="w-[18px] h-[18px] mr-2"
                  alt=""
                />
                <span className="text-sm text-[#6F6F6F]">
                  <strong>122</strong> quality issues detected. Review issues,
                  provide comments and approve.
                </span>
              </div>

              <div className="bg-white border rounded-lg shadow-sm">
                {issues.map((issue, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border-b last:border-0"
                  >
                    <span className="text-gray-700">{issue.name}</span>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`font-semibold ${
                          issue.count > 30 ? "text-[#FF3B30]" : "text-[#F7941E]"
                        }`}
                      >
                        {issue.count}
                      </span>
                      <img
                        onClick={() => setOpenEditModal(true)}
                        title="view details"
                        src={Images.see}
                        className="w-[14px] h-[14px] cursor-pointer"
                        alt=""
                      />
                      <img
                        onClick={() => setOpenCommentModal(true)}
                        title="add comment"
                        src={Images.add_comment}
                        className="w-[14px] h-[14px] cursor-pointer"
                        alt=""
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-4 text-center">
                <Button
                  text={"Approve"}
                  className="!text-center gap-2 py-2 font-normal !text-[14px] text-white !w-[120px] bg-[#166E94]"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AfterUpload;
