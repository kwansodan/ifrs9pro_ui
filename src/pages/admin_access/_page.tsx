import { useEffect, useRef, useState } from "react";
import { DataGrid } from "react-data-grid";
import { Images } from "../../data/Assets";
import FilterTray from "../../components/filter_tray/_component";
import Button from "../../components/button/_component";
import { Modal } from "../../components/modal/_component";
import CreatePorfolio from "../../components/create_portfolio/_component";
import DeleteUser from "../users/delete_user";
import ApproveRequest from "./approve_request";
import { useAdminRequests } from "../../core/hooks/admin";
import TableLoader from "../../components/table_loader/component";

import { renderStatusColors } from "../../core/utility";

function AdminAccess() {
  const menuRef = useRef<HTMLDivElement>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [query, setQuery] = useState("");
  const [actionToBeTaken, setActionToBeTaken] = useState<string>("");
  const [requestId, setRequestId] = useState<number>();
  const [openCreatePortfolioModal, setOpenCreatePortfolioModal] =
    useState<boolean>(false);
  const [openDeleteUserModal, setOpenDeleteUserModal] =
    useState<boolean>(false);
  const [openEditUserModal, setOpenEditUserModal] = useState<boolean>(false);
  const [showActionsMenu, setShowActionsMenu] = useState<boolean>(false);

  const { adminRequestsQuery } = useAdminRequests();
  const adminData =
    adminRequestsQuery &&
    adminRequestsQuery.data &&
    adminRequestsQuery.data.data;
  const filteredData =
    adminRequestsQuery &&
    adminRequestsQuery.data &&
    adminRequestsQuery.data.data?.filter((e: any) => {
      if (query === "") return e.status;
      else if (e?.status?.toLowerCase().includes(query.toLocaleLowerCase()))
        return e;
    });
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
    const { id } = data.row;
    return (
      <div className="flex cursor-pointer">
        <img
          onClick={() => {
            setRequestId(id);
            setShowActionsMenu((prev) => !prev);
          }}
          src={Images.options}
          className="w-[24px]"
          alt=""
        />
      </div>
    );
  };

  const renderStatus = (data: any) => {
    const { status } = data.row;
    return (
      <div className="flex cursor-pointer">
        <span className={renderStatusColors(status)}>{status}</span>
      </div>
    );
  };

  const columns = [
    { key: "email", name: "Email", resizable: true },
    { key: "admin_email", name: "Admin Email", resizable: true },
    {
      key: "status",
      name: "Status",
      resizable: true,
      renderCell: renderStatus,
    },
    {
      key: "actions",
      name: "Actions",
      renderCell: renderActionsRow,
      width: "100px",
    },
  ];
  return (
    <>
      <Modal
        modalHeader="Update"
        open={openEditUserModal}
        close={() => setOpenEditUserModal(false)}
      >
        <div className="bg-white rounded-[20px]">
          <ApproveRequest
            requestId={requestId}
            actionToBeTaken={actionToBeTaken}
            close={() => setOpenEditUserModal(false)}
          />
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
          className="absolute z-10 top-[15rem] right-[13rem] w-[200px] bg-white rounded-[10px] shadow-md"
        >
          <div className="p-4">
            <div
              onClick={(event) => {
                const text =
                  event.currentTarget.querySelector("span")?.innerText || "";
                setActionToBeTaken(text);
                console.log(text);
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
              onClick={(event) => {
                const text =
                  event.currentTarget.querySelector("span")?.innerText || "";
                setActionToBeTaken(text);
                setOpenEditUserModal(true);
              }}
              className="flex items-center mt-2 cursor-pointer"
            >
              <img className="w-[14px] mr-1" src={Images.deny} alt="" />
              <span className="text-[#1E1E1E] text-[14px] font-normal">
                Deny request
              </span>
            </div>
            <div
              onClick={(event) => {
                const text =
                  event.currentTarget.querySelector("span")?.innerText || "";
                setActionToBeTaken(text);
                setOpenEditUserModal(true);
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
      {adminData && adminData?.length < 1 ? (
        <>
          <div className="flex flex-col justify-center text-center w-[300px] m-auto mt-16">
            <img
              src={Images.portfolio}
              className="w-[31px] h-[31px] flex justify-center m-auto"
              alt=""
            />
            <h3 className="text-[#000000] font-semibold text-[18px] ">
              No access requests yet
            </h3>
            <small className="text-[#6F6F6F] text-[16px] font-normal text-center">
              You'll find all access requests here. You can approve or deny
              them.
            </small>
          </div>
        </>
      ) : (
        <>
          <div>
            <div className="flex items-center justify-between bg-[#f8f9fa] rounded-t-lg py-[10px] px-[12px] mt-6 max-w-[1160px]">
              <h1 className="text-[16px] font-semibold">Access requests</h1>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by status..."
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10 text-sm h-[35px] min-w-[385px] pr-3 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
                  />
                  <img
                    onClick={() => setShowFilter(!showFilter)}
                    className="w-[13px] h-[13px] absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                    src={Images.search}
                    alt=""
                  />
                </div>
                <Button
                  text="New portfolio"
                  onClick={() => setOpenCreatePortfolioModal(true)}
                  className="bg-[#166E94] text-white px-4 py-2 rounded-lg min-w-[144px] min-h-[35px]"
                />
              </div>

              {showFilter && (
                <FilterTray closeFilter={() => setShowFilter(false)} />
              )}
            </div>
            <div className="max-w-[1160px] h-[398px] border-[1px] border-[#F0F0F0] rounded-[11px]">
              {adminRequestsQuery.isFetching ? (
                <>
                  <TableLoader />
                </>
              ) : (
                <>
                  <DataGrid
                    columns={columns}
                    rows={filteredData || []}
                    className="rdg-light custom-grid"
                  />
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AdminAccess;
