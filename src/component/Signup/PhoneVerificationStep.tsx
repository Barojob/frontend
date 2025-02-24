import React, { useState, useEffect } from "react";
import { cn } from "../../utils/classname";
import LabelInput from "../Input/LabelInput";
import CarrierModal from "./CarrierModal"; // CarrierModal 임포트

type PhoneVerificationStepProps = {
  className?: string;
  onValidityChange: (isValid: boolean) => void;
};

const PhoneVerificationStep: React.FC<PhoneVerificationStepProps> = ({
  className,
  onValidityChange,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [carrier, setCarrier] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [name, setName] = useState("");
  const [showCarrierModal, setShowCarrierModal] = useState(false);

  // 전화번호는 '-' 포함 13자 (예: 010-1234-5678) 이상이어야 유효
  const isPhoneValid = phoneNumber.trim().length >= 13;
  const isCarrierSelected = carrier.trim() !== "";
  const isBirthDateValid = birthDate.trim().length === 8;
  const isNameValid = name.trim().length > 0;
  const isValid =
    isPhoneValid && isCarrierSelected && isBirthDateValid && isNameValid;

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  return (
    <div className={cn("", className)}>
      <div className="mt-7 font-black text-2xl text-black">휴대폰 인증</div>
      <div className="mt-1 text-base text-gray-500 mb-5">
        최초 1회 휴대폰 인증이 필요합니다.
      </div>

      {/* 전화번호 입력란 */}
      <LabelInput
        type="tel"
        label="휴대폰 번호"
        placeholder="휴대폰번호( - 없이 숫자만 입력)"
        value={phoneNumber}
        onValueChange={setPhoneNumber}
        rounded="md"
        className="text-black-1 focus:border-gray-500 placeholder-gray-300"
      />

      {/* 전화번호가 유효하면 통신사 선택 필드가 나타남 */}
      {isPhoneValid && (
        <div className="mt-4" onClick={() => setShowCarrierModal(true)}>
          <LabelInput
            type="text"
            label="통신사"
            placeholder="통신사 선택"
            value={carrier}
            onValueChange={() => {}}
            rounded="md"
            className="text-black-1 focus:border-gray-500 placeholder-gray-300"
            readOnly
          />
        </div>
      )}

      {/* 통신사가 선택되면 생년월일 및 이름 입력란 노출 */}
      {isCarrierSelected && (
        <>
          <div className="mt-4">
            <label htmlFor="birthDate" className="block text-sm font-medium">
              생년월일 (YYYYMMDD)
            </label>
            <input
              type="text"
              id="birthDate"
              placeholder="예) 19900101"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full p-2 border rounded mt-1"
            />
          </div>

          {isBirthDateValid && (
            <div className="mt-4">
              <label htmlFor="name" className="block text-sm font-medium">
                이름
              </label>
              <input
                type="text"
                id="name"
                placeholder="이름 입력"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
          )}
        </>
      )}

      {/* CarrierModal을 조건부 렌더링 */}
      {showCarrierModal && (
        <CarrierModal
          setCarrier={setCarrier}
          setShowCarrierModal={setShowCarrierModal}
        />
      )}
    </div>
  );
};

export default PhoneVerificationStep;
