import React from "react";
import { cn } from "../../utils/classname";

type Props = {
  className?: string;
  img: string;
};

const Ad: React.FC<Props> = ({ className, img }) => {
  return (
    <div className={cn("w-full", className)}>
      <img src={img} />
    </div>
  );
};
export default Ad;
