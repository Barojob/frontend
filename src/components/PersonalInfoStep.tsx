import React, { useEffect, useRef, useState } from "react";
import useSignupContext from "../hooks/useSignupContext";
import DropdownArrowIcon from "../svgs/DropdownArrowIcon";
import { SignupStep } from "../types/signup";
import { cn } from "../utils/classname";
import Button from "./Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./Drawer";
import Input from "./Input";

type PersonalInfoStepProps = {
  className?: string;
  onValidityChange: (isValid: boolean) => void;
};

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  className,
  onValidityChange,
}) => {
  const {
    personalInfoState: [personalInfo, setPersonalInfo],
    stepState: [, setCurrentStep],
  } = useSignupContext();

  // 필드 표시 상태
  const [showBirthDateField, setShowBirthDateField] = useState(false);
  const [showPhoneFields, setShowPhoneFields] = useState(false);
  const [showBirthDateError, setShowBirthDateError] = useState(false);

  // ref 설정
  const birthDateRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  // 유효성 검사
  const isNameValid = personalInfo.name.trim().length > 0;
  const isBirthDateValid = personalInfo.birthDate.trim().length === 8;
  const isCarrierSelected = personalInfo.carrier.trim() !== "";
  // 전화번호 유효성: 하이픈 제거 후 11자리 숫자인지 확인
  const isPhoneNumberValid =
    personalInfo.phoneNumber.replace(/[^0-9]/g, "").length === 11;

  const isValid =
    isNameValid && isBirthDateValid && isCarrierSelected && isPhoneNumberValid;

  // 통신사 옵션
  const carrierOptions = [
    "KT",
    "LG U+",
    "SKT",
    "KT 알뜰폰",
    "LG U+ 알뜰폰",
    "SKT 알뜰폰",
  ];

  const handleNameChange = (value: string) => {
    setPersonalInfo((prev) => ({ ...prev, name: value }));
  };

  const handleBirthDateChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    if (numericValue.length <= 8) {
      setPersonalInfo((prev) => ({ ...prev, birthDate: numericValue }));
      // 생년월일이 변경되면 에러 상태 초기화
      if (showBirthDateError) {
        setShowBirthDateError(false);
      }
    }
  };

  const handlePhoneNumberChange = (value: string) => {
    // 숫자만 추출
    const numericValue = value.replace(/[^0-9]/g, "");

    // 최대 11자리까지만 허용
    if (numericValue.length <= 11) {
      let formattedValue = numericValue;

      // 자동 하이픈 추가
      if (numericValue.length >= 4 && numericValue.length <= 7) {
        formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
      } else if (numericValue.length >= 8) {
        formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(3, 7)}-${numericValue.slice(7)}`;
      }

      setPersonalInfo((prev) => ({ ...prev, phoneNumber: formattedValue }));
    }
  };

  const handleCarrierSelect = (selectedCarrier: string) => {
    setPersonalInfo((prev) => ({ ...prev, carrier: selectedCarrier }));
    // 통신사 선택 후 전화번호 입력란에 포커스
    setTimeout(() => {
      phoneNumberRef.current?.focus();
    }, 200);
  };

  // 인증번호 받기 버튼 클릭
  const handleSendVerification = () => {
    // 다음 스텝(인증번호 입력)으로 이동
    setCurrentStep(SignupStep.PHONE_VERIFICATION);
  };

  // 이름 입력 완료 핸들러
  const handleNameBlur = () => {
    if (isNameValid && !showBirthDateField) {
      setShowBirthDateField(true);
      setTimeout(() => {
        birthDateRef.current?.focus();
      }, 200);
    }
  };

  // 생년월일 입력 완료 핸들러
  const handleBirthDateBlur = () => {
    // 생년월일이 입력되었지만 8자리가 아니면 에러 표시
    if (personalInfo.birthDate.length > 0 && !isBirthDateValid) {
      setShowBirthDateError(true);
    } else {
      setShowBirthDateError(false);
    }
  };

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  // 컴포넌트 마운트 시 또는 personalInfo 변경 시 이미 입력된 정보가 있으면 해당 필드들 표시
  useEffect(() => {
    // 이름이 입력되어 있으면 생년월일 필드 표시
    if (personalInfo.name.trim().length > 0 && !showBirthDateField) {
      setShowBirthDateField(true);
    }

    // 생년월일이 입력되어 있으면 휴대폰 필드 표시
    if (personalInfo.birthDate.trim().length > 0 && !showPhoneFields) {
      setShowPhoneFields(true);
    }
  }, [
    personalInfo.name,
    personalInfo.birthDate,
    showBirthDateField,
    showPhoneFields,
  ]);

  // 생년월일이 입력되면 휴대폰 관련 필드들 표시
  useEffect(() => {
    if (isBirthDateValid && !showPhoneFields) {
      setShowPhoneFields(true);
    }
  }, [isBirthDateValid, showPhoneFields]);

  return (
    <div className={cn("", className)}>
      {/* 상단 타이틀 */}
      <div className="mt-8">
        <div className="text-2xl font-bold text-gray-900">휴대폰 인증으로</div>
        <div className="mt-1 text-2xl font-bold text-gray-900">
          안전하게 시작해요
        </div>
      </div>

      {/* 입력 필드들 */}
      <div className="mt-12 space-y-4">
        {/* 이름 입력 */}
        <div>
          <label className="mb-2 block text-xl font-medium text-gray-900">
            이름 <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="이름을 입력해주세요"
            value={personalInfo.name}
            onValueChange={handleNameChange}
            onBlur={handleNameBlur}
            className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-150 hover:bg-gray-200 focus:outline-none active:scale-[0.95]"
          />
        </div>

        {/* 생년월일 입력 (이름 입력 후 나타남) */}
        {showBirthDateField && (
          <div className="animate-slide-up">
            <label className="mb-2 block text-sm font-medium text-gray-900">
              생년월일 <span className="text-red-500">*</span>
              {showBirthDateError && (
                <span className="ml-2 text-xs text-red-500">
                  8자리로 입력해주세요!
                </span>
              )}
            </label>
            <Input
              ref={birthDateRef}
              type="text"
              placeholder="YYYYMMDD (8자리)"
              value={personalInfo.birthDate}
              onValueChange={handleBirthDateChange}
              onBlur={handleBirthDateBlur}
              className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-150 hover:bg-gray-100 focus:outline-none active:scale-[0.95]"
              inputMode="numeric"
              maxLength={8}
            />
          </div>
        )}

        {/* 휴대폰 번호 입력 (생년월일 입력 후 나타남) */}
        {showPhoneFields && (
          <div className="animate-slide-up space-y-4">
            <label className="block text-sm font-medium text-gray-900">
              휴대폰 번호 <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              {/* 통신사 선택 (1/3 비율) */}
              <Drawer>
                <DrawerTrigger asChild>
                  <div className="flex-1 cursor-pointer">
                    <div className="flex w-full items-center justify-between rounded-lg border-0 bg-gray-100 px-4 py-3 text-gray-900 transition-all duration-150 hover:bg-gray-100 active:scale-[0.98]">
                      <span>{personalInfo.carrier || "통신사"}</span>
                      <DropdownArrowIcon className="text-blue-500" size={12} />
                    </div>
                  </div>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>통신사 선택</DrawerTitle>
                  </DrawerHeader>
                  <div className="space-y-2 p-6">
                    {carrierOptions.map((option) => (
                      <DrawerClose
                        key={option}
                        onClick={() => {
                          handleCarrierSelect(option);
                        }}
                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-left text-gray-900 transition-all duration-150 hover:bg-gray-50 hover:shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-[0.98]"
                      >
                        {option}
                      </DrawerClose>
                    ))}
                  </div>
                </DrawerContent>
              </Drawer>

              {/* 전화번호 입력 (2/3 비율) */}
              <div className="flex-2" style={{ flex: 2 }}>
                <Input
                  ref={phoneNumberRef}
                  type="tel"
                  placeholder="전화번호 입력"
                  value={personalInfo.phoneNumber}
                  onValueChange={handlePhoneNumberChange}
                  className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-150 hover:bg-gray-100 focus:outline-none active:scale-[0.95]"
                  inputMode="numeric"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 인증번호 받기 버튼 */}
      {isNameValid &&
        isBirthDateValid &&
        isCarrierSelected &&
        isPhoneNumberValid && (
          <div className="animate-slide-up fixed-bottom-button">
            <Button
              size="md"
              theme="primary"
              onClick={handleSendVerification}
              className="w-full transition-transform duration-150 active:scale-[0.95]"
            >
              인증번호 받기
            </Button>
          </div>
        )}
    </div>
  );
};

export default PersonalInfoStep;
