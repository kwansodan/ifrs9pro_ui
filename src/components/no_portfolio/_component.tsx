import { useState } from "react";
import { Images } from "../../data/Assets";
import Button from "../button/_component";
import { Modal } from "../modal/_component";
import CreatePorfolio from "../create_portfolio/_component";

function NoPortfolioYet() {
  const [openCreatePortfolioModal, setOpenCreatePortfolioModal] =
    useState<boolean>(false);
  return (
    <>
      <Modal
        close={() => setOpenCreatePortfolioModal(false)}
        open={openCreatePortfolioModal}
        modalHeader="Create Portfolio"
      >
        <CreatePorfolio cancel={() => setOpenCreatePortfolioModal(false)} />
      </Modal>
      <div className="flex flex-col justify-center text-center w-[300px] m-auto mt-16">
        <img
          src={Images.portfolio}
          className="w-[31px] h-[31px] flex justify-center m-auto"
          alt=""
        />
        <h3 className="text-[#000000] font-semibold text-[18px] ">
          No portfolio yet
        </h3>
        <p className="text-[#6F6F6F] text-[16px] font-normal text-center">
          Create your first portfolio to start managing loan impairments
        </p>
        <div className="flex justify-center">
          <Button
            text="Create portfolio"
            onClick={() => setOpenCreatePortfolioModal(true)}
            className="bg-[#166E94] font-normal mt-3 text-white text-[12px] !rounded-[10px] !w-[210px] "
          />
        </div>
      </div>
    </>
  );
}

export default NoPortfolioYet;
