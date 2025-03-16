import React, { useRef } from "react";
import { Images } from "../../data/Assets";
import { UploadProps } from "../../core/interfaces";

function Upload({ UploadTitle, setFile, templateLink }: UploadProps) {
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const [fileName, setFileName] = React.useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFiles = (file: any) => {
    setFileName(file && file.name);
    setFile(file);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    // const formData = new FormData();
    // formData.append("file", file);
    // // let preview = URL.createObjectURL(file);
    handleFiles(file);
  };

  const handleBrowseFiles = (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    // let preview = URL.createObjectURL(file);
    handleFiles(file);
  };

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveFile = () => {
    setFileName("");
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <>
      <div className="w-full max-w-md mx-auto">
        <h3 className="my-2 text-[14px] font-medium text-gray-700">
          {UploadTitle}
        </h3>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`p-6  text-center border-2 border-[#F0F0F0] border-dashed rounded-lg cursor-pointer hover:border-gray-400 ${
            isDragging ? "border-blue-500 bg-red-500" : "border-gray-300"
          }}`}
          onClick={handleFileSelect}
        >
          <img
            className="flex justify-center items-center m-auto w-[24px] h-[24px]"
            src={Images.file_upload}
            alt=""
          />
          <p className="text-sm text-[#6F6F6F]">
            Drag and drop CSV file here or
          </p>
          <p className="text-[#F7941E] text-[15px] cursor-pointer">
            Browse files
          </p>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".xls,.xlsx"
            onChange={handleBrowseFiles}
          />
        </div>
        <div>
          <a
            href={templateLink}
            className="flex items-center underline gap-2 text-sm text-[#F7941E]"
          >
            <img className="w-[14px] h-[14px] " src={Images.download} alt="" />
            Download template
          </a>
        </div>
        <span className="flex text-xs">
          {fileName && (
            <>
              filename: <span className="ml-2 text-green-500"> {fileName}</span>
              <img
                src={Images.deleteIcon}
                alt="Remove file"
                className="w-4 h-4 ml-2 cursor-pointer"
                onClick={handleRemoveFile}
              />
            </>
          )}
        </span>

        <hr className="mt-3" />
      </div>
    </>
  );
}

export default Upload;
