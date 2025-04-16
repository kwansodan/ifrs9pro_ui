import { memo } from "react";
import { ModalProps } from "../../core/interfaces";

export const Modal = memo(
  ({
    open,
    children,
    close,
    closeOnOverlay,
    modalHeader,
    showClose,
  }: ModalProps) => {
    const closeModal = () => {
      close(!open);
    };

    window.onclick = function (e) {
      let target = e.target as HTMLDivElement;

      if (target.matches("#modal-container")) {
        let modalContainer = document.getElementById("modal-container");
        if (
          closeOnOverlay &&
          modalContainer &&
          modalContainer.classList.contains("block")
        ) {
          close(!open);
        }
      }
    };

    return (
      <div
        id="modal-container"
        className={`${
          open ? "block" : "hidden"
        } grid place-items-center duration-500 ease-in fixed z-[50] left-0 top-0 w-full h-full overflow-auto bg-[rgb(0,0,0)] bg-[rgba(0,0,0,0.4)]`}
      >
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold pl-3 text[18px] pt-3 text-[#1E1E1E] no-underline relative top-8 left-[4%]">
              {modalHeader}
            </h3>
            <span
              onClick={() => closeModal()}
              className="z-50 pr-6 close color-[#aaa] float-right text-right text-3xl text-black no-underline cursor-pointer relative top-8 right-[4%] md:right-[5px]"
            >
              {!showClose && "×"}
            </span>
          </div>

          {children}
        </div>
      </div>
    );
  }
);
