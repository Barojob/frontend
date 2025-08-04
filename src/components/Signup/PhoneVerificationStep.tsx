import React, { useEffect, useRef, useState } from "react";
import DropdownArrowIcon from "../../svgs/DropdownArrowIcon";
import { cn } from "../../utils/classname";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../Drawer";
import Input from "../Input/Input";

type PhoneVerificationStepProps = {
  className?: string;
  onValidityChange: (isValid: boolean) => void;
  verificationSent?: boolean;
  onSendVerification?: () => void;
};

const PhoneVerificationStep: React.FC<PhoneVerificationStepProps> = ({
  className,
  onValidityChange,
  verificationSent = false,
  onSendVerification,
}) => {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [carrier, setCarrier] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [timer, setTimer] = useState(120);

  // 필드 표시 상태
  const [showBirthDateField, setShowBirthDateField] = useState(false);
  const [showPhoneFields, setShowPhoneFields] = useState(false);

  // ref 설정
  const birthDateRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  // 유효성 검사
  const isNameValid = name.trim().length > 0;
  const isBirthDateValid = birthDate.trim().length === 8;
  const isCarrierSelected = carrier.trim() !== "";
  // 전화번호 유효성: 하이픈 제거 후 11자리 숫자인지 확인
  const isPhoneNumberValid = phoneNumber.replace(/[^0-9]/g, "").length === 11;
  const isVerificationCodeValid = verificationCode.length >= 4;

  const isValid = !verificationSent
    ? isNameValid && isBirthDateValid && isCarrierSelected && isPhoneNumberValid
    : isVerificationCodeValid;

  // 통신사 옵션
  const carrierOptions = [
    "KT",
    "LG U+",
    "SKT",
    "KT 알뜰폰",
    "LG U+ 알뜰폰",
    "SKT 알뜰폰",
  ];

  const handleBirthDateChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    if (numericValue.length <= 8) {
      setBirthDate(numericValue);
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

      setPhoneNumber(formattedValue);
    }
  };

  const handleCarrierSelect = (selectedCarrier: string) => {
    console.log("통신사 선택:", selectedCarrier); // 디버깅용
    setCarrier(selectedCarrier);
    // 통신사 선택 후 전화번호 입력란에 포커스
    setTimeout(() => {
      phoneNumberRef.current?.focus();
    }, 200);
  };

  // 인증번호 다시 받기
  const handleResendVerification = () => {
    setTimer(120);
    setVerificationCode("");
    onSendVerification?.();
  };

  // 시간 포맷팅
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
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

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  // 생년월일이 입력되면 휴대폰 관련 필드들 표시
  useEffect(() => {
    if (isBirthDateValid && !showPhoneFields) {
      setShowPhoneFields(true);
    }
  }, [isBirthDateValid, showPhoneFields]);

  // 타이머 관리
  useEffect(() => {
    let countdown: ReturnType<typeof setInterval>;
    if (verificationSent && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [verificationSent, timer]);

  return (
    <div className={cn("", className)}>
      {/* 상단 타이틀 */}
      <div className="mt-8">
        {!verificationSent ? (
          <>
            <div className="text-2xl font-bold text-gray-900">
              휴대폰 인증으로
            </div>
            <div className="mt-1 text-2xl font-bold text-gray-900">
              안전하게 시작해요
            </div>
          </>
        ) : (
          <>
            <div className="text-2xl font-bold text-gray-900">문자로 온</div>
            <div className="mt-1 text-2xl font-bold text-gray-900">
              인증번호를 입력해주세요
            </div>
            <div className="mt-2">
              <div className="text-sm text-gray-600">
                이제 회원가입 절차가 끝났어요
              </div>
            </div>
          </>
        )}
      </div>

      {/* 입력 필드들 */}
      <div className="mt-12 space-y-4">
        {/* 인증번호 발송 전 입력 필드들 */}
        {!verificationSent && (
          <>
            {/* 이름 입력 */}
            <div>
              <label className="mb-2 block text-xl font-medium text-gray-900">
                이름 <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="이름을 입력해주세요"
                value={name}
                onValueChange={setName}
                onBlur={handleNameBlur}
                className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-150 hover:bg-gray-200 focus:outline-none active:scale-[0.95]"
              />
            </div>

            {/* 생년월일 입력 (이름 입력 후 나타남) */}
            {showBirthDateField && (
              <div className="animate-slide-up">
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  생년월일 <span className="text-red-500">*</span>
                </label>
                <Input
                  ref={birthDateRef}
                  type="text"
                  placeholder="YYYYMMDD (8자리)"
                  value={birthDate}
                  onValueChange={handleBirthDateChange}
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
                          <span>{carrier || "통신사"}</span>
                          <DropdownArrowIcon
                            className="text-blue-500"
                            size={12}
                          />
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
                      value={phoneNumber}
                      onValueChange={handlePhoneNumberChange}
                      className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-150 hover:bg-gray-100 focus:outline-none active:scale-[0.95]"
                      inputMode="numeric"
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* 인증번호 입력 (인증번호 발송 후 나타남) */}
        {verificationSent && (
          <div className="animate-slide-up">
            {/* 4자리 인증번호 입력칸 */}
            <div className="mb-4 flex justify-center gap-3">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={verificationCode[index] || ""}
                  onChange={(e) => {
                    const newCode = verificationCode.split("");
                    newCode[index] = e.target.value;
                    const updatedCode = newCode.join("");
                    setVerificationCode(updatedCode);

                    // 자동으로 다음 칸으로 이동
                    if (e.target.value && index < 3) {
                      const target = e.target as HTMLInputElement;
                      const nextInput = target.parentElement?.children[
                        index + 1
                      ] as HTMLInputElement;
                      nextInput?.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    // 백스페이스 시 이전 칸으로 이동
                    if (
                      e.key === "Backspace" &&
                      !verificationCode[index] &&
                      index > 0
                    ) {
                      const target = e.target as HTMLInputElement;
                      const prevInput = target.parentElement?.children[
                        index - 1
                      ] as HTMLInputElement;
                      prevInput?.focus();
                    }
                  }}
                  className="w-17 h-19 rounded-[0.625rem] border border-gray-100 bg-gray-100 text-center text-2xl font-bold transition-all duration-150 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-[0.99]"
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              ))}
            </div>

            {/* 인증번호 다시 받기 */}
            <div className="flex justify-center">
              <button
                onClick={handleResendVerification}
                className="text-xs text-neutral-500 underline transition-all duration-150 hover:text-neutral-700 active:scale-[0.98]"
              >
                인증번호 다시 받기 ({formatTime(timer)})
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneVerificationStep;
