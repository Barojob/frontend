import React from "react";
import { cn } from "../../utils/classname";

type Props = {
  className?: string;
  onClick?: () => void;
};

const CompleteBar: React.FC<Props> = ({ className, onClick }) => {
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-white px-6 py-8 shadow-lg",
        className,
      )}
    >
      <button
        onClick={onClick}
        className="w-full rounded-xl bg-blue-600 py-3 text-lg text-white"
      >
        설정 완료
      </button>
    </div>
  );
};

export default CompleteBar;
