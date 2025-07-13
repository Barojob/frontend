import React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { cn } from "../utils/classname";

const slides = [
  {
    imgSrc: "/public/images/intro-image-1.png",
    text: "우리 앱에 오신 것을 환영합니다!",
  },
  {
    imgSrc: "/public/images/intro-image-1.png",
    text: "새로운 기능을 만나보세요!",
  },
  {
    imgSrc: "/public/images/intro-image-1.png",
    text: "친구들과 함께 연결되어 있어요!",
  },
  {
    imgSrc: "/public/images/intro-image-1.png",
    text: "지금 시작해보세요!",
  },
];

type Props = {
  className?: string;
};

const HomeIntroCarousel: React.FC<Props> = ({ className }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const swiperRef = React.useRef<SwiperRef>(null);

  return (
    <section className={cn("flex flex-col", className)}>
      <div className="h-full">
        <Swiper
          className="flex h-full overflow-hidden"
          ref={swiperRef}
          navigation
          modules={[Navigation]}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {slides.map((intro, index) => (
            <SwiperSlide key={index}>
              <div className="flex size-full shrink-0 flex-col items-center justify-center">
                <img className="h-full" src={intro.imgSrc} />
                <p className="font-brand mt-6 text-center text-xl font-semibold">
                  {intro.text}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mt-4 flex justify-center gap-x-2">
        {slides.map((_, index) => (
          <button
            className={cn(
              "size-2 rounded-full",
              index === activeIndex && "bg-gray-500",
              index !== activeIndex && "bg-gray-300",
            )}
            key={index}
            onClick={handleSlideChange(index)}
          />
        ))}
      </div>
    </section>
  );

  function handleSlideChange(index: number) {
    return () => {
      swiperRef.current?.swiper.slideTo(index);
    };
  }
};

export default HomeIntroCarousel;
