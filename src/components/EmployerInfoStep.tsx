import Button from "@/components/Button";
import {
  DeprecatedDrawer,
  DeprecatedDrawerClose,
  DeprecatedDrawerContent,
  DeprecatedDrawerHeader,
  DeprecatedDrawerTitle,
  DeprecatedDrawerTrigger,
} from "@/components/DeprecatedDrawer";
import Input from "@/components/Input";
import { EMAIL_DOMAIN_OPTIONS } from "@/fixtures/signup";
import { useEmployerInfoForm } from "@/hooks/useEmployerInfoForm";
import DropdownArrowIcon from "@/svgs/DropdownArrowIcon";
import { SignupStep } from "@/types/signup";
import { cn } from "@/utils/classname";
import { formatBusinessNumber } from "@/utils/formatters";
import React, { useEffect, useRef } from "react";

type EmployerInfoStepProps = {
  className?: string;
  onValidityChange: (isValid: boolean) => void;
};

const EmployerInfoStep: React.FC<EmployerInfoStepProps> = ({
  className,
  onValidityChange,
}) => {
  const {
    employerInfo,
    setEmployerInfo,
    emailLocal,
    setEmailLocal,
    emailDomain,
    setEmailDomain,
    isCustomDomain,
    setIsCustomDomain,
    showEmailField,
    showBusinessNumberField,
    isFormValid,
    setCurrentStep,
  } = useEmployerInfoForm(onValidityChange);

  const emailLocalRef = useRef<HTMLInputElement>(null);
  const customDomainRef = useRef<HTMLInputElement>(null);
  const businessNumberRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showEmailField) emailLocalRef.current?.focus();
  }, [showEmailField]);

  useEffect(() => {
    if (isCustomDomain) customDomainRef.current?.focus();
  }, [isCustomDomain]);

  useEffect(() => {
    if (showBusinessNumberField) businessNumberRef.current?.focus();
  }, [showBusinessNumberField]);

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="mt-8">
        <div className="text-2xl font-bold text-gray-900">
          정보를 입력해주세요
        </div>
      </div>

      <div className="mt-8 flex-1 space-y-6">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-900">
            직함 <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="직함을 입력하세요"
            value={employerInfo.position}
            onValueChange={(value) =>
              setEmployerInfo((prev) => ({ ...prev, position: value }))
            }
            className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3"
          />
        </div>

        {showEmailField && (
          <div className="animate-slide-up space-y-4">
            <label className="block text-sm font-medium text-gray-900">
              이메일 <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <Input
                ref={emailLocalRef}
                type="text"
                placeholder="이메일 주소"
                value={emailLocal}
                onValueChange={setEmailLocal}
                className="flex-1 rounded-lg border-0 bg-gray-100 px-4 py-3"
              />
              <span>@</span>
              <div className="flex-1">
                {isCustomDomain ? (
                  <Input
                    ref={customDomainRef}
                    type="text"
                    placeholder="도메인 입력"
                    value={emailDomain}
                    onValueChange={setEmailDomain}
                    className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3"
                  />
                ) : (
                  <DeprecatedDrawer>
                    <DeprecatedDrawerTrigger asChild>
                      <button className="flex w-full items-center justify-between rounded-lg bg-gray-100 px-4 py-3 text-left">
                        <span className="text-gray-500">
                          {emailDomain || "선택"}
                        </span>
                        <DropdownArrowIcon
                          className="text-blue-500"
                          size={12}
                        />
                      </button>
                    </DeprecatedDrawerTrigger>
                    <DeprecatedDrawerContent>
                      <DeprecatedDrawerHeader>
                        <DeprecatedDrawerTitle>
                          이메일을 선택해주세요
                        </DeprecatedDrawerTitle>
                      </DeprecatedDrawerHeader>
                      <div className="space-y-2 p-6">
                        {[...EMAIL_DOMAIN_OPTIONS, "직접 입력"].map(
                          (domain) => (
                            <DeprecatedDrawerClose key={domain} asChild>
                              <button
                                onClick={() => handleDomainSelect(domain)}
                                className="w-full rounded-lg border p-3 text-left hover:bg-gray-50"
                              >
                                {domain}
                              </button>
                            </DeprecatedDrawerClose>
                          ),
                        )}
                      </div>
                    </DeprecatedDrawerContent>
                  </DeprecatedDrawer>
                )}
              </div>
            </div>
          </div>
        )}

        {showBusinessNumberField && (
          <div className="animate-slide-up space-y-4">
            <label className="block text-sm font-medium text-gray-900">
              사업자 번호 <span className="text-red-500">*</span>
            </label>
            <Input
              ref={businessNumberRef}
              type="text"
              placeholder="000-00-00000"
              value={employerInfo.businessNumber}
              onValueChange={handleBusinessNumberChange}
              className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3"
              inputMode="numeric"
              maxLength={12}
            />
          </div>
        )}
      </div>

      {isFormValid && (
        <div className="animate-slide-up fixed-bottom-button">
          <Button
            size="md"
            theme="primary"
            onClick={() => setCurrentStep(SignupStep.WORKER_ACCOUNT)}
            className="w-full"
          >
            다음
          </Button>
        </div>
      )}
    </div>
  );

  function handleBusinessNumberChange(value: string) {
    const formattedValue = formatBusinessNumber(value);
    setEmployerInfo((prev) => ({ ...prev, businessNumber: formattedValue }));
  }

  function handleDomainSelect(domain: string) {
    if (domain === "직접 입력") {
      setIsCustomDomain(true);
      setEmailDomain("");
    } else {
      setIsCustomDomain(false);
      setEmailDomain(domain);
    }
  }
};

export default EmployerInfoStep;
