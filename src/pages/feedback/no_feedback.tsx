import { useState } from "react";
import { Images } from "../../data/Assets";
import { Modal } from "../../components/modal/_component";
import Button from "../../components/button/_component";
import ShareFeedback from "./share_feedback";
import { useFeedback } from "../../core/hooks/feedback";
import Feedback from "./_page";
import { AxiosError } from "axios";
import { ApiErrorPage } from "../errors/api";

function NoFeedback() {
  const { feedbackQuery } = useFeedback();

  const [openCreateFeedbackModal, setOpenCreateFeedbackModal] =
    useState<boolean>(false);

  const handleRetry = () => {
    feedbackQuery.refetch();
  };

  if (feedbackQuery.isError) {
    const error = feedbackQuery.error;

    let errorMessage = "Unable to fetch data from server.";

    if (error instanceof AxiosError) {
      errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message;
    }

    return <ApiErrorPage message={errorMessage} onRetry={handleRetry} />;
  }

  const feedbackData =
    feedbackQuery && feedbackQuery.data && feedbackQuery.data.data;

  return (
    <>
      <Modal
        close={() => setOpenCreateFeedbackModal(false)}
        open={openCreateFeedbackModal}
        modalHeader="Share feedback"
      >
        <ShareFeedback cancel={() => setOpenCreateFeedbackModal(false)} />
      </Modal>
      {feedbackData?.length < 1 ? (
        <>
          <div className="flex flex-col justify-center text-center w-[300px] m-auto mt-16">
            <img
              src={Images.portfolio}
              className="w-[31px] h-[31px] flex justify-center m-auto"
              alt=""
            />
            <h3 className="text-[#000000] font-semibold text-[18px] ">
              No feedback yet
            </h3>
            <p className="text-[#6F6F6F] text-[16px] font-normal text-center">
              Create your first portfolio to start managing loan impairments
            </p>
            <div className="flex justify-center">
              <Button
                text="Share feedback"
                onClick={() => setOpenCreateFeedbackModal(true)}
                className="bg-[#166E94] font-normal mt-3 text-white text-[12px] !rounded-[10px] !w-[210px] "
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <Feedback />
        </>
      )}
    </>
  );
}

export default NoFeedback;
