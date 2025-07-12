import React, { useEffect, useRef, useState } from "react";
import useSessionStorage from "../../hooks/useSessonStorage";
import { cn } from "../../utils/classname";
import Input from "../Input/Input";
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
  const [phoneNumber, setPhoneNumber] = useSessionStorage("phoneNumber", "");
  const [carrier, setCarrier] = useSessionStorage("carrier", "");
  const [birthDate, setBirthDate] = useSessionStorage("birthDate", "");
  const [gender, setGender] = useSessionStorage("gender", "");
  const [name, setName] = useSessionStorage("name", "");
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

  const handleBirthDateChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    if (numericValue.length <= 6) {
      setBirthDate(numericValue);
    }
  };

  const handleGenderChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    if (numericValue.length <= 1) {
      setGender(numericValue);
    }
  };

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  // 전화번호가 유효하면 통신사 필드를 나타내고 모달을 열며, 전화번호 입력 필드는 블러 처리
  useEffect(() => {
    const AUTO_MODAL_FLAG = "autoModalShown";
    if (isPhoneValid && !showCarrierField) {
      if (!sessionStorage.getItem(AUTO_MODAL_FLAG)) {
        // 최초: 모달 자동 열림
        setShowCarrierField(true);
        setShowCarrierModal(true);
        sessionStorage.setItem(AUTO_MODAL_FLAG, "true");
        phoneNumberRef.current?.blur();
      } else {
        // 뒤로 돌아온 경우: 필드는 보여주되 모달은 자동으로 열리지 않음
        setShowCarrierField(true);
      }
    }
  }, [isPhoneValid, showCarrierField]);

  // 통신사가 선택되면 생년월일 필드를 나타내고, 생년월일이 비어있을 경우에만 focus
  useEffect(() => {
    if (isCarrierSelected && !showBirthDateField) {
      setShowBirthDateField(true);
      if (birthDate.trim() === "") {
        setTimeout(() => {
          birthDateRef.current?.focus();
        }, 500);
      }
    }
  }, [isCarrierSelected, showBirthDateField, birthDate]);

  // 생년월일이 6자리 완성되면, 성별 입력이 비어있을 경우에만 focus
  useEffect(() => {
    if (birthDate.trim().length === 6 && gender.trim().length === 0) {
      setTimeout(() => {
        genderRef.current?.focus();
      }, 200);
    }
  }, [birthDate, gender]);

  // 성별이 유효해지면 이름 필드를 나타내되, 이름이 비어있을 경우에만 focus
  useEffect(() => {
    if (isGenderValid && !showNameField) {
      setShowNameField(true);
      if (!isNameValid) {
        setTimeout(() => {
          nameRef.current?.focus();
        }, 200);
      }
    }
  }, [isGenderValid, showNameField, isNameValid]);

  return (
    <div className={cn("", className)}>
      <div className="text-extraBlack-1 mt-7 text-2xl font-black">
        휴대폰 인증
      </div>
      <div className="mb-5 mt-1 text-base text-gray-500">
        최초 1회 휴대폰 인증이 필요합니다.
      </div>

      {/* 추가 입력 필드들 (위에서부터: 이름 → 생년월일 및 성별 → 통신사) */}
      <div className="mb-4 space-y-4">
        {showNameField && (
          <div className="input-slide-up">
            <LabelInput
              ref={nameRef}
              type="text"
              label="이름"
              placeholder="이름 입력"
              value={name}
              onValueChange={setName}
              rounded="md"
              className="text-extraBlack-1 font-normal placeholder-gray-300 focus:border-gray-500"
            />
          </div>
        )}

        {showBirthDateField && (
          <div className="input-slide-up flex flex-col rounded-md border border-gray-200 p-2 pr-5 focus-within:border-gray-500">
            <div className="px-1 text-xs font-normal text-gray-400">
              생년월일 및 성별
            </div>
            <div className="flex">
              <Input
                className="text-extraBlack-1 border-none px-1 pb-0 pt-0.5 [appearance:textfield] placeholder:text-gray-300 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                placeholder="생년월일"
                type="number"
                ref={birthDateRef}
                value={birthDate}
                onValueChange={handleBirthDateChange}
                inputMode="numeric"
                pattern="\d*"
                maxLength={6}
              />
              <div className="text-extraBlack-1">-</div>
              <Input
                className="text-extraBlack-1 w-9 border-none pb-0 pl-3 pt-0.5 text-left [appearance:textfield] placeholder:text-gray-300 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                placeholder="0"
                type="number"
                ref={genderRef}
                value={gender}
                onValueChange={handleGenderChange}
                inputMode="numeric"
                pattern="\d*"
                maxLength={1}
              />
              <div className="flex items-center text-nowrap pt-0.5">
                ● ● ● ● ● ●
              </div>
            </div>
          </div>
        )}

        {showCarrierField && (
          <div
            className="input-slide-up"
            onClick={() => setShowCarrierModal(true)}
          >
            <LabelInput
              type="text"
              label="통신사"
              placeholder="통신사 선택"
              value={carrier}
              onValueChange={setCarrier}
              rounded="md"
              className="placeholder-text-gray-300 text-extraBlack-1 focus:border-gray-500"
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
          className="text-extraBlack-1 placeholder:text-gray-300 focus:border-gray-500"
        />
      </div>

      {/* FIXME: replace this with <Drawer /> when it's implemented */}
      <CarrierModal
        onSelect={setCarrier}
        visible={showCarrierModal}
        onClose={handleCarrierModalClose}
      />
    </div>
  );

  function handleCarrierModalClose() {
    setShowCarrierModal(false);
  }
};

export default PhoneVerificationStep;
