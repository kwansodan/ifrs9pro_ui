import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../core/hooks/alert";
import Button from "../../components/button/_component";
import Select from "react-select";
import { Option } from "../../core/interfaces";
import {
  ACCOUNTING_STANDARD_OPTIONS,
  COUNTRY_CURRENCY_OPTIONS,
  INDUSTRY_OPTIONS,
} from "../../data";

function CreateCompanyAccount() {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [companySize, setCompanySize] = useState("");

  const [industry, setIndustry] = useState<Option | null>(null);
  const [countryCurrency, setCountryCurrency] = useState<Option | null>(null);
  const [accountingStandard, setAccountingStandard] = useState<Option | null>(
    null
  );

  const [isFormValid, setIsFormValid] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    setIsFormValid(
      companyName.trim() !== "" &&
        companySize.trim() !== "" &&
        industry !== null &&
        countryCurrency !== null &&
        accountingStandard !== null
    );
  }, [companyName, companySize, industry, countryCurrency, accountingStandard]);

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setButtonLoading(true);

    try {
      const payload = {
        companyName,
        companySize,
        industry: industry?.value,
        countryCurrency: countryCurrency?.value,
        accountingStandard: accountingStandard?.value,
      };

      console.log("Create company payload:", payload);

      // TODO: wire backend service
      // await CreateCompanyAccountService(payload);

      showToast("Company account created successfully", true);
      navigate("/dashboard");
    } catch (error) {
      showToast("Failed to create company account", false);
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <>
      <h2 className="mt-24 text-center text-[20px] font-extrabold text-[#166E94]">
        IFRS9Pro
      </h2>

      <div className="flex items-center justify-center">
        <div className="relative bg-white px-8 py-12 rounded-xl border border-[#F0F0F0] w-96">
          <div className="absolute top-0 left-0 right-0 h-8 bg-gray-100 rounded-t-xl" />

          <h3 className="text-center text-[18px] font-medium text-gray-800">
            Create company account
          </h3>

          <div className="mt-6">
            <input
              type="text"
              placeholder="Enter company name"
              className="w-full text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <Select
              className="text-[14px]"
              options={INDUSTRY_OPTIONS}
              value={industry}
              onChange={(option) => setIndustry(option)}
              placeholder="Industry"
            />
          </div>

          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter company size (loan portfolio size or number of customers)"
              className="w-full text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
              value={companySize}
              onChange={(e) => setCompanySize(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <Select
              className="text-[14px]"
              options={COUNTRY_CURRENCY_OPTIONS}
              value={countryCurrency}
              onChange={(option) => setCountryCurrency(option)}
              placeholder="Select Country / Currency"
            />
          </div>

          <div className="mt-4">
            <Select
              className="text-[14px]"
              options={ACCOUNTING_STANDARD_OPTIONS}
              value={accountingStandard}
              onChange={(option) => setAccountingStandard(option)}
              placeholder="Select Preferred Accounting Standard"
            />
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
