import Button from "../../components/button/_component";

function ViewDuplicate() {
  const issues = [
    { name: "Name", appearance: "Number of appearance" },
    { name: "Duplicate names", appearance: "2 times" },
    { name: "Duplicate address", appearance: "2 times" },
    { name: "Missing repayment history", appearance: "2 times" },
  ];
  return (
    <>
      <div className="mt-8 bg-white border rounded-lg text-[14px] shadow-sm">
        {issues.map((issue, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border-b last:border-0"
          >
            <span
              className={`text-gray-700 ${
                issue.name === "Name" ? "font-semibold" : ""
              }`}
            >
              {issue.name}
            </span>
            <div className="flex items-center space-x-4">
              <span
                className={`${
                  issue.appearance === "Number of appearance"
                    ? "font-semibold"
                    : ""
                }`}
              >
                {issue.appearance}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-3">
        <Button
          text={"Download report"}
          className="!text-center gap-2 py-2 font-normal !text-[14px] text-white !max-w-[160px] bg-[#166E94]"
        />
      </div>
    </>
  );
}

export default ViewDuplicate;
