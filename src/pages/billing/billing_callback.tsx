import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { showToast } from "../../core/hooks/alert";

function BillingCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const reference = searchParams.get("reference");

    if (!reference) {
      showToast("Invalid payment reference", false);
      navigate("/billing-setup", { replace: true });
      return;
    }

    showToast(
      "Payment successful. Please proceed to login if you haven't",
      true,
    );

    setTimeout(() => {
      navigate("/dashboard", { replace: true });
    }, 1500);
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="px-8 py-10 text-center bg-white border rounded-xl">
        <h2 className="mb-2 text-lg font-semibold">Processing payment…</h2>
        <p className="text-sm text-gray-600">
          Please wait while we confirm your subscription.
        </p>
      </div>
    </div>
  );
}

export default BillingCallback;
