function GerneratingReport() {
  return (
    <div className="flex justify-center items-center bg-white min-h-[200px] min-w-[600px] pt-5 pb-3 px-16 rounded-[20px]">
      <div
        className="inline-block text-black h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-green-400"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
      <small className="ml-2 text-[14px]">Generating</small>
    </div>
  );
}

export default GerneratingReport;
