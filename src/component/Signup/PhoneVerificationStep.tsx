import React, { useState, useEffect, useRef } from "react";
import { cn } from "../../utils/classname";
import LabelInput from "../Input/LabelInput";
import CarrierModal from "./CarrierModal";
import Input from "../Input/Input";

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
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [showCarrierModal, setShowCarrierModal] = useState(false);

  // 각 필드가 한 번 나타났는지 여부 (한 번 나타나면 계속 보임)
  const [showCarrierField, setShowCarrierField] = useState(false);
  const [showBirthDateField, setShowBirthDateField] = useState(false);
  const [showNameField, setShowNameField] = useState(false);

  // ref 설정 (LabelInput은 forwardRef를 지원해야 함)
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const birthDateRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  // 유효성 체크: 전화번호는 '-' 포함 13자 이상 (예: 010-1234-5678)
  const isPhoneValid = phoneNumber.trim().length >= 13;
  const isCarrierSelected = carrier.trim() !== "";
  const isBirthDateValid = birthDate.trim().length === 6;
  const isGenderValid = gender.trim().length === 1;
  const isNameValid = name.trim().length > 0;
  const isValid =
    isPhoneValid &&
    isCarrierSelected &&
    isBirthDateValid &&
    isGenderValid &&
    isNameValid;

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
      }, 500); // 애니메이션이 끝나는 시간 후 focus
    }
  }, [isCarrierSelected, showBirthDateField]);

  // 생년월일이 6자리 완성되면 성별 필드로 focus
  useEffect(() => {
    if (birthDate.trim().length === 6 && gender.trim().length === 0) {
      setTimeout(() => {
        genderRef.current?.focus();
      }, 200);
    }
  }, [birthDate, gender]);

  // 성별이 유효하면 이름 필드를 나타내고 focus
  useEffect(() => {
    if (isGenderValid && !showNameField) {
      setShowNameField(true);
      setTimeout(() => {
        nameRef.current?.focus();
      }, 500);
    }
  }, [isGenderValid, showNameField]);

  return (
    <div className={cn("", className)}>
      <div className="mt-7 font-black text-2xl text-black">휴대폰 인증</div>
      <div className="mt-1 text-base text-gray-500 mb-5">
        최초 1회 휴대폰 인증이 필요합니다.
      </div>

      {/* 추가 입력 필드들이 전화번호 입력 필드 위쪽에 나타남 
          (위에서부터: 이름 → 생년월일 및 성별 → 통신사) */}
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
              className="text-extraBlack-1 focus:border-gray-500 placeholder-gray-300"
            />
          </div>
        )}

        {showBirthDateField && (
          <div className="flex flex-col animate-slide-up border border-gray-200 focus-within:border-gray-500 rounded-md p-2 pr-5">
            <div className="px-1 text-gray-400 text-xs font-normal">
              생년월일 및 성별
            </div>
            <div className="flex">
              <Input
                className="px-1 pt-0.5 pb-0 border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder:text-gray-300 text-extraBlack-1"
                placeholder="생년월일"
                type="number"
                ref={birthDateRef}
                value={birthDate}
                onValueChange={setBirthDate}
                inputMode="numeric"
                maxLength={6}
              />
              <div className="text-extraBlack-1">-</div>
              <Input
                className="text-left pl-3 w-9 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pt-0.5 pb-0 border-none placeholder:text-gray-300 text-extraBlack-1"
                placeholder="0"
                type="number"
                ref={genderRef}
                value={gender}
                onValueChange={setGender}
                inputMode="numeric"
                maxLength={1}
              />
              <div className="text-nowrap items-center flex pt-0.5">
                ● ● ● ● ● ●
              </div>
            </div>
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
              onValueChange={setCarrier}
              rounded="md"
              className="text-extraBlack-1 focus:border-gray-500 placeholder-text-gray-300"
              readOnly
              inputMode="none"
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
          className="text-extraBlack-1 focus:border-gray-500 placeholder:text-gray-300"
        />
      </div>

      {/* 통신사 모달 (하단에서 슬라이드업, 외부 클릭 시 닫힘) */}
      {showCarrierModal && (
        <CarrierModal
          setCarrier={(selectedCarrier) => {
            setCarrier(selectedCarrier);
          }}
          setShowCarrierModal={setShowCarrierModal}
        />
      )}
    </div>
  );
};

export default PhoneVerificationStep;
