import Button from "../../components/button/_component";

function ViewDuplicate({ affected_records }: any) {
  console.log("affected_records: ", affected_records && affected_records);
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
                {issue?.name}
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
          className="!text-center gap-2 py-2 font-normal !text-[14px] text-white !max-w-[160px] bg-[#166E94]"
        />
      </div>
    </>
  );
}

export default ViewDuplicate;
