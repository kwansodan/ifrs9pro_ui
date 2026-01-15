import { useParams } from "react-router-dom";
import Button from "../../components/button/_component";
import Upload from "../../components/upload/_component";
import { UploadDataProps } from "../../core/interfaces";
import { CreatePortfolioIngestionSave } from "../../core/services/portfolio.service";
import { showToast } from "../../core/hooks/alert";
import { useState } from "react";
import { Modal } from "../../components/modal/_component";
import PageLoader from "../../components/page_loader/_component";
import { useDispatch } from "react-redux";
import { setIngestionData } from "../../core/stores/slices/ingestion_slice";
import { useNavigate } from "react-router-dom";
import { getExcelRowCount } from "../../core/utility";

function UploadData({ close }: UploadDataProps) {
  const { id } = useParams();
  const [isDone, setIsDone] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [customer_details, setCustomerDetails] = useState<File | null>(null);
  const [loan_details, setLoanDetails] = useState<File | null>(null);
  const [loan_guarantee_data, setLoanGuarantee] = useState<File | null>(null);
  const [loanRowCount, setLoanRowCount] = useState<number | null>(null);

  const [loan_collateral_data, setLoanCollateral] = useState<File | null>(null);

  const getCustomerDataFile = async (file: File) => {
    setCustomerDetails(file);

    const rows = await getExcelRowCount(file);
    console.log("Customer data rows:", rows);
  };

  const getLoanDetailsFile = async (file: File) => {
    setLoanDetails(file);
    setLoanRowCount(null);

    try {
      const rows = await getExcelRowCount(file);
      console.log("Loan details rows:", rows);

      setLoanRowCount(rows);
    } catch (error) {
      console.error("Failed to compute loan row count", error);
      showToast("Failed to read loan file rows", false);
    }
  };

  const getLoanGuaranteeFile = (file: File) => setLoanGuarantee(file);
  const getLoanCollateralFile = (file: File) => setLoanCollateral(file);

  const handleSubmit = async () => {
    setIsDone(true);

    if (!loan_details || !customer_details) {
      showToast("Please upload loan details and customer data.", false);
      setIsDone(false);
      return;
    }
    if (loanRowCount === null) {
      showToast("Loan file is still being processed. Please wait.", false);
      setIsDone(false);
      return;
    }

    const formData = new FormData();

    formData.append("loan_details", loan_details);
    formData.append("client_data", customer_details);

    if (loan_guarantee_data) {
      formData.append("loan_guarantee_data", loan_guarantee_data);
    }

    if (loan_collateral_data) {
      formData.append("loan_collateral_data", loan_collateral_data);
    }

    formData.append("loan_row_count", String(loanRowCount));

    formData.append("portfolio_id", String(id));

    try {
      const res = await CreatePortfolioIngestionSave(id!, formData);

      dispatch(
        setIngestionData({
          portfolioId: Number(id),
          uploaded_files: res.data.uploaded_files,
        })
      );

      navigate(`/dashboard/portfolio/${id}/mapping`);
    } catch (err: any) {
      console.error(err);
      showToast(
        err?.response?.data?.detail ??
          "Server error occurred, please try again",
        false
      );
    } finally {
      setIsDone(false);
    }
  };

  return (
    <>
      <Modal showClose={true} open={isDone} modalHeader="Operation ongoing">
        <div className="flex flex-col items-center justify-center p-8 bg-white ju ">
          <PageLoader />
          <small className="text-[#F7941E]"> This may take a while. </small>
          <small className="text-[#F7941E]">
            Ingestion in progress. Please wait. Do not close, refresh or
            navigate the page.
          </small>
        </div>
      </Modal>

      <div className="flex flex-col w-full">
        <Upload
          templateLink={"/Customer_data.xlsx"}
          setFile={getCustomerDataFile}
          UploadTitle="Import customer data"
        />
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
      </div>

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
