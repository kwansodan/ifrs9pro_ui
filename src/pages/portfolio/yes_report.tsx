import { useParams } from "react-router-dom";
import { Images } from "../../data/Assets";
import { usePorfolioReports } from "../../core/hooks/portfolio";
import moment from "moment";
import { renderReportLabel } from "../../core/utility";
import {
  DeleteReport,
  DownloadReportHistory,
} from "../../core/services/portfolio.service";
import { showToast } from "../../core/hooks/alert";
import { useState } from "react";
import { Modal } from "../../components/modal/_component";
import Button from "../../components/button/_component";

function YesReport() {
  const { id } = useParams();
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { portfoliosReportsQuery } = usePorfolioReports(Number(id));

  const handleDownload = (id: string) => {
    setDownloadingId(id);
    downloadDocument(id);
    setDownloadingId(null);
  };

  const downloadDocument = (rid: string) => {
    setDownloadingId(rid);

    DownloadReportHistory(Number(id), rid)
      .then((res) => {
        const blob = new Blob([res.data], {
          type: res.headers["content-type"],
        });

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `report_${rid}.xlsx`;
        document.body.appendChild(link);
        link.click();

        link.remove();
        window.URL.revokeObjectURL(url);

        setDownloadingId(null);
      })
      .catch((err) => {
        setDownloadingId(null);
        showToast(err?.response?.data?.detail ?? "Download failed", false);
      });
  };

  const handleDelete = () => {
    setIsDeleting(true);
    if (deleteId) {
      DeleteReport(Number(id), deleteId)
        .then(() => {
          portfoliosReportsQuery.refetch();
          setConfirmDelete(false);
          setIsDeleting(false);
        })
        .catch((err) => {
          setIsDeleting(false);
          showToast(err?.response?.data?.detail ?? "Delete failed", false);
        });
    }
  };

  return (
    <>
      <Modal
        open={confirmDelete}
        showClose={false}
        close={() => setConfirmDelete(false)}
      >
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-lg font-semibold">Delete Report</h2>
          <p className="mb-4 text-sm text-gray-700">
            Are you sure you want to delete this report? This action cannot be
            undone.
          </p>
          <div className="!flex !justify-end">
            <Button
              onClick={() => setConfirmDelete(false)}
              text="Cancel"
              className="!w-24 !bg-white !border-2"
            />
            <Button
              onClick={() => handleDelete()}
              text="Delete"
              isLoading={isDeleting}
              className="!w-24 !text-white bg-red-500 !ml-4"
            />
          </div>
        </div>
      </Modal>
      <div className="p-4 rounded-lg bg-gray-50">
        <h2 className="mb-2 text-lg font-semibold">Report history</h2>
        <div className="p-4 overflow-y-scroll bg-white rounded-lg shadow max-h-80">
          {portfoliosReportsQuery &&
            portfoliosReportsQuery.data &&
            portfoliosReportsQuery.data.data &&
            portfoliosReportsQuery.data.data.items.map(
              (report: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-[15px] py-3 border-b last:border-b-0"
                >
                  <span className="w-1/4 text-gray-600">
                    {moment(report.report_date).format("LL")}
                  </span>
                  <span className="flex-1 text-gray-700">
                    {renderReportLabel(report.report_type)}
                  </span>
                  <div key={report.id}>
                    <div
                      onClick={() => {
                        setDownloadingId(report.id);
                        handleDownload(report.id);
                      }}
                      className="flex items-center cursor-pointer text-[#166E94] hover:underline"
                    >
                      <img
                        title="download report"
                        className="w-[14px] h-[14px] mr-1 mt-1"
                        src={Images.report_download}
                        alt=""
                      />
                      {downloadingId === report.id ? (
                        <span className="animate-bounce">Downloading</span>
                      ) : (
                        "Download report"
                      )}
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      setConfirmDelete(true);
                      setDeleteId(report.id);
                    }}
                    className="flex items-center ml-4 cursor-pointer"
                  >
                    <img
                      title="delete report"
                      className="w-[14px] h-[14px] mr-1 mt-1 cursor-pointer"
                      src={Images.deleteIcon}
                      alt=""
                    />
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </>
  );
}

export default YesReport;
