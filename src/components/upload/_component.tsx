import React, { useRef } from "react";
import { Images } from "../../data/Assets";
import { UploadProps } from "../../core/interfaces";

function Upload({ UploadTitle }: UploadProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setIsDragging(false);
    // setIsUploading(true);
    // const file = e.dataTransfer.files[0];
    // const formData = new FormData();
    // formData.append('file', file);
    // let preview = URL.createObjectURL(file);
    // setPreviewImage(preview);
    // handleFiles(file);

    // UploadImage(formData)
    //    .then((res) => {
    //       setIsUploading(false);
    //       setIsUploadDone(true);
    //       toast.success(<p className="text-[12px]">{<HtmlRenderer htmlContent={'Upload successful.'} />}</p>);

    //       if (onUploadSuccess) {
    //          onUploadSuccess(res?.data.id);
    //       }
    //    })
    //    .catch((err) => {
    //       setIsUploading(false);
    //       toast.error(<p className="text-[12px]">{<HtmlRenderer htmlContent={err.response?.data?.message} /> ?? 'An error occured. Please try again !'}</p>);
    //    });
  };

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
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
            accept=".csv"
          />
        </div>
        <div>
          <a
            href="#"
            className="flex items-center gap-2 text-sm text-[#F7941E]"
          >
            <img className="w-[14px] h-[14px]" src={Images.download} alt="" />
            Download template
          </a>
        </div>
        <hr className="mt-3" />
      </div>
    </>
  );
}

export default Upload;
