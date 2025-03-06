import { Images } from "../../data/Assets";

function YesReport() {
  const reports = [
    { date: "Jan 24, 2025", summary: "Summary of collateral data", link: "#" },
    { date: "Jan 24, 2025", summary: "Summary of Interest rates", link: "#" },
    { date: "Jan 24, 2025", summary: "Summary of collateral data", link: "#" },
  ];
  return (
    <div className="p-4 rounded-lg bg-gray-50">
      <h2 className="mb-2 text-lg font-semibold">Report history</h2>
      <div className="p-4 bg-white rounded-lg shadow">
        {reports.map((report, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-[15px] py-3 border-b last:border-b-0"
          >
            <span className="w-1/4 text-gray-600">{report.date}</span>
            <span className="flex-1 text-gray-700">{report.summary}</span>
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
        ))}
      </div>
    </div>
  );
}

export default YesReport;
