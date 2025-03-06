import Button from "../button/_component";
function SecondStep({ close }: any) {
  return (
    <div className="bg-white min-w-[500px] rounded-[20px]">
      <form action="">
        <div className="p-8 ">
          <div className="mt-3">
            <label>Credit risk reserve</label>
            <input
              type="name"
              placeholder="B5938492"
              className="w-full h-[4%] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
            />
          </div>
          <div className="mt-3">
            <label>Loan assets</label>
            <input
              type="name"
              placeholder="A000567"
              className="w-full h-[4%] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
            />
          </div>
          <div className="mt-3">
            <label>ECL impairment account</label>
            <input
              type="name"
              placeholder="C98342432"
              className="w-full h-[4%] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
            />
          </div>
        </div>
        <hr />
        <div className="flex justify-end p-2">
          <Button
            text="Cancel"
            onClick={() => close()}
            className="bg-white !py-0 mr-3 border-[1px] border-[#6F6F6F] font-normal mt-3 text-[#6F6F6F] text-[12px] !rounded-[10px] !w-[90px] "
          />
          <Button
            text="Create"
            //   onClick={() => {
            //     setOpenSecondStepCreatePortfolio(true);
            //   }}
            className="bg-[#166E94] font-normal mt-3 text-white text-[12px] !rounded-[10px] !w-[90px] "
          />
        </div>
      </form>
    </div>
  );
}

export default SecondStep;
