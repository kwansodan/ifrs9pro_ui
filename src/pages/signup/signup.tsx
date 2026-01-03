import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import Button from "../../components/button/_component";
import { showToast } from "../../core/hooks/alert";
import { Option } from "../../core/interfaces";
import {
  ACCOUNTING_STANDARD_OPTIONS,
  COUNTRY_CURRENCY_OPTIONS,
  INDUSTRY_OPTIONS,
} from "../../data";
import {
  CreateBillingCustomer,
  RegisterTenant,
} from "../../core/services/auth.service";
import { cacheBillingToken } from "../../core/storage/billing";

function CreateCompanyAccount() {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState<Option | null>(null);
  const [countryCurrency, setCountryCurrency] = useState<Option | null>(null);
  const [accountingStandard, setAccountingStandard] = useState<Option | null>(
    null
  );
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptDpa, setAcceptDpa] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [password, setPassword] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    setIsFormValid(
      companyName.trim() !== "" &&
        industry !== null &&
        countryCurrency !== null &&
        accountingStandard !== null &&
        firstName.trim() !== "" &&
        lastName.trim() !== "" &&
        email.trim() !== "" &&
        phoneNumber.trim() !== "" &&
        jobRole.trim() !== "" &&
        password.trim() !== "" &&
        acceptTerms &&
        acceptDpa
    );
  }, [
    companyName,
    industry,
    countryCurrency,
    accountingStandard,
    firstName,
    lastName,
    email,
    phoneNumber,
    jobRole,
    password,
    acceptTerms,
    acceptDpa,
  ]);

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setButtonLoading(true);

    const payload = {
      company_name: companyName,
      industry: industry?.value as string,
      country: countryCurrency?.value as string,
      preferred_accounting_standard: accountingStandard?.value as string,
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phoneNumber,
      job_role: jobRole,
      password,
      tnd: acceptTerms,
      dpa: acceptDpa,
    };

    try {
      const registerResponse = await RegisterTenant(payload);

      const billingToken = registerResponse?.data?.billing_token;

      if (!billingToken) {
        showToast("Billing token missing from response", false);
        return;
      }

      cacheBillingToken(billingToken);

      const billingResponse = await CreateBillingCustomer(billingToken);

      if (billingResponse.status !== 200 && billingResponse.status !== 201) {
        showToast("Billing customer creation failed", false);
        return;
      }

      showToast("Company account created successfully", true);
      navigate("/billing-setup");
    } catch (err: any) {
      showToast(
        err?.response?.data?.detail?.[0]?.msg ??
          err?.response?.data?.detail ??
          "Failed to create company account. Please try again.",
        false
      );
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <>
      <h2 className="mt-12 text-center text-[20px] font-extrabold text-[#166E94]">
        IFRS9Pro
      </h2>

      <div className="flex items-center justify-center">
        <div className="relative bg-white px-8 py-12 rounded-xl border border-[#F0F0F0] w-[420px]">
          <div className="absolute top-0 left-0 right-0 h-8 bg-gray-100 rounded-t-xl" />

          <h3 className="text-center text-[14px] font-semibold text-gray-800">
            Create company account
          </h3>

          <div className="mt-6">
            <input
              type="text"
              placeholder="Company name"
              className="w-full text-[14px] px-4 py-2 border border-gray-300 rounded-lg"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <Select
              options={INDUSTRY_OPTIONS}
              value={industry}
              onChange={(option) => setIndustry(option)}
              placeholder="Industry"
            />
          </div>

          <div className="mt-4">
            <Select
              options={COUNTRY_CURRENCY_OPTIONS}
              value={countryCurrency}
              onChange={(option) => setCountryCurrency(option)}
              placeholder="Country"
            />
          </div>

          <div className="mt-4">
            <Select
              options={ACCOUNTING_STANDARD_OPTIONS}
              value={accountingStandard}
              onChange={(option) => setAccountingStandard(option)}
              placeholder="Preferred Accounting Standard"
            />
          </div>

          {/* User Info */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <input
              type="text"
              placeholder="First name"
              className="text-[14px] px-4 py-2 border rounded-lg"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Last name"
              className="text-[14px] px-4 py-2 border rounded-lg"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full text-[14px] px-4 py-2 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <input
              type="text"
              placeholder="Phone number"
              className="w-full text-[14px] px-4 py-2 border rounded-lg"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <input
              type="text"
              placeholder="Job role"
              className="w-full text-[14px] px-4 py-2 border rounded-lg"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full text-[14px] px-4 py-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1"
              />
              <span>
                I accept{" "}
                <a
                  href="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#166E94] underline"
                >
                  Terms & Conditions
                </a>
              </span>
            </label>

            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptDpa}
                onChange={(e) => setAcceptDpa(e.target.checked)}
                className="mt-1"
              />
              <span>
                I accept{" "}
                <a
                  href="/data-processing-agreement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#166E94] underline"
                >
                  Data Processing Agreement
                </a>
              </span>
            </label>
          </div>

          <Button
            className={`mt-8 ${isFormValid ? "bg-[#166E94]" : "bg-[#D9EFF9]"}`}
            text="Continue"
            disabled={!isFormValid}
            isLoading={buttonLoading}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </>
  );
}

export default CreateCompanyAccount;
