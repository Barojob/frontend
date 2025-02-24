import React, { useState, useEffect } from "react";
import { cn } from "../../utils/classname";

type Props = {
  className?: string;
  setCarrier: (carrier: string) => void;
  setShowCarrierModal: (show: boolean) => void;
};

const carriersList = [
  { value: "SKT", label: "SKT" },
  { value: "KT", label: "KT" },
  { value: "LGU+", label: "LG U+" },
  { value: "알뜰폰A", label: "SKT 알뜰폰" },
  { value: "알뜰폰B", label: "KT 알뜰폰" },
  { value: "알뜰폰C", label: "LG U+ 알뜰폰" },
];

const CarrierModal: React.FC<Props> = ({
  className,
  setCarrier,
  setShowCarrierModal,
}) => {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(true);
  }, []);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
  return (
    <div
      className={cn("fixed inset-0 z-50", className)}
      onClick={() => setShowCarrierModal(false)}
    >
      <div className="absolute inset-0 bg-black bg-opacity-80" />
      <div className="absolute bottom-0 left-0 right-0 max-w-[460px] mx-auto">
        <div
          className={cn(
            "bg-white rounded-t-[40px] py-8 px-6 w-full transition-transform duration-300 transform translate-y-0",
            animate ? "animate-slide-up" : ""
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-8 text-xl text-center font-black">통신사 선택</div>
          {carriersList.map((carrierOption) => (
            <div
              key={carrierOption.value}
              className="py-3 text-left text-extraBlack-1 cursor-pointer"
              onClick={() => {
                setCarrier(carrierOption.label);
                setShowCarrierModal(false);
              }}
            >
              {carrierOption.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarrierModal;
