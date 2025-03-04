import React from "react";
import { cn } from "../../utils/classname";

type Props = {
  className?: string;
  img: string;
};

const Ad: React.FC<Props> = ({ className, img }) => {
  return (
    <div className={cn("size-full", className)}>
      <img src={img} className="object-cover size-full" />
    </div>
  );
};
export default Ad;
