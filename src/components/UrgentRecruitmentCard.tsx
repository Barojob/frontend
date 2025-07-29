import React from "react";
import { cn } from "../utils/classname";

type Props = {
  className?: string;
};

const UrgentRecruitmentCard: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white shadow-[0_0_10px_2px_#6565651A]",
        className,
      )}
    >
      {/* FIXME: implement this component */}
    </div>
  );
};

export default UrgentRecruitmentCard;
