import { useState } from "react";
import Button from "../../components/button/_component";
import { Modal } from "../../components/modal/_component";
import { UploadDataProps } from "../../core/interfaces";
function Help({ close }: UploadDataProps) {
  const [openHelpModal, setOpenHelpModal] = useState<boolean>(true);
  return (
    <>
      <Modal
        open={openHelpModal}
        close={() => setOpenHelpModal(false)}
        modalHeader="Get help"
      >
        <div className="p-8 bg-white rounded-[20px]">
          <hr className="my-3" />
          <textarea
            placeholder="Ask a question"
            rows={8}
            className="min-w-[580px] h-[80px] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
          />
          <div className="flex justify-end mt-3">
            <Button
              text="Cancel"
              onClick={() => setOpenHelpModal(false)}
              className="px-4 !w-[90px]  !text-[14px] bg-white border border-gray-400 rounded-[10px] mr-2"
            />
            <Button
              text="Submit"
              className="bg-[#166E94] !text-[14px] !w-[90px] text-white px-4 py-2 rounded-[10px]"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Help;
