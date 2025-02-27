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
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    // 배경 스크롤 방지
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => {
      setShowCarrierModal(false);
    }, 400); // exit 애니메이션 지속시간 (400ms)
  };

  return (
    <div
      className={cn("fixed inset-0 z-50", className)}
      onClick={handleClose} // 배경 클릭 시 닫힘
    >
      <div className="absolute inset-0 bg-black bg-opacity-80" />
      <div className="absolute bottom-0 left-0 right-0 max-w-[460px] mx-auto">
        <div
          className={cn(
            "bg-white rounded-t-[40px] py-8 px-6 w-full transition-transform duration-400 transform",
            animate ? "animate-slide-up" : "animate-slide-down"
          )}
          onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
        >
          <div className="mb-8 text-xl text-center font-black">통신사 선택</div>
          {carriersList.map((carrierOption) => (
            <div
              key={carrierOption.value}
              className="py-3 text-left text-extraBlack-1 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setCarrier(carrierOption.label);
                handleClose();
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
