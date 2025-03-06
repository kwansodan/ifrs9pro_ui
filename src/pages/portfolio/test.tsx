import { useState } from "react";
import Button from "../../components/button/_component";
import NoReport from "../../components/no_report/_component";
import { Images } from "../../data/Assets";
import { Modal } from "../../components/modal/_component";
import UploadData from "./upload_data";
import AfterUpload from "./after_upload";
import CalculateEcl from "./calculate_elc";
import CalculateLocalImpairment from "./calculate_local";
import GenerateReport from "./generate_report";
import GenerateReportSuccess from "./generate_report_success";
import YesReport from "./yes_report";

function Test() {
  const [openUploadModal, setOpenUploadModal] = useState<boolean>(false);
  const [openEclModal, setOpenEclModal] = useState<boolean>(false);
  const [openLocalImpairmentModal, setOpenLocalImpairmentModal] =
    useState<boolean>(false);
  const [openGenerateReportModal, setOpenGenerateReportModal] =
    useState<boolean>(false);
  return (
    <>
      <Modal
        modalHeader="Upload data"
        open={openUploadModal}
        close={() => setOpenUploadModal(false)}
      >
        <div className="bg-white min-w-[600px] pt-5 pb-3 px-16 rounded-[20px]">
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
        modalHeader="Calculate local impairment"
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
          {/* <GenerateReportSuccess /> */}
          <GenerateReport close={() => setOpenGenerateReportModal(false)} />
        </div>
      </Modal>
      <div className="flex min-h-screen">
        <aside className="w-1/4 p-4 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-lg font-semibold">Personal loans</h2>
          <p className="mb-4 px-[12px] py-[7px] text-sm text-gray-500 text-[13px] bg-[#FAFAFA]">
            Portfolio description goes. Eg. Commercial loan portfolio for first
            quarter 2024
          </p>
          <hr />
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Asset type:</span>
              <span className="font-medium">Debt</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Customer type:</span>
              <span className="font-medium">Individuals</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Repayment source:</span>
              <span className="font-medium">Manual transfer</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Funding source:</span>
              <span className="font-medium">Private investors</span>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6">
          <div className="p-4 mb-6 bg-[#FAFAFA] rounded-[11px]">
            <h3 className="text-[#1E1E1E] mb-2 font-medium">Actions</h3>
            <div className="flex mb-6 space-x-4">
              <Button
                onClick={() => setOpenUploadModal(true)}
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
              <Button
                onClick={() => setOpenEclModal(true)}
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
              <Button
                onClick={() => setOpenLocalImpairmentModal(true)}
                text={
                  <>
                    <img
                      className="w-[24px] h-[18px]"
                      src={Images.calc_local}
                      alt=""
                    />
                    Calculate local impairment
                  </>
                }
                className="flex items-center gap-2 px-4 py-2 text-[#166E94] !w-[260px] !h-[45px] bg-[#D9EFF9]"
              />
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
            </div>
          </div>
          <AfterUpload />
          <div>
            <div className="flex items-center justify-between bg-[#f8f9fa] rounded-t-lg py-[10px] px-[12px] mt-6 max-w-[1160px]">
              <h1 className="text-[16px] font-semibold">Report history</h1>
            </div>
            <div className="p-6 text-center bg-white rounded-lg">
              <NoReport />
            </div>
            <YesReport />
          </div>
        </main>
      </div>
    </>
  );
}

export default Test;
