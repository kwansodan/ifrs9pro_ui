import { useActionState, useEffect, useState } from "react";
import Button from "../../../components/button/_component";
import { UserRequestAccess } from "../../../core/services/auth.service";
import { useNavigate } from "react-router-dom";

function RequestAccess() {
  const [emailValue, setEmailValue] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  const handleRequestAccess = async (prevState: any, formData: FormData) => {
    console.log("prev: ", prevState);
    const email = formData.get("email") as string | null;
    if (!email) {
      console.error("Email is required.");
      return { success: false, error: "Email and password are required." };
    }

    try {
      localStorage.setItem("u_email", email);
      const res = await UserRequestAccess(email);
      console.log(res);
      if (res) navigate("/verification");

      return { success: true };
    } catch (err) {
      console.error("Failed to login:", err);
      return { success: false, error: "Login failed. Please try again." };
    }
  };
  const [state, formAction] = useActionState(handleRequestAccess, null);
  console.log("state: ", state);
  useEffect(() => {
    setIsFormValid(emailValue.trim() !== "");
  }, [emailValue]);

  return (
    <>
      <h2 className=" mt-24 text-center text-[20px] font-extrabold text-[#166E94]">
        IFRS9Pro
      </h2>
      <div className="flex items-center justify-center">
        <div className="relative bg-white px-8 py-12 rounded-xl border-[1px] border-[#F0F0F0] w-96">
          <form action={formAction}>
            <div className="absolute top-0 left-0 right-0 h-8 bg-gray-100 rounded-t-xl"></div>

            <h3 className="text-left text-[18px] font-medium text-gray-800">
              Request access
            </h3>
            <div className="mt-4">
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="w-full h-[4%] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
                onChange={(e) => setEmailValue(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="mt-8 text-white"
              text="Request access"
              onClick={() => handleRequestAccess}
              disabled={isFormValid}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default RequestAccess;
