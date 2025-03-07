function PageLoader({ loadingHeader }: any) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-10 h-10 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        <span className="mt-3 text-[14px] animate-bounce">{loadingHeader}</span>
      </div>
    </div>
  );
}

export default PageLoader;
