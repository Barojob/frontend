import Button from "@/components/Button";
import { useSendSms } from "@/hooks/useSendSms";
import useSignupContext from "@/hooks/useSignupContext";
import { useVerifySms } from "@/hooks/useVerifySms";
import { type Nullable } from "@/types/misc";
import { cn } from "@/utils/classname";
import { formatMinuteSecond } from "@/utils/formatters";
import { SECOND } from "@/utils/misc";
import dayjs from "dayjs";
import { range } from "lodash-es";
import React, { useRef, useState } from "react";
import { useHarmonicIntervalFn } from "react-use";

type PhoneVerificationCodeStepProps = {
  className?: string;
  onNext: () => void;
};

const PhoneVerificationCodeStep: React.FC<PhoneVerificationCodeStepProps> = ({
  className,
  onNext,
}) => {
  const {
    personalInfoState: [personalInfo],
    verificationState: [verification, setVerification],
  } = useSignupContext();

  const inputsRef = useRef<HTMLInputElement[]>([]);
  const [remainingSeconds, setRemainingSeconds] = useState(
    getRemainingCountdown(verification.requestedAt),
  );

  const { mutateAsync: sendSmsAsync } = useSendSms();
  const { mutateAsync: verifySmsAsync } = useVerifySms();

  useHarmonicIntervalFn(
    () => setRemainingSeconds(getRemainingCountdown(verification.requestedAt)),
    SECOND,
  );

  const showVerifyButton = verification.code.length === 4;

  return (
    <div className={cn("", className)}>
      <div className="mt-8">
        <div className="text-2xl font-bold text-gray-900">문자로 온</div>
        <div className="mt-1 text-2xl font-bold text-gray-900">
          인증번호를 입력해주세요
        </div>
        <div className="mt-2">
          <div className="text-sm text-gray-600">
            이제 회원가입 절차가 끝났어요
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div>
          <div className="flex justify-center gap-3">
            {range(4).map((index) => (
              <input
                className="h-16 w-16 rounded-lg border border-gray-200 bg-gray-100 text-center text-2xl font-bold transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                key={index}
                ref={(el) => {
                  if (el) {
                    inputsRef.current[index] = el;
                  }
                }}
                type="text"
                maxLength={1}
                value={verification.code.padEnd(4, "")[index] || ""}
                inputMode="numeric"
                onKeyDown={handleBackspaceKey(index)}
                onChange={handleInputChange(index)}
              />
            ))}
          </div>

          <div className="mt-4 flex justify-center">
            <button
              className="text-xs text-neutral-500 underline disabled:cursor-not-allowed disabled:text-neutral-300"
              disabled={remainingSeconds > 0}
              onClick={handleResendSms}
            >
              인증번호 다시 받기 ({formatMinuteSecond(remainingSeconds)})
            </button>
          </div>
        </div>
      </div>

      {showVerifyButton && (
        <div className="animate-slide-up fixed-bottom-button">
          <Button size="md" theme="primary" block onClick={handleVerifySms}>
            다음
          </Button>
        </div>
      )}
    </div>
  );

  function handleInputChange(index: number) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const isEmpty = event.target.value.length === 0;
      const isLastIndex = index === 3;
      const continueToNextInput = !isEmpty && !isLastIndex;

      if (continueToNextInput) {
        inputsRef.current[index + 1]?.focus();
      }

      const code = verification.code.padEnd(4, "").split("");
      code[index] = event.target.value;

      setVerification((prev) => ({
        ...prev,
        code: code.join(""),
      }));
    };
  }

  function handleBackspaceKey(index: number) {
    return (event: React.KeyboardEvent<HTMLInputElement>) => {
      const isBackspace = event.key === "Backspace";
      const isFirstIndex = index === 0;

      if (!isBackspace || isFirstIndex) {
        return;
      }

      event.currentTarget.value = "";
      inputsRef.current[index - 1]?.focus();
    };
  }

  async function handleResendSms() {
    try {
      await sendSmsAsync({ phoneNumber: personalInfo.phoneNumber });

      setVerification((prev) => ({
        ...prev,
        requestedAt: new Date(),
      }));
    } catch (error) {
      console.error("Failed to send SMS", error);
    }
  }

  async function handleVerifySms() {
    try {
      const result = await verifySmsAsync({
        phoneNumber: personalInfo.phoneNumber,
        code: verification.code,
      });

      if (!result) {
        // TODO: handle validation error, show error modal
        console.debug("Code does not match");
        return;
      }

      onNext();
    } catch (error) {
      console.error("Error occured in our BE server", error);
    }
  }
};

function getRemainingCountdown(requestedAt: Nullable<Date>) {
  const validUntil = dayjs(requestedAt).add(5, "minutes");
  const remaningSeconds = Math.max(0, validUntil.diff(dayjs(), "seconds"));
  return remaningSeconds;
}

export default PhoneVerificationCodeStep;
