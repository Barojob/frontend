import React from "react";
import ModalWrapper from "../ModalWrapper";

type CarrierModalProps = {
  setCarrier: (carrier: string) => void;
  setShowCarrierModal: (show: boolean) => void;
  className?: string;
};

const carriersList = [
  { value: "SKT", label: "SKT" },
  { value: "KT", label: "KT" },
  { value: "LGU+", label: "LG U+" },
  { value: "알뜰폰A", label: "SKT 알뜰폰" },
  { value: "알뜰폰B", label: "KT 알뜰폰" },
  { value: "알뜰폰C", label: "LG U+ 알뜰폰" },
];

const CarrierModal: React.FC<CarrierModalProps> = ({
  className,
  setCarrier,
  setShowCarrierModal,
}) => {
  const handleClose = () => {
    setShowCarrierModal(false);
  };

  return (
    <ModalWrapper onClose={handleClose} className={className}>
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
    </ModalWrapper>
  );
};

export default CarrierModal;
