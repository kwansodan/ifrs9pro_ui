import { useEffect, useState } from "react";
import {
  GetBillingPlans,
  InitializeBillingTransaction,
} from "../../core/services/auth.service";
import { showToast } from "../../core/hooks/alert";
import Button from "../../components/button/_component";
import { BillingPlan } from "../../core/interfaces";

function BillingSetup() {
  const [plans, setPlans] = useState<BillingPlan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await GetBillingPlans();
        setPlans(res?.data?.data ?? res?.data ?? []);
      } catch (err: any) {
        showToast(
          err?.response?.data?.detail ?? "Failed to load billing plans.",
          false
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleSubscribe = async () => {
    if (!selectedPlanId) return;

    setButtonLoading(true);

    try {
      const payload = {
        amount: 0,
        reference: `billing_${Date.now()}`,
        callback_url: `${window.location.origin}/billing/callback`,
        plan: selectedPlanId,
        metadata: {
          source: "billing_setup",
        },
      };

      const res = await InitializeBillingTransaction(payload);

      const authorizationUrl =
        res?.data?.data?.authorization_url || res?.data?.authorization_url;

      console.log("Authorization URL:", authorizationUrl);

      if (!authorizationUrl) {
        throw new Error("Payment authorization URL not returned");
      }

      window.location.href = authorizationUrl;
    } catch (err: any) {
      showToast(
        err?.response?.data?.detail ??
          err?.message ??
          "Failed to initialize payment",
        false
      );
    } finally {
      setButtonLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading billing plans...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen pt-24">
      <h2 className="text-[20px] font-extrabold text-[#166E94] mb-8">
        IFRS9Pro
      </h2>

      <div className="bg-white border rounded-xl px-8 py-10 w-[380px]">
        <h3 className="mb-6 font-semibold text-center">Subscription Options</h3>

        <div className="space-y-4">
          {plans.map((plan) => (
            <label
              key={plan.code}
              className="flex items-center gap-3 px-4 py-3 border rounded-lg cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedPlanId === plan.code}
                onChange={() => setSelectedPlanId(plan.code)}
              />
              <span className="text-sm">
                {plan.name}
                {plan.description && (
                  <span className="block text-xs text-gray-500">
                    {plan.description}
                  </span>
                )}
              </span>
            </label>
          ))}
        </div>

        <Button
          className={`mt-6 ${selectedPlanId ? "bg-[#166E94]" : "bg-[#D9EFF9]"}`}
          text="Subscribe"
          disabled={!selectedPlanId}
          isLoading={buttonLoading}
          onClick={handleSubscribe}
        />
      </div>
    </div>
  );
}

export default BillingSetup;
