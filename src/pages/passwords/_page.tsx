import { useEffect, useState } from "react";
import { Images } from "../../data/Assets";
import Button from "../../components/button/_component";

function PasswordChange() {
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [newPasswordValue, setNewPasswordValue] = useState<string>("");
  const [password, setPassword] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const passwordToggle = () => {
    setPassword(!password);
  };

  const newPasswordToggle = () => {
    setNewPassword(!newPassword);
  };

  useEffect(() => {
    setIsFormValid(
      passwordValue.trim() !== "" && newPasswordValue.trim() !== ""
    );
  }, [passwordValue, newPasswordValue]);

  const handleLogin = () => {
    console.log("Logging in...");
  };
  return (
    <>
      <h2 className=" mt-24 text-center text-[20px] font-extrabold text-[#166E94]">
        IFRS9Pro
      </h2>
      <div className="flex items-center justify-center">
        <div className="relative bg-white px-8 py-12 rounded-xl border-[1px] border-[#F0F0F0] w-96">
          <form action="">
            <div className="absolute top-0 left-0 right-0 h-8 bg-gray-100 rounded-t-xl"></div>

            <h3 className="text-left text-[18px] font-medium text-gray-800">
              Log into your account
            </h3>
            <div className="relative mt-4">
              <input
                type={password ? "text" : "password"}
                placeholder="Create password"
                className="w-full h-[4%] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
                onChange={(e) => setPasswordValue(e.target.value)}
              />
              <span
                onClick={() => passwordToggle()}
                className="absolute text-gray-500 cursor-pointer top-3 right-4"
              >
                {password ? (
                  <img className="w-5" src={Images.closedEye} />
                ) : (
                  <img className="w-5" src={Images.openEye} />
                )}
              </span>
            </div>
            <div className="relative mt-4">
              <input
                type={newPassword ? "text" : "password"}
                placeholder="Cofirm password"
                className="w-full h-[4%] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
                onChange={(e) => setNewPasswordValue(e.target.value)}
              />
              <span
                onClick={() => newPasswordToggle()}
                className="absolute text-gray-500 cursor-pointer top-3 right-4"
              >
                {newPassword ? (
                  <img className="w-5" src={Images.closedEye} />
                ) : (
                  <img className="w-5" src={Images.openEye} />
                )}
              </span>
            </div>
            <Button
              className="mt-8 text-white"
              text="Set password"
              onClick={handleLogin}
              disabled={!isFormValid}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default PasswordChange;
