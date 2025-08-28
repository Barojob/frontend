import { cn } from "@/utils/classname";
import React from "react";

type Props = {
  className?: string;
  img: string;
};

const Ad: React.FC<Props> = ({ className, img }) => {
  return (
    <img src={img} className={cn("h-36 w-full object-cover", className)} />
  );
};
export default Ad;
