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

  const handleSkipSignUp = async () => {
    try {
      const requestData = createEmployerSignUpRequest({
        personalInfo,
        employerInfo,
        bankName: "",
        accountNumber: "",
      });
      await employerSignUpAsync(requestData);
      setCurrentStep(SignupStep.SIGNUP_SUCCESS);
    } catch (error) {
      console.error("고용주 회원가입 중 오류가 발생했습니다:", error);
    }
  };

  const handleConfirmModalClose = async () => {
    setShowConfirmModal(false);

    try {
      const requestData = createEmployerSignUpRequest({
        personalInfo,
        employerInfo,
        bankName: selectedBank || "",
        accountNumber,
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

      <div className="fixed-bottom-button flex gap-3">
        <Button onClick={handleSkipSignUp} theme="secondary" size="md" block>
          건너뛰기
        </Button>
        <Button onClick={handleAddAccount} theme="primary" size="md" block>
          계좌 추가하기
        </Button>
      </div>

      <Modal visible={showConfirmModal} onClose={handleConfirmModalClose}>
        <div className="px-8 py-10 text-center">
          <div className="mb-6 flex justify-center">
            <WarningIcon />
          </div>
          <h2 className="mb-3 text-xl font-bold text-gray-900">
            본인 명의 계좌만
            <br />
            등록가능해요
          </h2>
          <p className="mb-8 text-sm text-gray-500">
            일치 여부 확인 후 등록해드립니다
          </p>
          <Button
            onClick={handleConfirmModalClose}
            theme="primary"
            size="md"
            className="mx-auto w-full max-w-[200px]"
            loading={isEmployerSignUpPending}
            disabled={isEmployerSignUpPending}
          >
            확인했어요
          </Button>
        </div>
      </Modal>

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
