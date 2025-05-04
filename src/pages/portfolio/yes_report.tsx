import { useParams } from "react-router-dom";
import { Images } from "../../data/Assets";
import { usePorfolioReports } from "../../core/hooks/portfolio";
import moment from "moment";
import { renderReportLabel } from "../../core/utility";
import { DownloadReportHistory } from "../../core/services/portfolio.service";
import { showToast } from "../../core/hooks/alert";
import { useState } from "react";

function YesReport() {
  const { id } = useParams();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const { portfoliosReportsQuery } = usePorfolioReports(Number(id));

  const handleDownload = (id: string) => {
    setDownloadingId(id);
    downloadDocument(id);
    setDownloadingId(null);
  };

  const downloadDocument = (rid: any) => {
    if (rid) {
      setDownloadingId(rid);
      DownloadReportHistory(Number(id), rid)
        .then((res) => {
          const blob = new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel MIME type
          });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `report_${rid}.xlsx`;
          document.body.appendChild(link);
          link.click();

          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          setDownloadingId(null);
        })
        .catch((err) => {
          setDownloadingId(null);
          showToast(err?.response?.data?.detail ?? "Download failed", false);
        });
    }
  };

  return (
    <div className="p-4 rounded-lg bg-gray-50">
      <h2 className="mb-2 text-lg font-semibold">Report history</h2>
      <div className="p-4 bg-white rounded-lg shadow">
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
              </div>
            )
          )}
      </div>
    </div>
  );
}

export default YesReport;
