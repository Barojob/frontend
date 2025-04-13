import React, { useState } from "react";
import { cn } from "../../utils/classname";

import Ad from "./Ad";
import Adimg1 from "../../assets/images/test1.jpg";
import Adimg2 from "../../assets/images/test.jpg";
import Adimg3 from "../../assets/images/test1.jpg";
import Adimg4 from "../../assets/images/test.jpg";
import AdIndicator from "./AdIndicator";

type Props = {
  className?: string;
};

const adList = [
  {
    imgSrc: Adimg1,
  },
  {
    imgSrc: Adimg2,
  },
  {
    imgSrc: Adimg3,
  },
  {
    imgSrc: Adimg4,
  },
];

const AdList: React.FC<Props> = ({ className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < adList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className={cn("relative flex w-full", className)}>
      <div
        className="relative flex-1 overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex h-fit transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {adList.map((ad, index) => (
            <div
              key={index}
              className="flex w-full flex-shrink-0 items-center justify-center"
            >
              <Ad img={ad.imgSrc} />
            </div>
          ))}
        </div>
        <AdIndicator
          className="absolute bottom-2 right-2"
          currentIndex={currentIndex + 1}
          length={adList.length}
        />
      </div>
    </div>
  );
};
export default AdList;
