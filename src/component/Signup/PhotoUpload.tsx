import React from "react";
import { cn } from "../../utils/classname";
import CameraIcon from "../../assets/images/CamerIcon.png";
import { TiDelete } from "react-icons/ti";

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
          "block relative w-full h-auto border-2 border-dashed border-gray-300 rounded-md py-6 px-8 text-center hover:border-blue-500 transition-colors"
        )}
      >
        {file && (
          <button
            type="button"
            onClick={handleRemove}
            className="absolute size-5 top-2 right-2 rounded-full shadow-md"
          >
            <TiDelete className="size-full" />
          </button>
        )}
        {file ? (
          <div className="flex justify-center items-center">
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
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full p-6">
            <div className="mb-2 size-7">
              <img src={CameraIcon} className="w-full" alt="Camera Icon" />
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
