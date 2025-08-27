import Button from "@/components/Button";
import Input from "@/components/Input";
import PresenceTransition from "@/components/PresenceTransition";
import SelectCarrierDrawer from "@/components/SelectCarrierDrawer";
import { usePersonalInfoForm } from "@/hooks/usePersonalInfoForm";
import { SignupStep } from "@/types/signup";
import { cn } from "@/utils/classname";
import { formatPhoneNumber } from "@/utils/formatters";
import React, { useEffect, useRef } from "react";

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
    if (showBirthDateField) {
      birthDateRef.current?.focus();
    }
  }, [showBirthDateField]);

  useEffect(() => {
    if (showPhoneFields) {
      phoneNumberRef.current?.focus();
    }
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
            <label
              className="block text-sm font-medium text-gray-900"
              htmlFor="phone-number"
            >
              휴대폰 번호 <span className="text-red-500">*</span>
            </label>

            <div className="flex items-center gap-2">
              <SelectCarrierDrawer
                value={personalInfo.carrier}
                onSelect={handleCarrierSelect}
              />

              <Input
                className="flex-3 w-full rounded-lg border-0 bg-gray-100 px-4 py-3"
                ref={phoneNumberRef}
                id="phone-number"
                type="tel"
                inputMode="numeric"
                placeholder="전화번호 입력"
                value={personalInfo.phoneNumber}
                onValueChange={handlePhoneNumberChange}
              />
            </div>
          </div>
        )}
      </div>

      <PresenceTransition
        className="fixed-bottom-button"
        transitionKey={isFormValid.toString()}
        variant="subtleRise"
      >
        {isFormValid && (
          <Button
            size="md"
            theme="primary"
            block
            onClick={() => setCurrentStep(SignupStep.PHONE_VERIFICATION)}
          >
            인증번호 받기
          </Button>
        )}
      </PresenceTransition>
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
