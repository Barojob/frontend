import { cn } from "@/utils/classname";
import React from "react";
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
      <div className="text-extraBlack-1 mb-1 text-sm font-medium">{label}</div>
      <label
        className={cn(
          "relative block h-auto w-full rounded-md border-2 border-dashed border-gray-300 px-8 py-6 text-center transition-colors hover:border-blue-500",
        )}
      >
        {file && (
          <button
            type="button"
            onClick={handleRemove}
            className="absolute right-2 top-2 size-5 rounded-full shadow-md"
          >
            <TiDelete className="size-full" />
          </button>
        )}
        {file ? (
          <div className="flex items-center justify-center">
            {file.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(file)}
                alt="Uploaded preview"
                className="max-h-52 items-center rounded-md object-cover"
              />
            ) : (
              <div className="flex w-full items-center justify-center">
                <span className="text-gray-500">파일 등록됨</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center justify-center p-6">
            <div className="mb-2 size-7">
              {/* FIXME: set size to prevent layout shift */}
              <img
                src="/public/images/CameraIcon.png"
                className="w-full"
                alt="Camera Icon"
              />
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
