import React, { useEffect, useRef } from "react";
import Button from "../../components/Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/Drawer";
import Input from "../../components/Input";
import { CARRIER_OPTIONS } from "../../fixtures/signup";
import { usePersonalInfoForm } from "../../hooks/usePersonalInfoForm";
import DropdownArrowIcon from "../../svgs/DropdownArrowIcon";
import { SignupStep } from "../../types/signup";
import { cn } from "../../utils/classname";
import { formatPhoneNumber } from "../../utils/formatters";

type PersonalInfoStepProps = {
  className?: string;
  onValidityChange: (isValid: boolean) => void;
};

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  className,
  onValidityChange,
}) => {
  const {
    personalInfo,
    setPersonalInfo,
    setCurrentStep,
    showBirthDateField,
    showPhoneFields,
    showBirthDateError,
    setShowBirthDateError,
    isFormValid,
    isBirthDateValid,
  } = usePersonalInfoForm(onValidityChange);

  const birthDateRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showBirthDateField) birthDateRef.current?.focus();
  }, [showBirthDateField]);

  useEffect(() => {
    if (showPhoneFields) phoneNumberRef.current?.focus();
  }, [showPhoneFields]);

  return (
    <div className={cn("", className)}>
      <div className="mt-8">
        <div className="text-2xl font-bold text-gray-900">휴대폰 인증으로</div>
        <div className="mt-1 text-2xl font-bold text-gray-900">
          안전하게 시작해요
        </div>
      </div>

      <div className="mt-12 space-y-4">
        <div>
          <label className="mb-2 block text-xl font-medium text-gray-900">
            이름 <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="이름을 입력해주세요"
            value={personalInfo.name}
            onValueChange={(value) =>
              setPersonalInfo((prev) => ({ ...prev, name: value }))
            }
            className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3"
          />
        </div>

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
              className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3"
              inputMode="numeric"
              maxLength={8}
            />
          </div>
        )}

        {showPhoneFields && (
          <div className="animate-slide-up space-y-4">
            <label className="block text-sm font-medium text-gray-900">
              휴대폰 번호 <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              <Drawer>
                <DrawerTrigger asChild>
                  <button className="flex flex-1 items-center justify-between rounded-lg bg-gray-100 px-4 py-3 text-left">
                    <span>{personalInfo.carrier || "통신사"}</span>
                    <DropdownArrowIcon className="text-blue-500" size={12} />
                  </button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>통신사 선택</DrawerTitle>
                  </DrawerHeader>
                  <div className="space-y-2 p-6">
                    {CARRIER_OPTIONS.map((option) => (
                      <DrawerClose key={option} asChild>
                        <button
                          onClick={() => handleCarrierSelect(option)}
                          className="w-full rounded-lg border p-3 text-left hover:bg-gray-50"
                        >
                          {option}
                        </button>
                      </DrawerClose>
                    ))}
                  </div>
                </DrawerContent>
              </Drawer>

              <div className="flex-2" style={{ flex: 2 }}>
                <Input
                  ref={phoneNumberRef}
                  type="tel"
                  placeholder="전화번호 입력"
                  value={personalInfo.phoneNumber}
                  onValueChange={handlePhoneNumberChange}
                  className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3"
                  inputMode="numeric"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {isFormValid && (
        <div className="animate-slide-up fixed-bottom-button">
          <Button
            size="md"
            theme="primary"
            onClick={() => setCurrentStep(SignupStep.PHONE_VERIFICATION)}
            className="w-full"
          >
            인증번호 받기
          </Button>
        </div>
      )}
    </div>
  );

  function handleBirthDateChange(value: string) {
    const numericValue = value.replace(/[^0-9]/g, "");
    setPersonalInfo((prev) => ({ ...prev, birthDate: numericValue }));
    if (showBirthDateError) {
      setShowBirthDateError(false);
    }
  }

  function handleBirthDateBlur() {
    if (personalInfo.birthDate.length > 0 && !isBirthDateValid) {
      setShowBirthDateError(true);
    } else {
      setShowBirthDateError(false);
    }
  }

  function handlePhoneNumberChange(value: string) {
    const formattedValue = formatPhoneNumber(value);
    setPersonalInfo((prev) => ({ ...prev, phoneNumber: formattedValue }));
  }

  function handleCarrierSelect(selectedCarrier: string) {
    setPersonalInfo((prev) => ({ ...prev, carrier: selectedCarrier }));
    phoneNumberRef.current?.focus();
  }
};

export default PersonalInfoStep;
