import React from "react";
import { Images } from "../../data/Assets";

interface ApiErrorPageProps {
  message?: string;
  onRetry?: () => void;
}

export const ApiErrorPage: React.FC<ApiErrorPageProps> = ({
  message = "Something went wrong while fetching data.",
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 text-center bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center justify-center w-20 h-20 bg-red-100 rounded-full">
          <img
            src={Images.triangle}
            alt="warning"
            className="w-10 h-10 text-red-500"
          />
        </div>

        <h1 className="text-2xl font-semibold text-gray-800">
          Oops! Something went wrong
        </h1>

        <p className="max-w-md text-sm text-gray-600 md:text-base">{message}</p>

        {onRetry && (
          <div
            onClick={onRetry}
            className="flex items-center gap-2 mt-4 text-sm cursor-pointer hover:bg-gray-100 hover:text-black"
          >
            <img src={Images.refresh} alt="" className="w-4 h-4" />
            Try Again
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiErrorPage;
