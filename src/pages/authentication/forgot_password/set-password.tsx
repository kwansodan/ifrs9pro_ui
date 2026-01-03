import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../../components/button/_component";
import { ResetPasswordRequest } from "../../../core/services/auth.service";
import { showToast } from "../../../core/hooks/alert";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(password.trim() !== "" && confirmPassword.trim() !== "");
  }, [password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      showToast("Invalid or missing reset token", false);
      return;
    }

    if (!password || !confirmPassword) {
      showToast("All fields are required", false);
      return;
    }

    if (password !== confirmPassword) {
      showToast("Passwords do not match", false);
      return;
    }

    try {
      setLoading(true);
      const res = await ResetPasswordRequest(token, password, confirmPassword);

      showToast(res.data.message || "Password reset successful", true);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err: any) {
      showToast(err?.response?.data?.detail || "Password reset failed", false);
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
              Reset Password
            </h3>

            <input
              type="password"
              placeholder="New password"
              className="w-full px-4 py-2 mt-4 border rounded-lg text-[14px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm password"
              className="w-full px-4 py-2 mt-4 text-[14px] border rounded-lg"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button
              type="submit"
              text="Reset password"
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

export default ResetPassword;
