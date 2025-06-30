import React from "react";
import { cn } from "../../utils/classname";

export type Props = {
  className?: string;
  imgSrc?: string;
  introText?: string;
};

const HomeIntro: React.FC<Props> = ({ className, imgSrc, introText }) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center",
        className,
      )}
    >
      <img src={imgSrc} className="w-full max-w-[60%]" />
      <p className="mt-6 text-center font-brand text-[1.125rem] font-semibold">
        {introText}
      </p>
    </div>
  );
};

export default HomeIntro;
