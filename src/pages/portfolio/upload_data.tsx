import { useParams } from "react-router-dom";
import Button from "../../components/button/_component";
import Upload from "../../components/upload/_component";
import { UploadDataProps } from "../../core/interfaces";
import { CreatePortfolioIngestion } from "../../core/services/portfolio.service";
import { showToast } from "../../core/hooks/alert";
import { useState } from "react";

function UploadData({ close }: UploadDataProps) {
  const { id } = useParams();
  const [isDone, setIsDone] = useState<boolean>(false);
  const [loan_details, setLoanDetails] = useState<File | null>(null);
  const [loan_guarantee_data, setLoanGuarantee] = useState<File | null>(null);
  const [loan_collateral_data, setLoanCollateral] = useState<File | null>(null);

  const getLoanDetailsFile = (file: File) => {
    setLoanDetails(() => {
      console.log("Updated loanDetails: ", file);
      return file;
    });
  };

  const getLoanGuaranteeFile = (file: File) => {
    setLoanGuarantee(() => file);
  };

  const getLoanCollateralFile = (file: File) => {
    setLoanCollateral(() => file);
  };

  const handleSubmit = () => {
    setIsDone(true);
    if (!loan_details || !loan_guarantee_data || !loan_collateral_data) {
      showToast("Please upload all required files.", false);
      setIsDone(false);
      return;
    }

    const formData = new FormData();
    formData.append("loan_details", loan_details);
    formData.append("loan_guarantee_data", loan_guarantee_data);
    formData.append("loan_collateral_data", loan_collateral_data);

    if (id) {
      CreatePortfolioIngestion(id, formData)
        .then(() => {
          setIsDone(false);
          showToast("Submission successful", true);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          setIsDone(false);
          showToast(err?.response?.data?.detail || "Submission failed", false);
        });
    }
  };

  return (
    <>
      <Upload
        templateLink={"/Loan_master.xlsx"}
        setFile={getLoanDetailsFile}
        UploadTitle="Import loan details"
      />
      <Upload
        templateLink={"/Loan_guarantee.xlsx"}
        setFile={getLoanGuaranteeFile}
        UploadTitle="Import loan guarantee data"
      />
      <Upload
        templateLink={"/Collateral_Data.xlsx"}
        setFile={getLoanCollateralFile}
        UploadTitle="Import loan collateral data"
      />
      <div className="flex justify-end mt-2">
        <Button
          text="Cancel"
          onClick={close}
          className="bg-white !py-0 mr-3 border-[1px] border-[#6F6F6F] font-normal text-[#6F6F6F] text-[12px] !rounded-[10px] !w-[90px] "
        />
        <Button
          text="Done"
          isLoading={isDone}
          onClick={handleSubmit}
          className="bg-[#166E94] font-normal text-white text-[12px] !rounded-[10px] !w-[90px] "
        />
      </div>
    </>
  );
}

export default UploadData;
