import Button from "@/components/Button";
import Input from "@/components/Input";
import PresenceTransition from "@/components/PresenceTransition";
import SelectCarrierDrawer from "@/components/SelectCarrierDrawer";
import { usePersonalInfoForm } from "@/hooks/usePersonalInfoForm";
import { useSendSms } from "@/hooks/useSendSms";
import useSignupContext from "@/hooks/useSignupContext";
import { cn } from "@/utils/classname";
import React, { useRef } from "react";

type PersonalInfoStepProps = {
  className?: string;
  onNextStep: () => void;
};

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  className,
  onNextStep,
}) => {
  const birthDateRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  const {
    isValidForm,
    nameField: { isValid: isValidName, value: name, onChange: onNameChange },
    birthDateField: {
      isValid: isValidBirthDate,
      value: birthDate,
      onChange: onBirthDateChange,
    },
    carrierField: { value: carrier, onChange: onCarrierChange },
    phoneNumberField: { value: phoneNumber, onChange: onPhoneNumberChange },
  } = usePersonalInfoForm();

  const {
    verificationState: [, setVerification],
  } = useSignupContext();

  const {
    mutateAsync: sendSmsAsync,
    isPending: pendingSendSms,
    isSuccess: successSendSms,
  } = useSendSms();

  return (
    <form className={cn("pt-8", className)} onSubmit={handleSubmit}>
      <p className="whitespace-pre-line text-2xl font-bold text-gray-900">{`휴대폰 인증으로\n안전하게 시작해요`}</p>

      <section className="mt-12 space-y-4">
        <div className="space-y-2">
          <label className="block space-x-1" htmlFor="name">
            <span className="text-xl font-medium text-gray-900">이름</span>
            <span className="text-sm text-red-500">*</span>
          </label>
          <Input
            className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3"
            id="name"
            type="text"
            placeholder="이름을 입력해주세요"
            value={name}
            onValueChange={onNameChange}
          />
        </div>

        <PresenceTransition
          transitionKey={isValidName.toString()}
          variant="subtleRise"
        >
          {isValidName && (
            <div className="space-y-2">
              <label className="block space-x-1" htmlFor="birth-date">
                <span className="text-sm font-medium text-gray-900">
                  생년월일
                </span>
                <span className="text-sm text-red-500">*</span>

                {birthDate.length > 0 && !isValidBirthDate && (
                  <span className="ml-2 text-xs text-red-500">
                    8자리로 입력해주세요!
                  </span>
                )}
              </label>
              <Input
                className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3"
                ref={birthDateRef}
                id="birth-date"
                type="text"
                placeholder="YYYYMMDD (8자리)"
                value={birthDate}
                inputMode="numeric"
                maxLength={8}
                onValueChange={onBirthDateChange}
              />
            </div>
          )}
        </PresenceTransition>

        <PresenceTransition
          transitionKey={isValidBirthDate.toString()}
          variant="subtleRise"
        >
          {isValidBirthDate && (
            <div className="space-y-2">
              <label className="block space-x-1" htmlFor="phone-number">
                <span className="text-sm font-medium text-gray-900">
                  휴대폰 번호
                </span>
                <span className="text-sm text-red-500">*</span>
              </label>

              <div className="flex items-center gap-x-2">
                <SelectCarrierDrawer
                  className="flex-1"
                  value={carrier}
                  onSelect={onCarrierChange}
                />
                <div className="flex-3">
                  <Input
                    className="rounded-lg border-0 bg-gray-100 px-4 py-3"
                    ref={phoneNumberRef}
                    id="phone-number"
                    type="tel"
                    inputMode="numeric"
                    placeholder="전화번호 입력"
                    value={phoneNumber}
                    onValueChange={onPhoneNumberChange}
                  />
                </div>
              </div>
            </div>
          )}
        </PresenceTransition>
      </section>

      <PresenceTransition
        className="fixed-bottom-button"
        transitionKey={isValidForm.toString()}
        variant="subtleRise"
      >
        {isValidForm && (
          <Button
            size="md"
            theme="primary"
            block
            type="submit"
            loading={pendingSendSms || successSendSms}
            disabled={pendingSendSms || successSendSms}
          >
            인증번호 받기
          </Button>
        )}
      </PresenceTransition>
    </form>
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      console.log("SMS 전송 시도:", phoneNumber);
      await sendSmsAsync({ phoneNumber });

      console.log("SMS 전송 성공, 다음 단계로 이동");
      setVerification((prev) => ({
        ...prev,
        requestedAt: new Date(),
      }));
      onNextStep();
    } catch (error) {
      console.error("SMS 전송 실패:", error);
      // TODO: 사용자에게 에러 알림 표시
      alert("인증번호 전송에 실패했습니다. 다시 시도해주세요.");
    }
  }
};

export default PersonalInfoStep;
