import { useParams } from "react-router-dom";
import { Images } from "../../data/Assets";
import { usePorfolioReports } from "../../core/hooks/portfolio";
import moment from "moment";
import { renderReportLabel } from "../../core/utility";

function YesReport() {
  const { id } = useParams();

  const { portfoliosReportsQuery } = usePorfolioReports(Number(id));
  console.log(
    "aaa: ",
    portfoliosReportsQuery &&
      portfoliosReportsQuery.data &&
      portfoliosReportsQuery.data.data &&
      portfoliosReportsQuery.data.data.items
  );

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
                  {moment(report.report_date).format("LLL")}
                </span>
                <span className="flex-1 text-gray-700">
                  {renderReportLabel(report.report_type)}
                </span>
                <a
                  href={report.link}
                  className="flex items-center text-[#166E94] hover:underline"
                >
                  <img
                    title="download report"
                    className="w-[14px] h-[14px] mr-1 mt-1"
                    src={Images.report_download}
                    alt=""
                  />
                  Download report
                </a>
              </div>
            )
          )}
      </div>
    </div>
  );
}

export default YesReport;
