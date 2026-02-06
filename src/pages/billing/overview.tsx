import { AxiosError } from "axios";
import { useBillingOverview } from "../../core/hooks/dashboard";
import ApiErrorPage from "../errors/api";

const Overview = () => {
  const { data, isLoading, isError, error, refetch } = useBillingOverview();

  if (isLoading) {
    return (
      <div className="text-sm text-gray-500">Loading billing overview...</div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-gray-500">Loading pricing plans…</div>
    );
  }

  const handleRetry = () => {
    refetch();
  };

  if (isError) {
    let errorMessage = "Unable to fetch data from server.";

    if (error instanceof AxiosError) {
      errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message;
    }

    return <ApiErrorPage message={errorMessage} onRetry={handleRetry} />;
  }

  const overview = data?.data?.data;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="p-5 text-left bg-white border rounded-xl">
          <p className="text-sm text-gray-500">Active subscriptions</p>
          <p className="mt-2 text-3xl font-semibold">
            {overview?.active_subscriptions ?? 0}
          </p>
        </div>

        <div className="p-5 text-left bg-white border rounded-xl">
          <p className="text-sm text-gray-500">Expired subscriptions</p>
          <p className="mt-2 text-3xl font-semibold">
            {overview?.expired_subscriptions ?? 0}
          </p>
        </div>

        <div className="p-5 text-left bg-white border rounded-xl">
          <p className="text-sm text-gray-500">Total overdue invoices</p>
          <p className="mt-2 text-3xl font-semibold">0</p>
        </div>
      </div>

      <div className="border bg-gray-50 rounded-xl">
        <div className="px-4 py-3 font-medium text-gray-700 border-b sm:px-5">
          Overview
        </div>

        <div className="divide-y">
          <div className="flex flex-col gap-2 px-4 py-4 sm:px-5 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-gray-600">Current plan</span>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <span className="text-sm text-gray-800">
                {overview?.current_plan?.name ?? "No active plan"}
              </span>
              {/* <Button
                text="Change current plan"
                className="bg-[#F1F1F1] w-full sm:w-auto"
              /> */}
            </div>
          </div>

          <div className="flex flex-col gap-2 px-4 py-4 sm:px-5 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-gray-600">Billing cycle</span>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <span className="text-sm text-gray-800 capitalize">
                {overview?.billing_cycle ?? "Not set"}
              </span>
              {/* <Button text="Update" className="bg-[#F1F1F1] w-full sm:w-auto" /> */}
            </div>
          </div>

          <div className="flex flex-col gap-2 px-4 py-4 sm:px-5 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-gray-600">Billing email</span>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <span className="text-sm text-gray-800 break-all">
                {overview?.billing_email ?? "Not provided"}
              </span>
              {/* <Button text="Update" className="bg-[#F1F1F1] w-full sm:w-auto" /> */}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-full p-4 border sm:w-1/2 sm:p-5 bg-gray-50 rounded-xl">
        <p className="mb-3 text-sm text-gray-600">
          For help and support with your billing questions, contact our support
          team and they'll be happy to help.
        </p>

        <hr className="my-8" />

        <div className="flex justify-end">
          <div className="bg-[#F1F1F1] text-center flex justify-center rounded-md w-full sm:w-44">
            <Button text="Contact support" className="w-full sm:w-auto" />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Overview;
