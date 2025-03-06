import { useState } from "react";
import { Modal } from "../../components/modal/_component";
import Button from "../../components/button/_component";

function ShareFeedback({ cancel }: any) {
  const [openSecondStepCreatePortfolio, setOpenSecondStepCreatePortfolio] =
    useState<boolean>(false);

  return (
    <>
      <Modal
        close={() => setOpenSecondStepCreatePortfolio(false)}
        open={openSecondStepCreatePortfolio}
        modalHeader="Create Portfolio"
      ></Modal>
      <div className="bg-white min-w-[500px] rounded-[20px]">
        <form action="">
          <div className="p-8 ">
            <div className="mt-3">
              <textarea
                placeholder="Leave feedback here"
                className="w-full h-[100px] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
              />
            </div>
          </div>
          <hr />
          <div className="flex justify-end p-2">
            <Button
              text="Cancel"
              onClick={() => {
                cancel();
              }}
              className="bg-white !py-0 mr-3 border-[1px] border-[#6F6F6F] font-normal mt-3 text-[#6F6F6F] text-[12px] !rounded-[10px] !w-[90px] "
            />
            <Button
              text="Submit"
              className="bg-[#166E94] font-normal mt-3 text-white text-[12px] !rounded-[10px] !w-[90px] "
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default ShareFeedback;
