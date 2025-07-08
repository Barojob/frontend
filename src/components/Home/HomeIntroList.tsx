import React, { useState } from "react";
import { cn } from "../../utils/classname";
import HomeIntro from "./HomeIntro";

export type Props = {
  className?: string;
};

const intros = [
  {
    imgSrc: "/pubilc/images/HomeImage1.png",
    introText: "우리 앱에 오신 것을 환영합니다!",
  },
  {
    imgSrc: "/pubilc/images/HomeImage1.png",
    introText: "새로운 기능을 만나보세요!",
  },
  {
    imgSrc: "/public/images/HomeImage1.png",
    introText: "친구들과 함께 연결되어 있어요!",
  },
  { imgSrc: "/public/images/HomeImage1.png", introText: "지금 시작해보세요!" },
];

const HomeIntroList: React.FC<Props> = ({ className }) => {
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
    if (currentIndex < intros.length - 1) {
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
    <div className={cn("flex flex-col", className)}>
      {/* 슬라이드 영역 */}
      <div
        className="relative flex-1 overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* 슬라이드 컨테이너 */}
        <div
          className="flex h-fit transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {intros.map((intro, index) => (
            <div
              key={index}
              className="flex w-full shrink-0 items-center justify-center"
            >
              <HomeIntro imgSrc={intro.imgSrc} introText={intro.introText} />
            </div>
          ))}
        </div>

        {/* 왼쪽 화살표 */}
        {currentIndex > 0 && (
          <div
            className="absolute left-5 top-1/2 -translate-y-1/2 transform cursor-pointer"
            onClick={handlePrev}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
        )}

        {/* 오른쪽 화살표 */}
        {currentIndex < intros.length - 1 && (
          <div
            className="absolute right-5 top-1/2 -translate-y-1/2 transform cursor-pointer"
            onClick={handleNext}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center pb-5 pt-[17%]">
        {intros.map((_, index) => (
          <div
            key={index}
            className={`mx-1 h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-gray-500" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HomeIntroList;
