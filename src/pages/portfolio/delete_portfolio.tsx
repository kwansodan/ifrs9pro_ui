import { showToast } from "../../core/hooks/alert";
import { DeleteAPortfolio } from "../../core/services/portfolio.service";

function DeletePortfolio({ id, close, name }: any) {
  const confirmDelete = () => {
    DeleteAPortfolio(id)
      .then(() => {
        showToast("Operation successful", true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        showToast(err?.response?.data.detail, false);
      });
  };
  return (
    <div className="p-10 bg-white">
      <div className="w-16 m-auto"></div>
      <div className="text-sm">
        <h3 className="mt-3 text-black">
          This action will delte all data related to this portfolio. Are you
          sure you want to delete <br />
          <b className="font-bold">{name}'s </b>portfolio?
        </h3>
        <div className="flex mt-6">
          <button
            onClick={close}
            className="bg-[#166E94] text-white px-4 py-2 rounded-lg min-w-[110px] mr-8 min-h-[35px]"
          >
            No
          </button>
          <button
            onClick={confirmDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg min-w-[110px] min-h-[35px]"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePortfolio;
