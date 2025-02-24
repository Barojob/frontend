import React, { useState, useEffect, useRef } from "react";
import { cn } from "../../utils/classname";
import LabelInput from "../Input/LabelInput";
import CarrierModal from "./CarrierModal";

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

  // 각 필드가 한 번 나타났는지 여부 (한번 나타나면 계속 보임)
  const [showCarrierField, setShowCarrierField] = useState(false);
  const [showBirthDateField, setShowBirthDateField] = useState(false);
  const [showNameField, setShowNameField] = useState(false);

  // ref 설정 (LabelInput은 forwardRef를 지원해야 함)
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const birthDateRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  // 유효성 체크: 전화번호는 '-' 포함 13자 이상 (예: 010-1234-5678)
  const isPhoneValid = phoneNumber.trim().length >= 13;
  const isCarrierSelected = carrier.trim() !== "";
  const isBirthDateValid = birthDate.trim().length === 8;
  const isNameValid = name.trim().length > 0;
  const isValid =
    isPhoneValid && isCarrierSelected && isBirthDateValid && isNameValid;

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  // 전화번호가 유효하면 통신사 필드를 나타내고 모달을 열며, 전화번호 입력 필드는 블러 처리
  useEffect(() => {
    if (isPhoneValid && !showCarrierField) {
      setShowCarrierField(true);
      setShowCarrierModal(true);
      phoneNumberRef.current?.blur();
    }
  }, [isPhoneValid, showCarrierField]);

  // 통신사가 선택되면 생년월일 필드를 나타내고, 애니메이션 후 focus
  useEffect(() => {
    if (isCarrierSelected && !showBirthDateField) {
      setShowBirthDateField(true);
      setTimeout(() => {
        birthDateRef.current?.focus();
      }, 300); // 애니메이션이 끝나는 시간 후 focus
    }
  }, [isCarrierSelected, showBirthDateField]);

  // 생년월일이 유효하면 이름 필드를 나타내고 focus
  useEffect(() => {
    if (isBirthDateValid && !showNameField) {
      setShowNameField(true);
      setTimeout(() => {
        nameRef.current?.focus();
      }, 300);
    }
  }, [isBirthDateValid, showNameField]);

  return (
    <div className={cn("", className)}>
      <div className="mt-7 font-black text-2xl text-black">휴대폰 인증</div>
      <div className="mt-1 text-base text-gray-500 mb-5">
        최초 1회 휴대폰 인증이 필요합니다.
      </div>

      {/* 추가 입력 필드들이 전화번호 입력 필드 위쪽에 나타남 
          (위에서부터: 이름 → 생년월일 → 통신사) */}
      <div className="mb-4 space-y-4">
        {showNameField && (
          <div className="animate-slide-up">
            <LabelInput
              ref={nameRef}
              type="text"
              label="이름"
              placeholder="이름 입력"
              value={name}
              onValueChange={setName}
              rounded="md"
              className="text-black-1 focus:border-gray-500 placeholder-gray-300"
            />
          </div>
        )}

        {showBirthDateField && (
          <div className="animate-slide-up">
            <LabelInput
              ref={birthDateRef}
              type="text"
              label="생년월일 (YYYYMMDD)"
              placeholder="예) 19900101"
              value={birthDate}
              onValueChange={setBirthDate}
              rounded="md"
              className="text-black-1 focus:border-gray-500 placeholder-gray-300"
              inputMode="numeric" // 숫자 전용 키패드
            />
          </div>
        )}

        {showCarrierField && (
          <div
            className="animate-slide-up"
            onClick={() => setShowCarrierModal(true)}
          >
            <LabelInput
              type="text"
              label="통신사"
              placeholder="통신사 선택"
              value={carrier}
              onValueChange={() => {}}
              rounded="md"
              className="text-black-1 focus:border-gray-500 placeholder-gray-300"
              readOnly
              inputMode="none" // 키보드 아예 뜨지 않도록 설정
            />
          </div>
        )}
      </div>

      {/* 전화번호 입력 필드는 항상 하단에 위치 */}
      <div className="mt-4">
        <LabelInput
          ref={phoneNumberRef}
          type="tel"
          label="휴대폰 번호"
          placeholder="휴대폰번호( - 없이 숫자만 입력)"
          value={phoneNumber}
          onValueChange={setPhoneNumber}
          rounded="md"
          className="text-black-1 focus:border-gray-500 placeholder-gray-300"
        />
      </div>

      {/* 통신사 모달 (하단에서 슬라이드업, 외부 클릭 시 닫힘) */}
      {showCarrierModal && (
        <CarrierModal
          setCarrier={(selectedCarrier) => {
            setCarrier(selectedCarrier);
            setShowCarrierModal(false);
          }}
          setShowCarrierModal={setShowCarrierModal}
        />
      )}
    </div>
  );
};

export default PhoneVerificationStep;
