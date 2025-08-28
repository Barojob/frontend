import { cn } from "@/utils/classname";
import React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

const slides = [
  {
    imgSrc: "/public/images/test.jpg",
  },
  {
    imgSrc: "/public/images/test.jpg",
  },
];

type Props = {
  className?: string;
};

const MainCarousel: React.FC<Props> = ({ className }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const swiperRef = React.useRef<SwiperRef>(null);

  return (
    <section className={cn("relative", className)}>
      <Swiper
        className="h-full"
        ref={swiperRef}
        navigation
        modules={[Navigation]}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {slides.map((intro, index) => (
          <SwiperSlide key={index}>
            <img
              className="size-full object-cover object-center"
              src={intro.imgSrc}
              alt="test"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-3 left-0 right-0 z-10">
        <section className="relative">
          <div className="flex justify-center gap-x-2">
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

          <div className="absolute bottom-0 right-4">
            <span className="rounded-full bg-[#A9A9A9] px-1.5 py-1 text-xs font-medium text-[#ECECEC]">
              {activeIndex + 1} / {slides.length}
            </span>
          </div>
        </section>
      </div>
    </section>
  );

  function handleSlideChange(index: number) {
    return () => {
      swiperRef.current?.swiper.slideTo(index);
    };
  }
};

export default MainCarousel;
