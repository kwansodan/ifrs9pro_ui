function PageLoader({ loadingHeader }: any) {
  return (
    <div className="flex items-center justify-center mt-3">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-6 h-6 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        <span className="mt-3 text-[14px] animate-bounce">{loadingHeader}</span>
      </div>
    </div>
  );
}

export default PageLoader;
