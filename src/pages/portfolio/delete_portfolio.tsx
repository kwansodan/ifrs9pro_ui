import { useState } from "react";
import Button from "../../components/button/_component";
import { showToast } from "../../core/hooks/alert";
import { DeleteAPortfolio } from "../../core/services/portfolio.service";
import { usePortfolios } from "../../core/hooks/portfolio";

function DeletePortfolio({ id, close, name, setIsDeleteDone }: any) {
  const { portfoliosQuery } = usePortfolios();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const confirmDelete = () => {
    setIsDeleting(true);
    try {
      DeleteAPortfolio(id)
        .then(() => {
          setIsDeleting(false);
          setIsDeleteDone(true);
          showToast("Operation successful", true);
          close?.();
          portfoliosQuery.refetch();
        })
        .catch((err) => {
          setIsDeleting(false);

          if (err?.response?.status === 500) {
            showToast("Server error: Please try again later.", false);
          } else {
            showToast(
              err?.response?.data?.detail ||
                "Server error: Please try again later.",
              false
            );
          }
        });
    } catch (error) {
      setIsDeleting(false);
      showToast("Sorry, an error occurred", false);
    }
  };
  return (
    <div className="p-10 bg-white rounded-[8px]">
      <div className="w-16 m-auto"></div>
      <div className="text-sm">
        <h3 className="mt-3 text-black">
          This action will delete all data related to this portfolio. Are you
          sure you want to delete <br />
          <b className="font-bold">{name}'s </b>portfolio?
        </h3>
        <div className="!flex !justify-end mt-6">
          <button
            onClick={close}
            className="!bg-white !text-black !border-[2px] px-4 py-2 !rounded-lg min-w-[110px] mr-8 min-h-[35px]"
          >
            Cancel
          </button>
          <Button
            isLoading={isDeleting}
            className="!bg-red-500 !w-10 text-white px-4 py-2 !rounded-lg min-w-[110px] min-h-[35px]"
            text="Delete"
            onClick={confirmDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default DeletePortfolio;
