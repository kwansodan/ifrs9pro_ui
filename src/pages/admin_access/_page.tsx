import { useEffect, useRef, useState } from "react";
import { DataGrid } from "react-data-grid";
import { Images } from "../../data/Assets";
import FilterTray from "../../components/filter_tray/_component";
import Button from "../../components/button/_component";
import { Modal } from "../../components/modal/_component";
import CreatePorfolio from "../../components/create_portfolio/_component";
import DeleteUser from "../users/delete_user";
import ApproveRequest from "./approve_request";

function AdminAccess() {
  const menuRef = useRef<HTMLDivElement>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [openCreatePortfolioModal, setOpenCreatePortfolioModal] =
    useState<boolean>(false);
  const [openDeleteUserModal, setOpenDeleteUserModal] =
    useState<boolean>(false);
  const [openEditUserModal, setOpenEditUserModal] = useState<boolean>(false);
  const [showActionsMenu, setShowActionsMenu] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowActionsMenu(false);
      }
    };

    if (showActionsMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showActionsMenu]);

  const renderActionsRow = (data: any) => {
    return (
      <div className="flex cursor-pointer">
        <img
          onClick={() => setShowActionsMenu(!showActionsMenu)}
          src={Images.options}
          className="w-[24px]"
          alt=""
        />
      </div>
    );
  };

  const columns = [
    { key: "name", name: "Email", width: 600 },
    { key: "assetType", name: "Status", width: 440 },

    {
      key: "update",
      name: "Actions",
      renderCell: renderActionsRow,
      width: "100px",
    },
  ];

  const rows = Array(15).fill({
    name: "Personal loans",
    assetType: "Debt",
    customerType: "Individuals",
    totalLoans: "2,587",
    totalValue: "$5,000,900",
    lastCalculation: "Jan 24, 2025",
  });
  return (
    <>
      <Modal
        modalHeader="Approve role"
        open={openEditUserModal}
        close={() => setOpenEditUserModal(false)}
      >
        <div className="bg-white rounded-[20px]">
          <ApproveRequest close={() => setOpenEditUserModal(false)} />
        </div>
      </Modal>
      <Modal
        modalHeader="Delete user"
        open={openDeleteUserModal}
        close={() => setOpenDeleteUserModal(false)}
      >
        <div className="bg-white rounded-[20px]">
          <DeleteUser close={() => setOpenDeleteUserModal(false)} />
        </div>
      </Modal>
      <Modal
        close={() => setOpenCreatePortfolioModal(false)}
        open={openCreatePortfolioModal}
        modalHeader="Create Portfolio"
      >
        <CreatePorfolio cancel={() => setOpenCreatePortfolioModal(false)} />
      </Modal>
      {showActionsMenu && (
        <div
          ref={menuRef}
          className="absolute z-10 top-[15rem] right-[20rem] w-[200px] bg-white rounded-[10px] shadow-md"
        >
          <div className="p-4">
            <div
              onClick={() => {
                setOpenEditUserModal(true);
              }}
              className="flex items-center cursor-pointer"
            >
              <img className="w-[14px] mr-1" src={Images.tick} alt="" />
              <span className="text-[#1E1E1E] text-[14px] font-normal">
                Approve request
              </span>
            </div>

            <div
              onClick={() => {
                setOpenDeleteUserModal(true);
              }}
              className="flex items-center mt-2 cursor-pointer"
            >
              <img className="w-[14px] mr-1" src={Images.deny} alt="" />
              <span className="text-[#1E1E1E] text-[14px] font-normal">
                Deny request
              </span>
            </div>
            <div
              onClick={() => {
                setOpenDeleteUserModal(true);
              }}
              className="flex items-center mt-2 cursor-pointer"
            >
              <img className="w-[14px] mr-1" src={Images.flag} alt="" />
              <span className="text-[#FF3B30] text-[14px] font-normal">
                Flag suspicious
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between bg-[#f8f9fa] rounded-t-lg py-[10px] px-[12px] mt-6 max-w-[1160px]">
        <h1 className="text-[16px] font-semibold">Portfolios</h1>

        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              className="pl-10 h-[35px] min-w-[385px] pr-3 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
            />
            <img
              onClick={() => setShowFilter(!showFilter)}
              className="w-[13px] h-[13px] absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              src={Images.search}
              alt=""
            />
            <img
              onClick={() => setShowFilter(!showFilter)}
              className="w-[20px] h-[20px] absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              src={Images.filter}
              alt=""
            />
          </div>
          <Button
            text="New portfolio"
            onClick={() => setOpenCreatePortfolioModal(true)}
            className="bg-[#166E94] text-white px-4 py-2 rounded-lg min-w-[144px] min-h-[35px]"
          />
        </div>

        {showFilter && <FilterTray closeFilter={() => setShowFilter(false)} />}
      </div>
      <div className="max-w-[1160px] h-[398px] border-[1px] border-[#F0F0F0] rounded-[11px]">
        <DataGrid
          columns={columns}
          rows={rows}
          className="rdg-light custom-grid"
        />
      </div>
    </>
  );
}

export default AdminAccess;
