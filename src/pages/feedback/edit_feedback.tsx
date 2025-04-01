import Select from "react-select";

import Button from "../../components/button/_component";
import { UploadDataProps } from "../../core/interfaces";
import { useActionState, useEffect, useState } from "react";
import { UpdateAUser } from "../../core/services/users.service";
import { useAdminUser } from "../../core/hooks/users";
import { showToast } from "../../core/hooks/alert";
// import { usePortfolios } from "../../core/hooks/portfolio";
import { roles } from "../../data";
function EditFeedback({ close, rowId }: UploadDataProps) {
  // const [selectedPortfolio, setSelectedPortfolio] = useState<string>("");
  // const { portfoliosQuery } = usePortfolios();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [hasRoleChanged, setHasRoleChanged] = useState<boolean>(false);

  const { adminUserQuery } = useAdminUser(Number(rowId));

  useEffect(() => {
    adminUserQuery.refetch();
  }, [rowId]);

  // const portfolioDropdowns =
  //   portfoliosQuery &&
  //   portfoliosQuery.data &&
  //   portfoliosQuery.data.data &&
  //   portfoliosQuery.data.data.items;
  // const portfolioOptions =
  //   portfolioDropdowns &&
  //   portfolioDropdowns.map((po: any, _: any) => ({
  //     value: po.id,
  //     label: po.name,
  //   }));

  // const handlePortofioOptions = (selectedOptions: any) => {
  //   setSelectedPortfolio(selectedOptions.value);
  // };

  const handleRoleChange = (selectedOption: any) => {
    setSelectedRole(selectedOption.value);
    setHasRoleChanged(true);
  };

  const handleSubmit = async (prevState: any, formData: FormData) => {
    console.log("prev: ", prevState);
    setIsSubmitting(true);
    const first_name = formData.get("first_name") as string;
    const last_name = formData.get("last_name") as string;
    const email = formData.get("email") as string;
    const recovery_email = formData.get("recovery_email") as string;
    const is_active = true;
    const role = selectedRole as string;

    const payload = {
      first_name,
      last_name,
      email,
      is_active,
      recovery_email,
      role: hasRoleChanged
        ? role
        : adminUserQuery &&
          adminUserQuery.data &&
          adminUserQuery.data.data.role,
    };

    if (!first_name || !last_name || !email || !recovery_email) {
      showToast("Please fill in all fields.", false);
      return;
    }

    try {
      UpdateAUser(Number(rowId), payload)
        .then((res) => {
          setIsSubmitting(false);
          showToast(res.data.message, true);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          setIsSubmitting(false);
          showToast(err?.response?.data.detail, false);
        });
    } catch (err) {
      setIsSubmitting(false);
      showToast("User creation failed. Please try again", false);
    }
  };

  const [state, formAction] = useActionState(handleSubmit, null);
  console.log("state: ", state);
  return (
    <>
      <div className="p-8">
        <form action={formAction}>
          <div className="mt-3 leading-9">
            <div className="flex justify-between">
              <div>
                <label className="text-[#1E1E1E] text-[14px] font-medium">
                  First name
                </label>
                <input
                  type="text"
                  name="first_name"
                  defaultValue={
                    adminUserQuery &&
                    adminUserQuery.data &&
                    adminUserQuery.data.data.first_name
                  }
                  placeholder="Enter first name"
                  className="w-full h-[50%] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
                />
              </div>
              <div>
                <label className="text-[#1E1E1E] text-[14px] font-medium">
                  Last name
                </label>
                <input
                  type="text"
                  name="last_name"
                  defaultValue={
                    adminUserQuery &&
                    adminUserQuery.data &&
                    adminUserQuery.data.data.last_name
                  }
                  placeholder="Enter last name"
                  className="w-full h-[50%] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
                />
              </div>
            </div>

            <label className="text-[#1E1E1E] text-[14px] font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              defaultValue={
                adminUserQuery &&
                adminUserQuery.data &&
                adminUserQuery.data.data.email
              }
              placeholder="Enter email address"
              className="w-full h-[4%] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
            />
            <label className="text-[#1E1E1E] text-[14px] font-medium">
              Recovery email
            </label>
            <input
              type="email"
              name="recovery_email"
              defaultValue={
                adminUserQuery &&
                adminUserQuery.data &&
                adminUserQuery.data.data.recovery_email
              }
              placeholder="Enter recovery email address"
              className="w-full h-[4%] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
            />
            <label className="text-[#1E1E1E] text-[14px] font-medium">
              Role
            </label>
            <Select
              className="w-full "
              onChange={handleRoleChange}
              options={roles}
              id="asset-type"
              placeholder={
                adminUserQuery &&
                adminUserQuery.data &&
                adminUserQuery.data.data.role
              }
            />

            {/* <label className="text-[#1E1E1E] text-[14px] font-medium">
              Assign portfolio
            </label>
            <Select
              className="w-full"
              onChange={handlePortofioOptions}
              options={portfolioOptions}
              placeholder="Select portfolio"
            /> */}
          </div>

          <div className="flex justify-end mt-3">
            <div
              className="px-4 !w-[90px] cursor-pointer flex items-center !text-[14px] bg-white border border-gray-400 rounded-[10px] mr-2"
              onClick={close}
            >
              Cancel
            </div>
            <Button
              isLoading={isSubmitting}
              type="submit"
              text="Submit"
              className="bg-[#166E94] !text-[14px] !w-[90px] text-white px-4 py-2 rounded-[10px]"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default EditFeedback;
