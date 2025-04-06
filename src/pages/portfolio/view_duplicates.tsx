import { useParams } from "react-router-dom";
import Button from "../../components/button/_component";
import { useQualityIssues } from "../../core/hooks/portfolio";
import { DownloadQualityIssuesReport } from "../../core/services/portfolio.service";
import { showToast } from "../../core/hooks/alert";
import { useState } from "react";

function ViewDuplicate({ selectedIssueId, affected_records }: any) {
  const { id } = useParams();
  const [downloading, setIsDownloading] = useState<boolean>(false);
  const { qualityIssuesQuery } = useQualityIssues(Number(id));
  const actualIssues =
    qualityIssuesQuery &&
    qualityIssuesQuery.data &&
    qualityIssuesQuery.data.data &&
    qualityIssuesQuery.data.data;

  const downloadIssueReport = () => {
    setIsDownloading(true);
    if (selectedIssueId) {
      DownloadQualityIssuesReport(Number(id), selectedIssueId)
        .then((res) => {
          setIsDownloading(false);
          const blob = new Blob([res.data]);

          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `report_${selectedIssueId}.xlsx`;
          document.body.appendChild(link);
          link.click();

          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        })
        .catch((err) => {
          setIsDownloading(false);
          showToast(
            err?.response?.data.detail ?? "Download failed, please try again.",
            false
          );
        });
    } else {
      setIsDownloading(false);
      showToast("No issue selected", false);
    }
  };
  console.log("affected_records: ", actualIssues && actualIssues);
  return (
    <>
      <div className="mt-8 bg-white w-[32rem] border rounded-lg text-[14px] shadow-sm">
        {affected_records &&
          affected_records?.map((issue: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border-b last:border-0"
            >
              <span className={`text-gray-700 font-semibold`}>
                {issue?.name ?? "N/A"}
              </span>
              <div className="flex items-center space-x-4">
                <span className="font-semibold">
                  {affected_records && affected_records?.length}
                </span>
              </div>
            </div>
          ))}
      </div>

      <div className="flex justify-end mt-3">
        <Button
          text={"Download report"}
          onClick={downloadIssueReport}
          isLoading={downloading}
          className="!text-center gap-2 py-2 font-normal !text-[14px] text-white !max-w-[160px] bg-[#166E94]"
        />
      </div>
    </>
  );
}

export default ViewDuplicate;
