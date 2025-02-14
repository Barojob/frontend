import React from "react";
import { cn } from "../../utils/classname";

export type Props = {
  className?: string;
  imgSrc?: string;
  introText?: string;
};

const HomeIntro: React.FC<Props> = ({ className, imgSrc, introText }) => {
  return (
    <div className={cn("w-full flex flex-col justify-center", className)}>
      <img src={imgSrc} className="w-full" />
      <p className="text-center font-brand mt-2 font-semibold text-[1.125rem]">
        {introText}
      </p>
    </div>
  );
};

export default HomeIntro;
