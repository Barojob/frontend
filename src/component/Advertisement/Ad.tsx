import React from "react";
import { cn } from "../../utils/classname";

type Props = {
  className?: string;
  img: string;
};

const Ad: React.FC<Props> = ({ className, img }) => {
  return (
    <img src={img} className={cn("object-cover h-36 w-full", className)} />
  );
};
export default Ad;
