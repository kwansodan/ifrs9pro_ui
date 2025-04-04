import { useEffect, useRef, useState } from "react";
import { DataGrid } from "react-data-grid";
import { Images } from "../../data/Assets";
import FilterTray from "../../components/filter_tray/_component";
import Button from "../../components/button/_component";
import { Modal } from "../../components/modal/_component";
import ShareFeedback from "./share_feedback";
import { useFeedback } from "../../core/hooks/feedback";
import EditFeedback from "./edit_feedback";
import DeleteFeedback from "./delete_feedback";
import { renderFeedbackStatusColors } from "../../core/utility";
import TableLoader from "../../components/table_loader/component";
import { LikeFeedback } from "../../core/services/feedback.service";
import { showToast } from "../../core/hooks/alert";

function Feedback() {
  const { feedbackQuery } = useFeedback();
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [likeFeedbacks, setLikeFeedbacks] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openCreateFeedbackModal, setOpenCreateFeedbackModal] =
    useState<boolean>(false);
  const [feedBackId, setFeedbackId] = useState<number>(0);
  const [query, setQuery] = useState("");
  const [showActionsMenu, setShowActionsMenu] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);
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

  const triggerFeedbackLike = (id: any) => {
    setLikeFeedbacks(true);
    try {
      LikeFeedback(id)
        .then((res) => {
          console.log("res: ", res);
        })
        .catch((err) => {
          setLikeFeedbacks(false);
          showToast(err?.response?.data.detail, false);
        });
    } catch (error) {
      setLikeFeedbacks(false);
      showToast("Action failed. Please try again", false);
    }
  };

  const renderActionsRow = (data: any) => {
    const { is_creator, id, is_liked_by_user } = data.row;

    setFeedbackId(data.row.id);
    return (
      <div className="flex cursor-pointer">
        {is_creator ? (
          <img
            onClick={() => setShowActionsMenu(!showActionsMenu)}
            src={Images.options}
            className="w-[24px]"
            alt=""
          />
        ) : (
          <img
            onClick={() => triggerFeedbackLike(id)}
            src={
              likeFeedbacks || is_liked_by_user ? Images.like : Images.unlike
            }
            className="w-[18px]"
            alt=""
          />
        )}
      </div>
    );
  };

  const renderNameRow = (data: any) => {
    const { description } = data.row;
    return <div className="flex cursor-pointer">{description}</div>;
  };

  const renderStatusRow = (data: any) => {
    const { status } = data.row;
    return (
      <div
        className={`flex cursor-pointer ${renderFeedbackStatusColors(status)}`}
      >
        {status}
      </div>
    );
  };

  const columns = [
    { key: "name", name: "Feedback", width: 700, renderCell: renderNameRow },
    { key: "status", name: "Status", width: 240, renderCell: renderStatusRow },
    { key: "like", name: "Action", renderCell: renderActionsRow, width: 100 },
  ];

  const filteredData =
    feedbackQuery &&
    feedbackQuery.data &&
    feedbackQuery.data.data?.filter((e: any) => {
      if (query === "") return e.status;
      else if (e?.status?.toLowerCase().includes(query.toLocaleLowerCase()))
        return e;
    });

  return (
    <>
      <Modal
        close={() => setOpenCreateFeedbackModal(false)}
        open={openCreateFeedbackModal}
        modalHeader="Share feedback"
      >
        <ShareFeedback cancel={() => setOpenCreateFeedbackModal(false)} />
      </Modal>
      <Modal
        close={() => setOpenEditModal(false)}
        open={openEditModal}
        modalHeader="Edit feedback"
      >
        <EditFeedback
          close={() => setOpenEditModal(false)}
          rowId={feedBackId}
        />
      </Modal>
      <Modal
        close={() => setOpenDeleteModal(false)}
        open={openDeleteModal}
        modalHeader="Share feedback"
      >
        <DeleteFeedback
          close={() => setOpenDeleteModal(false)}
          rowId={feedBackId}
        />
      </Modal>

      {showActionsMenu && (
        <div
          ref={menuRef}
          className="absolute z-10 top-[15rem] right-[20rem] w-[200px] bg-white rounded-[10px] shadow-md"
        >
          <div className="p-4">
            <div
              onClick={() => {
                setOpenEditModal(true);
              }}
              className="flex items-center cursor-pointer"
            >
              <img className="w-[14px] mr-1" src={Images.edit} alt="" />
              <span className="text-[#1E1E1E] text-[14px] font-normal">
                Edit feedback
              </span>
            </div>

            <div
              onClick={() => {
                setOpenDeleteModal(true);
              }}
              className="flex items-center mt-2 cursor-pointer"
            >
              <img className="w-[14px] mr-1" src={Images.deleteIcon} alt="" />
              <span className="text-[#FF3B30] text-[14px] font-normal">
                Delete feedback
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between bg-[#f8f9fa] rounded-t-lg py-[10px] px-[12px] mt-6 max-w-[1160px]">
        <h1 className="text-[16px] font-semibold">Feedbacks</h1>

        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by status..."
              className="pl-10 h-[35px] min-w-[385px] pr-3 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
            />
            <img
              onClick={() => setShowFilter(!showFilter)}
              className="w-[13px] h-[13px] absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              src={Images.search}
              alt=""
            />
          </div>
          <Button
            text="Add new feedback"
            onClick={() => setOpenCreateFeedbackModal(true)}
            className="bg-[#166E94] text-white px-4 py-2 rounded-lg min-w-[150px]"
          />
        </div>

        {showFilter && <FilterTray closeFilter={() => setShowFilter(false)} />}
      </div>
      <div className="max-w-[1160px] h-[398px] border-[1px] border-[#F0F0F0] rounded-[11px]">
        {feedbackQuery?.isLoading ? (
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
    </>
  );
}

export default Feedback;
