import Select from "react-select";
import { roles } from "../../data";
import Button from "../../components/button/_component";
import { UploadDataProps } from "../../core/interfaces";
import { useActionState, useState } from "react";
import { showToast } from "../../core/hooks/alert";
import { ApproveUserRequest } from "../../core/services/dashboard.service";
import { useNavigate } from "react-router-dom";
function ApproveRequest({ close, rowStatus, requestId }: UploadDataProps) {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const navigate = useNavigate();

  const handleAdminApproval = async () => {
    setButtonLoading(true);
    if (!requestId || !rowStatus || !selectedRole) {
      showToast("Some required fields are missing.", false);
      return;
    }
    try {
      ApproveUserRequest(requestId, rowStatus, selectedRole)
        .then((res) => {
          console.log(res);
          setButtonLoading(false);
          navigate("/admin-verification");
        })
        .catch((err) => {
          setButtonLoading(false);
          showToast(err?.response?.data.detail, false);
        });

      return { success: true };
    } catch (err) {
      console.error("Failed to login:", err);
      setButtonLoading(false);
      return { success: false, error: "Login failed. Please try again." };
    }
  };

  const handleRoleOnChange = (selectedOption: string) => {
    setSelectedRole(selectedOption);
  };

  const [state, formAction] = useActionState(handleAdminApproval, null);
  return (
    <>
      <div className="p-8">
        <form action={formAction}>
          <div className="mt-3 leading-9 min-w-[510px]">
            <label className="text-[#1E1E1E] text-[14px] font-medium">
              Role
            </label>
            <Select
              className="w-full"
              onChange={(selectedOption) =>
                handleRoleOnChange(
                  (selectedOption && selectedOption?.value) || ""
                )
              }
              options={roles}
              placeholder="Select role"
            />
          </div>

          <div className="flex justify-end mt-3">
            <Button
              text="Cancel"
              onClick={close}
              className="px-4 !w-[90px]  !text-[14px] bg-white border border-gray-400 rounded-[10px] mr-2"
            />
            <Button
              text="Authorize"
              type="submit"
              isLoading={buttonLoading}
              className="bg-[#166E94] !text-[14px] !w-[90px] text-white px-4 py-2 rounded-[10px]"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default ApproveRequest;
