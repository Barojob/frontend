import React from "react";
import { cn } from "../../utils/classname";
import CameraIcon from "../../assets/images/CamerIcon.png";

type PhotoUploadProps = {
  className?: string;
  label: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
};

const PhotoUpload: React.FC<PhotoUploadProps> = ({
  className,
  label,
  file,
  onFileChange,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0]);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileChange(null);
  };

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="text-sm font-medium text-extraBlack-1 mb-1">{label}</div>
      <label
        className={cn(
          "block w-full h-auto border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-blue-500 transition-colors"
        )}
      >
        {file ? (
          <div className="relative flex justify-center items-center">
            {file.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(file)}
                alt="Uploaded preview"
                className="max-h-52 items-center object-cover rounded-md"
              />
            ) : (
              <div className="w-full flex items-center justify-center">
                <span className="text-gray-500">파일 등록됨</span>
              </div>
            )}
            <button
              type="button"
              onClick={handleRemove}
              className="absolute text-xs font-bold top-0 right-0 bg-yellow-200 rounded-full py-1.5 px-2 shadow-md"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full p-6">
            <div className="mb-2 size-7">
              <img src={CameraIcon} className="w-full" />
            </div>
            <span className="text-gray-500">업로드 하기</span>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default PhotoUpload;
