import React from "react";
import { cn } from "../../utils/classname";
import Modal from "../Modal";

type CarrierModalProps = {
  className?: string;
  visible: boolean;
  // FIXME: use strictly typed carrier value
  // onSelect: (carrier: Carrier) => void;
  onSelect: (carrier: string) => void;
  onClose: () => void;
};

// FIXME: query this list from backend
const carriersList = [
  { value: "SKT", label: "SKT" },
  { value: "KT", label: "KT" },
  { value: "LGU+", label: "LG U+" },
  { value: "알뜰폰A", label: "SKT 알뜰폰" },
  { value: "알뜰폰B", label: "KT 알뜰폰" },
  { value: "알뜰폰C", label: "LG U+ 알뜰폰" },
] as const;

// FIXME: use <Drawer /> when it's implemented
const CarrierModal: React.FC<CarrierModalProps> = ({
  className,
  visible,
  onSelect,
  onClose,
}) => {
  return (
    <Modal
      className={cn("bg-white", className)}
      visible={visible}
      onClose={onClose}
    >
      <div className="mb-8 text-center text-xl font-black">통신사 선택</div>
      {carriersList.map((carrierOption) => (
        <div
          key={carrierOption.value}
          className="text-extraBlack-1 cursor-pointer py-3 text-left hover:bg-gray-100"
          onClick={handleSelect(carrierOption.value)}
        >
          {carrierOption.label}
        </div>
      ))}
    </Modal>
  );

  function handleSelect(carrier: string) {
    return () => {
      onSelect(carrier);
      onClose();
    };
  }
};

export default CarrierModal;
