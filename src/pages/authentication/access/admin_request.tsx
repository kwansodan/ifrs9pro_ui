import { useActionState, useEffect, useState } from "react";
import Button from "../../../components/button/_component";
import {
  UserSendRequestToAdmin,
  VerifyUserEmail,
} from "../../../core/services/auth.service";
import { useNavigate } from "react-router-dom";

function AdminRequest() {
  const queryParams = new URLSearchParams(location.search);
  const [verifyDone, setVerifyDone] = useState(false);

  const navigate = useNavigate();

  const verificationKey = queryParams.get("vk") as string;
  console.log("vk: ", verificationKey);

  useEffect(() => {
    VerifyUserEmail(verificationKey)
      .then(() => {
        setVerifyDone(true);
      })
      .catch((error) => {
        console.log("veriErr: ", error);
      });
  }, []);
  const [emailValue, setEmailValue] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(emailValue.trim() !== "");
  }, [emailValue]);

  const handleRequestAccess = async (prevState: any, formData: FormData) => {
    console.log("prev: ", prevState);
    const admin_email = formData.get("email") as string | null;
    if (!admin_email) {
      console.error("Admin email is required.");
      return { success: false, error: "Email and password are required." };
    }
    const user_email = localStorage.getItem("u_email") as string;
    try {
      const res = await UserSendRequestToAdmin(user_email, admin_email);
      console.log(res);
      if (res) navigate("/admin-verification");

      return { success: true };
    } catch (err) {
      console.error("Failed to login:", err);
      return { success: false, error: "Login failed. Please try again." };
    }
  };
  const [state, formAction] = useActionState(handleRequestAccess, null);
  console.log("state: ", state);
  return (
    <>
      {/* {!verifyDone && <PageLoader />} */}
      {!verifyDone && (
        <>
          <h2 className=" mt-24 text-center text-[20px] font-extrabold text-[#166E94]">
            IFRS9Pro
          </h2>
          <div className="flex items-center justify-center">
            <div className="relative bg-white px-8 py-12 rounded-xl border-[1px] border-[#F0F0F0] w-96">
              <form action={formAction}>
                <div className="absolute top-0 left-0 right-0 h-8 bg-gray-100 rounded-t-xl"></div>

                <h3 className="text-left text-[18px] font-medium text-gray-800">
                  Send request to admin
                </h3>
                <div className="mt-4">
                  <input
                    type="email"
                    placeholder="Enter admin email address"
                    className="w-full h-[4%] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
                    onChange={(e) => setEmailValue(e.target.value)}
                  />
                </div>

                <Button
                  className="mt-8 text-white"
                  type="submit"
                  text="Submit"
                  // onClick={handleLogin}
                  disabled={isFormValid}
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AdminRequest;
