import MultiSelector from "@/components/JobPost/MultiSelector";
import React from "react";

interface EquipmentStepProps {
  selectedEquipment: string[];
  onEquipmentToggle: (equipmentId: string) => void;
  onConfirm: () => void;
}

const EquipmentStep: React.FC<EquipmentStepProps> = ({
  selectedEquipment,
  onEquipmentToggle,
  onConfirm,
}) => {
  return (
    <>
      <div className="mb-4 text-2xl font-bold text-neutral-600">
        <span className="text-blue-600">필요하신 장비</span>를 선택해주세요
      </div>
      <MultiSelector
        selectedItems={selectedEquipment}
        onItemToggle={onEquipmentToggle}
        type="equipment"
        className="mb-8"
      />

      {/* 확인 버튼 */}
      <div className="mb-4">
        <button
          onClick={onConfirm}
          disabled={selectedEquipment.length === 0}
          className={`w-full rounded-xl py-3 text-lg text-white ${
            selectedEquipment.length > 0 ? "bg-blue-600" : "bg-gray-400"
          }`}
        >
          확인
        </button>
      </div>
    </>
  );
};

export default EquipmentStep;
