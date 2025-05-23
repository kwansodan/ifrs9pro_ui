import { useEffect, useRef, useState } from "react";
import { DataGrid } from "react-data-grid";
import { Images } from "../../data/Assets";
import FilterTray from "../../components/filter_tray/_component";
import Button from "../../components/button/_component";
import { usePortfolios } from "../../core/hooks/portfolio";
import moment from "moment";
import TableLoader from "../../components/table_loader/component";
import { Modal } from "../../components/modal/_component";
import CreatePorfolio from "../../components/create_portfolio/_component";
import DeletePortfolio from "./delete_portfolio";
import { motion } from "framer-motion";
import { FilterValues } from "../../core/interfaces";

function PortfolioMain() {
  const { portfoliosQuery } = usePortfolios();
  const menuRef = useRef<HTMLDivElement>(null);
  const [openCreatePortfolioModal, setOpenCreatePortfolioModal] =
    useState<boolean>(false);
  const [query, setQuery] = useState("");
  const [showActionsMenu, setShowActionsMenu] = useState<boolean>(false);
  const [requestId, setRequestId] = useState<number>(0);
  const [portfolioName, setPortfolioName] = useState<string>("");
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterValues>({
    asset_type: [],
    funding_source: [],
  });

  const handleApplyFilter = (newFilters: any) => {
    setFilters(newFilters);
  };
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

  const [showFilter, setShowFilter] = useState<boolean>(false);
  const renderActionsRow = (data: any) => {
    const { id, name } = data.row;
    return (
      <div className="flex cursor-pointer">
        <>
          <img
            onClick={() => {
              setRequestId(id);
              setPortfolioName(name);
              setShowActionsMenu((prev) => !prev);
            }}
            src={Images.options}
            className="w-[24px]"
            alt=""
          />
        </>
      </div>
    );
  };

  const filteredData =
    portfoliosQuery?.data?.data?.items?.filter((e: any) => {
      const matchesSearch =
        query === "" || e?.name?.toLowerCase().includes(query.toLowerCase());

      const matchesAssetType =
        filters.asset_type.length === 0 ||
        filters.asset_type.some(
          (type: string) => type.toLowerCase() === e.asset_type.toLowerCase()
        );
      const matchesFundingSource =
        filters.funding_source.length === 0 ||
        filters.funding_source.some(
          (source: string) =>
            source.toLowerCase() === e.funding_source.toLowerCase()
        );

      return matchesSearch && matchesAssetType && matchesFundingSource;
    }) || [];

  const renderUpdatedAtDate = (data: any) => {
    return moment(data.row.updated_at).format("lll");
  };

  const columns = [
    { key: "name", name: "Name", width: 180 },
    { key: "description", name: "Description", width: 180 },
    { key: "asset_type", name: "Asset type", resizable: true },
    { key: "customer_type", name: "Customer type", resizable: true },
    { key: "funding_source", name: "Funding source", resizable: true },
    {
      key: "updated_at",
      name: "Updated at",
      resizable: true,
      renderCell: renderUpdatedAtDate,
    },
    {
      key: "update",
      name: "Actions",
      renderCell: renderActionsRow,
      width: "100px",
    },
  ];
  const filteredColumns =
    location.pathname === "/dashboard"
      ? columns.filter((col) => col.key !== "update")
      : columns;

  const handleClearFilters = () => {
    setFilters({
      asset_type: [],
      funding_source: [],
    });
    setShowFilter(false);
  };
  return (
    <>
      <Modal
        close={() => setOpenCreatePortfolioModal(false)}
        open={openCreatePortfolioModal}
        modalHeader="Create New Portfolio"
      >
        <CreatePorfolio cancel={() => setOpenCreatePortfolioModal(false)} />
      </Modal>
      <Modal
        close={() => setConfirmDelete(false)}
        open={confirmDelete}
        modalHeader="Delete Portfolio"
      >
        <DeletePortfolio
          name={portfolioName}
          close={() => setConfirmDelete(false)}
          id={requestId}
        />
      </Modal>
      {showActionsMenu && (
        <div
          ref={menuRef}
          className="absolute z-10 top-[15rem] right-[13rem] w-1/7 bg-white rounded-[10px] shadow-md"
        >
          <div className="p-4">
            <div
              onClick={() =>
                (window.location.href =
                  "/dashboard/portfolio/edit-portfolio/" + requestId)
              }
              className="flex cursor-pointer"
            >
              <img className="w-[14px] mr-1" src={Images.edit} alt="" />
              <span className="text-[#1E1E1E] text-[14px] font-normal">
                Edit portfolio configuration
              </span>
            </div>

            <div
              onClick={() =>
                (window.location.href =
                  "/dashboard/portfolio-details/" + requestId)
              }
              className="flex mt-2 cursor-pointer"
            >
              <img className="w-[14px] mr-1" src={Images.openEye} alt="" />
              <span className="text-[#1E1E1E] text-[14px] font-normal">
                View portfolio
              </span>
            </div>
            <div
              onClick={() => setConfirmDelete(true)}
              className="flex mt-2 cursor-pointer"
            >
              <img className="w-[14px] mr-1" src={Images.deleteIcon} alt="" />
              <span className="text-[#1E1E1E] text-[14px] font-normal">
                Delete
              </span>
            </div>
          </div>
        </div>
      )}
      <div
        className={`flex items-center justify-between bg-[#f8f9fa] rounded-t-lg py-[10px] px-[12px] mt-6 ${
          location.pathname === "/dashboard"
            ? "max-w-[1260px]"
            : "max-w-[1160px]"
        } `}
      >
        <h1 className="text-[16px] font-semibold">Portfolios</h1>

        <div className="flex items-center gap-4">
          {location.pathname === "/dashboard" ? (
            <></>
          ) : (
            <div className="relative">
              <input
                type="text"
                placeholder="Search by portfolio name..."
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 text-sm h-[35px] min-w-[385px] pr-3 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
              />
              <img
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
          )}
          {location.pathname === "/dashboard" ? (
            <></>
          ) : (
            <>
              <Button
                text="New portfolio"
                onClick={() => setOpenCreatePortfolioModal(true)}
                className="bg-[#166E94] text-white px-4 py-2 rounded-lg min-w-[144px] min-h-[35px]"
              />
            </>
          )}
        </div>
        {showFilter && (
          <FilterTray
            closeFilter={() => setShowFilter(false)}
            onApply={handleApplyFilter}
            initialFilters={filters}
            clearFilters={handleClearFilters}
          />
        )}
      </div>
      <div
        className={`${
          location.pathname === "/dashboard"
            ? "max-w-[1260px]"
            : "max-w-[1160px]"
        }  h-[398px] border-[1px] border-[#F0F0F0] rounded-[11px]`}
      >
        {portfoliosQuery?.isFetching ? (
          <TableLoader />
        ) : (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <DataGrid
              columns={filteredColumns}
              rows={filteredData || []}
              className="rdg-light custom-grid"
            />
          </motion.div>
        )}
      </div>
    </>
  );
}

export default PortfolioMain;
