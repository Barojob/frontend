import BoxButton from "@/components/BoxButton";
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
import Modal from "@/components/Modal";
import { BANK_LIST } from "@/fixtures/banks";
import { useEmployerSignUp } from "@/hooks/useEmployerSignUp";
import useSignupContext from "@/hooks/useSignupContext";
import { useWorkerAccount } from "@/hooks/useWorkerAccount";
import WarningIcon from "@/svgs/WarningIcon";
import { SignupStep } from "@/types/signup";
import { cn } from "@/utils/classname";
import { createEmployerSignUpRequest } from "@/utils/employerSignupHelpers";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React from "react";

type EmployerAccountStepProps = {
  className?: string;
  onValidityChange: (isValid: boolean) => void;
};

const EmployerAccountStep: React.FC<EmployerAccountStepProps> = ({
  className,
  onValidityChange,
}) => {
  // UI 로직은 커스텀 훅에서 관리
  const {
    selectedBank,
    setSelectedBank,
    accountNumber,
    handleAccountNumberChange,
    showConfirmModal,
    setShowConfirmModal,
    showErrorModal,
    errorMessage,
    handleAddAccount,
    handleSkip,
    handleErrorModalClose,
  } = useWorkerAccount(onValidityChange);

  const {
    stepState: [, setCurrentStep],
    personalInfoState: [personalInfo],
    employerInfoState: [employerInfo],
  } = useSignupContext();

  const {
    mutateAsync: employerSignUpAsync,
    isPending: isEmployerSignUpPending,
  } = useEmployerSignUp();

  const handleConfirmModalClose = async () => {
    setShowConfirmModal(false);

    try {
      const requestData = createEmployerSignUpRequest({
        personalInfo,
        employerInfo,
        // FIXME: 백엔드에서 고용주 계좌 정보 지원 시 추가 예정
      });
      await employerSignUpAsync(requestData);
      setCurrentStep(SignupStep.SIGNUP_SUCCESS);
    } catch (error) {
      console.error("고용주 회원가입 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="flex-1">
        <div className="mt-8">
          <div className="text-2xl font-bold text-gray-900">
            임금을 <span className="text-blue-500">지급할 계좌</span>를
          </div>
          <div className="mt-1 text-2xl font-bold text-gray-900">
            등록해주세요
          </div>
          <p className="mt-4 text-sm text-gray-500">
            본인 명의의 계좌만 등록 가능합니다
          </p>
        </div>

        <div className="mb-6 mt-12 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900">
              은행 <span className="text-red-500">*</span>
            </label>
            <DeprecatedDrawer>
              <DeprecatedDrawerTrigger asChild>
                <div className="mt-2 flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-left shadow-sm">
                  <span
                    className={selectedBank ? "text-gray-900" : "text-gray-400"}
                  >
                    {selectedBank || "은행을 선택하세요"}
                  </span>
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                </div>
              </DeprecatedDrawerTrigger>
              <DeprecatedDrawerContent>
                <DeprecatedDrawerHeader>
                  <DeprecatedDrawerTitle>은행 선택</DeprecatedDrawerTitle>
                </DeprecatedDrawerHeader>
                <div className="grid gap-3 px-6 pb-6">
                  {BANK_LIST.map((bank) => (
                    <DeprecatedDrawerClose key={bank.name} asChild>
                      <BoxButton
                        key={bank.name}
                        image={bank.image}
                        name={bank.name}
                        onClick={() => setSelectedBank(bank.name)}
                        className="h-12"
                      />
                    </DeprecatedDrawerClose>
                  ))}
                </div>
              </DeprecatedDrawerContent>
            </DeprecatedDrawer>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">
              계좌번호 <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="계좌번호를 입력하세요"
              value={accountNumber}
              onValueChange={handleAccountNumberChange}
              className="mt-2 w-full rounded-lg border-0 bg-gray-100 px-4 py-3"
              inputMode="numeric"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          size="md"
          theme="primary"
          onClick={handleAddAccount}
          disabled={
            !selectedBank || !accountNumber.trim() || isEmployerSignUpPending
          }
          className="w-full"
        >
          {isEmployerSignUpPending ? "등록 중..." : "계좌 등록"}
        </Button>
        <Button
          size="md"
          theme="secondary"
          onClick={handleSkip}
          disabled={isEmployerSignUpPending}
          className="w-full"
        >
          나중에 등록하기
        </Button>
      </div>

      {/* 계좌 등록 확인 모달 */}
      <Modal
        visible={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
      >
        <div className="space-y-4 p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              계좌 정보를 확인해주세요
            </h3>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-600">은행: {selectedBank}</p>
              <p className="text-sm text-gray-600">계좌번호: {accountNumber}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button
              size="sm"
              theme="secondary"
              onClick={() => setShowConfirmModal(false)}
              className="flex-1"
              disabled={isEmployerSignUpPending}
            >
              수정
            </Button>
            <Button
              size="sm"
              theme="primary"
              onClick={handleConfirmModalClose}
              className="flex-1"
              disabled={isEmployerSignUpPending}
            >
              {isEmployerSignUpPending ? "등록 중..." : "확인"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* 오류 모달 */}
      <Modal visible={showErrorModal} onClose={handleErrorModalClose}>
        <div className="space-y-4 p-6">
          <div className="flex items-center space-x-3">
            <WarningIcon className="h-6 w-6 text-red-500" />
            <h3 className="text-lg font-semibold text-gray-900">오류</h3>
          </div>
          <p className="text-sm text-gray-600">{errorMessage}</p>
          <Button
            size="sm"
            theme="primary"
            onClick={handleErrorModalClose}
            className="w-full"
          >
            확인
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default EmployerAccountStep;
