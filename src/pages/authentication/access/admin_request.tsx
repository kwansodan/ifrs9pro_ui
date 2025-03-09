import { useActionState, useEffect, useState } from "react";
import Button from "../../../components/button/_component";
import {
  UserSendRequestToAdmin,
  VerifyUserEmail,
} from "../../../core/services/auth.service";
import { useNavigate, useSearchParams } from "react-router-dom";
import { showToast } from "../../../core/hooks/alert";
import PageLoader from "../../../components/page_loader/_component";

function AdminRequest() {
  const [verifyDone, setVerifyDone] = useState(false);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const u_email = searchParams.get("email") as string;
  const token = searchParams.get("token") as string;

  useEffect(() => {
    VerifyUserEmail(token)
      .then((res) => {
        setVerifyDone(true);
        console.log("veriRes: ", res);
        setMessage(res.data.message);
      })
      .catch((error) => {
        showToast(error?.response.data.detail, false);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      });
  }, [token]);
  const [emailValue, setEmailValue] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(emailValue.trim() !== "");
  }, [emailValue]);

  useEffect(() => {
    if (verifyDone) {
      showToast(message, true);
    }
  }, [verifyDone]);

  const handleRequestAccess = async (prevState: any, formData: FormData) => {
    setButtonLoading(true);
    console.log("prev: ", prevState);
    const admin_email = formData.get("admin_email") as string;
    localStorage.setItem("admin-email", admin_email);
    if (!admin_email) {
      setButtonLoading(false);
      showToast("Please enter admin email.", false);
      return { success: false, error: "Email and password are required." };
    }
    try {
      UserSendRequestToAdmin(u_email, admin_email)
        .then((res) => {
          console.log(res);
          setButtonLoading(false);
          navigate("/admin-verification");
        })
        .catch((err) => {
          setButtonLoading(false);
          showToast(err?.response?.data.detail, false);
        });

      return { success: true };
    } catch (err) {
      console.error("Failed to login:", err);
      setButtonLoading(false);
      return { success: false, error: "Login failed. Please try again." };
    }
  };
  const [state, formAction] = useActionState(handleRequestAccess, null);
  console.log("state: ", state);
  return (
    <>
      {!verifyDone && <PageLoader loadingHeader={"Verifying..."} />}

      {verifyDone && (
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
                    name="admin_email"
                    placeholder="Enter admin email address"
                    className="w-full h-[4%] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
                    onChange={(e) => setEmailValue(e.target.value)}
                  />
                </div>

                <Button
                  className="mt-8 text-white"
                  type="submit"
                  text="Submit"
                  disabled={!isFormValid}
                  isLoading={buttonLoading}
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
