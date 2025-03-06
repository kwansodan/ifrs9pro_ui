import { useEffect, useState } from "react";
import { Images } from "../../../data/Assets";
import Button from "../../../components/button/_component";

function SignUp() {
  const [firstNameValue, setFirstNameValue] = useState<string>("");
  const [lastNameValue, setLastNameValue] = useState<string>("");
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [password, setPassword] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const passwordToggle = () => {
    setPassword(!password);
  };

  useEffect(() => {
    setIsFormValid(
      emailValue.trim() !== "" &&
        passwordValue.trim() !== "" &&
        firstNameValue.trim() !== "" &&
        lastNameValue.trim() !== ""
    );
  }, [emailValue, passwordValue, firstNameValue, lastNameValue]);

  const handleLogin = () => {
    console.log("Logging in...");
  };
  return (
    <>
      <h2 className=" mt-24 text-center text-[20px] font-extrabold text-[#166E94]">
        IFRS9Pro
      </h2>
      <div className="flex items-center justify-center">
        <div>
          <div className="relative bg-white px-8 py-12 rounded-xl border-[1px] border-[#F0F0F0] w-96">
            <form action="">
              <div className="absolute top-0 left-0 right-0 h-8 bg-gray-100 rounded-t-xl"></div>

              <h3 className="text-left text-[18px] font-medium text-gray-800">
                Create your account
              </h3>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  className="w-full h-[4%] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
                  onChange={(e) => setFirstNameValue(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Last name"
                  name="last_name"
                  className="w-full h-[4%] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
                  onChange={(e) => setLastNameValue(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  name="email"
                  className="w-full h-[4%] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
                  onChange={(e) => setEmailValue(e.target.value)}
                />
              </div>
              <div className="relative mt-4">
                <input
                  type={password ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
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
              <Button
                className="mt-8"
                text="Signup"
                onClick={handleLogin}
                disabled={!isFormValid}
              />
            </form>
          </div>
          <div className="w-[400px] flex justify-center text-center">
            <small className="text-[#AFAFAF] m-auto text-center font-normal text-[12px]">
              By signing up, you agree to our
              <span className="ml-[4px] underline">Privacy Policy</span> and
              consent to GDPR-compliant data processing.
            </small>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
