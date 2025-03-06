import { Images } from "../../../data/Assets";

function AdminVerification() {
  return (
    <>
      <h2 className=" mt-24 text-center text-[20px] font-extrabold text-[#166E94]">
        IFRS9Pro
      </h2>
      <div className="flex items-center justify-center">
        <div className="relative bg-white px-8 py-12 rounded-xl border-[1px] border-[#F0F0F0] w-96">
          <div className="absolute top-0 left-0 right-0 h-8 bg-gray-100 rounded-t-xl"></div>
          <div className="flex justify-center">
            <div>
              <img
                src={Images.security}
                className="w-[24px] m-auto h-[24px]"
                alt=""
              />
              <h3 className="text-center text-[18px] font-medium text-gray-800">
                Verify your email
              </h3>
              <p className="text-[14px] text-[#AFAFAF] mt-2 text-center">
                Your access request has been sent to{" "}
                <span className="text-[#166E94] font-medium">
                  username@email.com
                </span>{" "}
                You will receive an email once your request is approved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminVerification;
