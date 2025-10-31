import React, { useState } from "react";
import Select from "react-select";
import { useLocation } from "react-router-dom";
import Button from "../../components/button/_component";

const SubscribePage = () => {
  const location = useLocation();
  const plan = location.state?.plan || {
    tier: "Plan title",
    annual_fee: "$2000.00",
  };

  const [paymentMethod, setPaymentMethod] = useState({
    label: "Card",
    value: "card",
  });
  const [network, setNetwork] = useState({ label: "MTN", value: "mtn" });
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [autoRenew, setAutoRenew] = useState(false);

  const paymentOptions = [
    { label: "Card", value: "card" },
    { label: "Mobile Money", value: "mobile-money" },
  ];

  const networkOptions = [
    { label: "MTN", value: "mtn" },
    { label: "Telecel", value: "telecel" },
  ];

  const handlePaymentChange = (option: any) => {
    setPaymentMethod(option);
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    setMobileNumber("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Payment method:", paymentMethod.value);
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-white sm:px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="mb-6 text-lg font-semibold text-gray-800">
          Subscribe to {plan.tier}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8">
          {/* === Payment form === */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Payment method
                </label>
                <Select
                  className="min-w-[280px]"
                  value={paymentMethod}
                  onChange={handlePaymentChange}
                  options={paymentOptions}
                  placeholder="Select payment method"
                />
              </div>

              {paymentMethod.value === "card" && (
                <>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Card number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="0000 0000 0000 0000"
                      className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-[#166E94]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        Expiry date
                      </label>
                      <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        placeholder="MM/YYYY"
                        className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-[#166E94]"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        CVV
                      </label>
                      <input
                        type="password"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="123"
                        className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-[#166E94]"
                      />
                    </div>
                  </div>
                </>
              )}

              {paymentMethod.value === "mobile-money" && (
                <>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Network
                    </label>
                    <Select
                      className="min-w-[280px]"
                      value={network}
                      onChange={(option) => {
                        if (option) setNetwork(option);
                      }}
                      options={networkOptions}
                      placeholder="Select network"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Mobile money number
                    </label>
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="0241234567"
                      className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-[#166E94]"
                    />
                  </div>
                </>
              )}

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={autoRenew}
                  onChange={(e) => setAutoRenew(e.target.checked)}
                  className="w-4 h-4 accent-[#166E94]"
                />
                <label className="text-sm text-gray-700">
                  Allow auto-renewal
                </label>
              </div>

              <Button
                text="Make payment"
                className="bg-[#166E94] text-white w-full"
                onClick={() => handleSubmit}
              />
            </form>
          </div>

          <div className="ml-8">
            <div className="p-5 border rounded-xl">
              <h3 className="text-sm font-medium text-gray-800 bg-[#F0F0F0] rounded-t-lg -mx-5 -mt-5 px-5 py-3">
                Summary
              </h3>

              <div className="divide-y">
                <div className="flex items-center justify-between py-3 text-sm">
                  <span className="text-gray-600">Plan title</span>
                  <span className="text-gray-800">{plan.tier}</span>
                </div>
                <div className="flex items-center justify-between py-3 text-sm">
                  <span className="text-gray-600">Plan amount</span>
                  <span className="text-gray-800">{plan.annual_fee}</span>
                </div>
                <div className="flex items-center justify-between py-3 text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-800">$100.00</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 mt-2 text-sm font-semibold">
                <span>Total</span>
                <span>
                  $
                  {(
                    parseFloat(plan.annual_fee.replace(/[^0-9.]/g, "")) + 100
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribePage;
