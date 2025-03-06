import { Images } from "../../data/Assets";

function NoReport() {
  return (
    <>
      <div>
        <img
          className="mx-auto mb-4 w-[37px] h-[37px]"
          src={Images.pie}
          alt=""
        />
        <h3 className="text-[18px] font-semibold">No reports yet</h3>
        <p className="text-sm text-[#6F6F6F] w-[200px] m-auto">
          Upload your first data to start generating reports
        </p>
      </div>
    </>
  );
}

export default NoReport;
