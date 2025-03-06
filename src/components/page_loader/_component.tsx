import React from "react";

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-center h-full">
        <div className="w-10 h-10 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
}

export default PageLoader;
