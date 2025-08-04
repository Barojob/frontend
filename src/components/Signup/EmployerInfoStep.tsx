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

type EmployerInfoStepProps = {
  className?: string;
  onValidityChange: (isValid: boolean) => void;
};

const EmployerInfoStep: React.FC<EmployerInfoStepProps> = ({
  className,
  onValidityChange,
}) => {
  const [position, setPosition] = useState("");
  const [emailLocal, setEmailLocal] = useState(""); // @ 앞부분
  const [emailDomain, setEmailDomain] = useState(""); // @ 뒷부분
  const [isCustomDomain, setIsCustomDomain] = useState(false); // 직접 입력 여부
  const [businessNumber, setBusinessNumber] = useState("");

  // 필드 표시 상태
  const [showEmailField, setShowEmailField] = useState(false);
  const [showBusinessNumberField, setShowBusinessNumberField] = useState(false);

  // ref 설정
  const emailLocalRef = useRef<HTMLInputElement>(null);
  const customDomainRef = useRef<HTMLInputElement>(null);
  const businessNumberRef = useRef<HTMLInputElement>(null);

  // 이메일 도메인 옵션
  const emailDomainOptions = ["naver.com", "gmail.com", "daum.net", "nate.com"];

  // 유효성 검사
  const isPositionValid = position.trim().length > 0;
  const fullEmail =
    emailLocal && emailDomain ? `${emailLocal}@${emailDomain}` : "";
  const isEmailValid =
    emailLocal.trim().length > 0 &&
    emailDomain.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fullEmail);
  const isBusinessNumberValid =
    businessNumber.replace(/[^0-9]/g, "").length === 10;

  const isValid = isPositionValid && isEmailValid && isBusinessNumberValid;

  // 사업자 번호 포맷팅 (000-00-00000)
  const handleBusinessNumberChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    if (numericValue.length <= 10) {
      let formattedValue = numericValue;

      if (numericValue.length >= 4 && numericValue.length <= 5) {
        formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
      } else if (numericValue.length >= 6) {
        formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(3, 5)}-${numericValue.slice(5)}`;
      }

      setBusinessNumber(formattedValue);
    }
  };

  // 직함 입력 완료 핸들러
  const handlePositionBlur = () => {
    if (isPositionValid && !showEmailField) {
      setShowEmailField(true);
      setTimeout(() => {
        emailLocalRef.current?.focus();
      }, 200);
    }
  };

  // 이메일 도메인 선택 핸들러
  const handleDomainSelect = (domain: string) => {
    if (domain === "직접 입력") {
      setIsCustomDomain(true);
      setEmailDomain("");
      setTimeout(() => {
        customDomainRef.current?.focus();
      }, 200);
    } else {
      setIsCustomDomain(false);
      setEmailDomain(domain);
    }
  };

  // 이메일 입력 완료 핸들러
  const handleEmailBlur = () => {
    if (isEmailValid && !showBusinessNumberField) {
      setShowBusinessNumberField(true);
      setTimeout(() => {
        businessNumberRef.current?.focus();
      }, 200);
    }
  };

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  // 이메일이 입력되면 사업자 번호 필드 표시
  useEffect(() => {
    if (isEmailValid && !showBusinessNumberField) {
      setShowBusinessNumberField(true);
    }
  }, [isEmailValid, showBusinessNumberField]);

  return (
    <div className={cn("", className)}>
      {/* 상단 타이틀 */}
      <div className="mt-8">
        <div className="text-2xl font-bold text-gray-900">
          정보를 입력해주세요
        </div>
      </div>

      {/* 입력 필드들 */}
      <div className="mt-8 space-y-6">
        {/* 직함 입력 */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-900">
            직함 <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="직함을 입력하세요"
            value={position}
            onValueChange={setPosition}
            onBlur={handlePositionBlur}
            className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-150 hover:bg-gray-200 focus:outline-none active:scale-[0.95]"
          />
        </div>

        {/* 이메일 입력 (직함 입력 후 나타남) */}
        {showEmailField && (
          <div className="animate-slide-up space-y-4">
            <label className="block text-sm font-medium text-gray-900">
              이메일 <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              {/* @ 앞부분 입력 */}
              <div className="flex-1">
                <Input
                  ref={emailLocalRef}
                  type="text"
                  placeholder="이메일 주소"
                  value={emailLocal}
                  onValueChange={setEmailLocal}
                  onBlur={handleEmailBlur}
                  className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-150 hover:bg-gray-100 focus:outline-none active:scale-[0.95]"
                />
              </div>

              {/* @ 기호 */}
              <div className="flex items-center px-2 text-gray-500">@</div>

              {/* @ 뒷부분 - 도메인 선택 또는 직접 입력 */}
              <div className="flex-1">
                {isCustomDomain ? (
                  <Input
                    ref={customDomainRef}
                    type="text"
                    placeholder="도메인 입력"
                    value={emailDomain}
                    onValueChange={setEmailDomain}
                    onBlur={handleEmailBlur}
                    className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-150 hover:bg-gray-100 focus:outline-none active:scale-[0.95]"
                  />
                ) : (
                  <Drawer>
                    <DrawerTrigger asChild>
                      <div className="cursor-pointer">
                        <div className="flex w-full items-center justify-between rounded-lg border-0 bg-gray-100 px-4 py-3 text-gray-900 transition-all duration-150 hover:bg-gray-100 active:scale-[0.98]">
                          <span className="text-gray-500">
                            {emailDomain || "선택"}
                          </span>
                          <DropdownArrowIcon
                            className="text-blue-500"
                            size={12}
                          />
                        </div>
                      </div>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>이메일을 선택해주세요</DrawerTitle>
                      </DrawerHeader>
                      <div className="space-y-2 p-6">
                        {emailDomainOptions.map((domain) => (
                          <DrawerClose
                            key={domain}
                            onClick={() => handleDomainSelect(domain)}
                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-left text-gray-900 transition-all duration-150 hover:bg-gray-50 hover:shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-[0.98]"
                          >
                            {domain}
                          </DrawerClose>
                        ))}
                        <DrawerClose
                          onClick={() => handleDomainSelect("직접 입력")}
                          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-left text-gray-900 transition-all duration-150 hover:bg-gray-50 hover:shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-[0.98]"
                        >
                          직접 입력
                        </DrawerClose>
                      </div>
                    </DrawerContent>
                  </Drawer>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 사업자 번호 입력 (이메일 입력 후 나타남) */}
        {showBusinessNumberField && (
          <div className="animate-slide-up space-y-4">
            <label className="block text-sm font-medium text-gray-900">
              사업자 번호 <span className="text-red-500">*</span>
            </label>
            <Input
              ref={businessNumberRef}
              type="text"
              placeholder="000-00-00000"
              value={businessNumber}
              onValueChange={handleBusinessNumberChange}
              className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-150 hover:bg-gray-100 focus:outline-none active:scale-[0.95]"
              inputMode="numeric"
              maxLength={12}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerInfoStep;
