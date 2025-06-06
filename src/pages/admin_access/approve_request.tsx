import Select from "react-select";
import { roles } from "../../data";
import Button from "../../components/button/_component";
import { UploadDataProps } from "../../core/interfaces";
import { useActionState, useState } from "react";
import { showToast } from "../../core/hooks/alert";
import { ApproveUserRequest } from "../../core/services/dashboard.service";
import { useAdminRequests } from "../../core/hooks/admin";

function ApproveRequest({
  close,
  actionToBeTaken,
  requestId,
}: UploadDataProps) {
  const { adminRequestsQuery } = useAdminRequests();
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<string>("");

  const handleAdminApproval = async () => {
    setButtonLoading(true);

    if (
      !requestId ||
      (!selectedRole &&
        actionToBeTaken?.toLocaleLowerCase() === "approve request")
    ) {
      showToast("Some required fields are missing.", false);
      setButtonLoading(false);
      return;
    }
    try {
      ApproveUserRequest(
        requestId,
        actionToBeTaken?.toLocaleLowerCase() === "approve request"
          ? "approved"
          : actionToBeTaken?.toLocaleLowerCase() === "deny request"
          ? "denied"
          : "flagged",
        actionToBeTaken?.toLocaleLowerCase() === "approve request"
          ? selectedRole
          : actionToBeTaken?.toLocaleLowerCase() === "deny request"
          ? "admin"
          : "admin"
      )
        .then((res) => {
          showToast(res.data.message, true);
          setButtonLoading(false);
          close?.();
          adminRequestsQuery.refetch();
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
  console.log("state: ", state);
  return (
    <>
      <div className="p-8">
        <form action={formAction}>
          {actionToBeTaken?.toLocaleLowerCase() === "approve request" ? (
            <>
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
            </>
          ) : (
            ""
          )}

          <div className="mt-3 leading-9 min-w-[510px]">
            <label className="text-[#1E1E1E] text-[14px] font-medium">
              Status
            </label>
            <Select
              className="w-full"
              value={
                actionToBeTaken?.toLocaleLowerCase() === "approve request"
                  ? "approved"
                  : actionToBeTaken?.toLocaleLowerCase() === "deny request"
                  ? "denied"
                  : "flagged"
              }
              placeholder={
                actionToBeTaken?.toLocaleLowerCase() === "approve request"
                  ? "Approve"
                  : actionToBeTaken?.toLocaleLowerCase() === "deny request"
                  ? "Deny"
                  : "Flag"
              }
              isDisabled={true}
            />
          </div>

          <div className="flex justify-end mt-3">
            <div
              onClick={close}
              className="px-4 flex justify-center items-center cursor-pointer !w-[90px]  !text-[14px] bg-white border border-gray-400 rounded-[10px] mr-2"
            >
              Cancel
            </div>

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
