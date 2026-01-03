import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/button/_component";
import { ForgotPasswordRequest } from "../../../core/services/auth.service";
import { showToast } from "../../../core/hooks/alert";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFormValid(email.trim() !== "" && email.trim() !== "");
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      showToast("Email is required", false);
      return;
    }

    try {
      setLoading(true);
      const res = await ForgotPasswordRequest(email);
      showToast(res.data.message || "Reset link sent to email", true);
      navigate("/login");
    } catch (err: any) {
      showToast(err?.response?.data?.detail || "Request failed", false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="mt-24 text-center text-[20px] font-extrabold text-[#166E94]">
        IFRS9Pro
      </h2>

      <div className="flex items-center justify-center">
        <div className="px-8 py-12 bg-white border rounded-xl w-96">
          <form onSubmit={handleSubmit}>
            <h3 className="text-center text-[14px] font-medium text-gray-800">
              Enter your email to reset password
            </h3>

            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-2 mt-4 border rounded-lg text-[14px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              type="submit"
              text="Send reset link"
              className={`mt-4 bg-[#166E94] ${
                isFormValid ? "bg-[#166E94]" : "bg-[#D9EFF9]"
              }`}
              isLoading={loading}
              disabled={!isFormValid}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
