import React from "react";

interface AddJobPostCardProps {
  onClick: () => void;
}

const AddJobPostCard: React.FC<AddJobPostCardProps> = ({ onClick }) => {
  return (
    <div
      className="flex cursor-pointer items-center justify-center rounded-lg bg-gray-100 p-10 transition-colors hover:bg-gray-100"
      onClick={onClick}
    >
      <div className="flex flex-col items-center">
        <div className="size-13 flex items-center justify-center rounded-full bg-blue-600">
          <svg
            className="size-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AddJobPostCard;
