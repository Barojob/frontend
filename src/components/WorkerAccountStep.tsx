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
import useSignupContext from "@/hooks/useSignupContext";
import { useWorkerAccount } from "@/hooks/useWorkerAccount";
import { useWorkerSignUp } from "@/hooks/useWorkerSignUp";
import WarningIcon from "@/svgs/WarningIcon";
import { SignupStep } from "@/types/signup";
import { cn } from "@/utils/classname";
import { createWorkerSignUpRequest } from "@/utils/workerSignupHelpers";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React from "react";

type WorkerAccountStepProps = {
  className?: string;
  onValidityChange: (isValid: boolean) => void;
};

const WorkerAccountStep: React.FC<WorkerAccountStepProps> = ({
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
    signUpKeyState: [signUpKey],
  } = useSignupContext();

  const { mutateAsync: workerSignUpAsync, isPending: isWorkerSignUpPending } =
    useWorkerSignUp();

  const handleConfirmModalClose = async () => {
    setShowConfirmModal(false);

    try {
      const requestData = createWorkerSignUpRequest({
        personalInfo,
        bankName: selectedBank,
        accountNumber,
      });
      const result = await workerSignUpAsync({
        ...requestData,
        signUpKey: signUpKey || "",
      });
      console.log("근로자 회원가입 결과:", result);
      setCurrentStep(SignupStep.SIGNUP_SUCCESS);
    } catch (error) {
      console.error("근로자 회원가입 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="flex-1">
        <div className="mt-8">
          <div className="text-2xl font-bold text-gray-900">
            임금을 <span className="text-blue-500">지급받을 계좌</span>를
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
            <label className="mb-3 block text-base font-medium text-gray-900">
              은행명
            </label>
            <DeprecatedDrawer>
              <DeprecatedDrawerTrigger asChild>
                <button
                  className={cn(
                    "flex h-11 w-full items-center justify-between rounded-lg border",
                    "border-gray-200 bg-white px-4 py-3 text-left",
                    "focus:border-gray-400 focus:outline-none",
                  )}
                >
                  <span
                    className={cn(
                      "text-base",
                      selectedBank ? "text-gray-900" : "text-gray-400",
                    )}
                  >
                    {selectedBank || "은행을 선택해주세요"}
                  </span>
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                </button>
              </DeprecatedDrawerTrigger>
              <DeprecatedDrawerContent>
                <DeprecatedDrawerHeader>
                  <DeprecatedDrawerTitle>은행 선택</DeprecatedDrawerTitle>
                </DeprecatedDrawerHeader>
                <div className="grid grid-cols-3 gap-3 p-6">
                  {BANK_LIST.map((bank) => (
                    <DeprecatedDrawerClose key={bank.id} asChild>
                      <BoxButton
                        name={bank.name}
                        image={bank.image}
                        selected={selectedBank === bank.name}
                        onClick={() => setSelectedBank(bank.name)}
                      />
                    </DeprecatedDrawerClose>
                  ))}
                </div>
              </DeprecatedDrawerContent>
            </DeprecatedDrawer>
          </div>

          <div>
            <label className="mb-3 block text-base font-medium text-gray-900">
              계좌번호
            </label>
            <Input
              value={accountNumber}
              onValueChange={handleAccountNumberChange}
              placeholder="'-' 없이 숫자만 입력해주세요"
              type="text"
              inputMode="numeric"
              className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3"
            />
          </div>
        </div>
      </div>

      <div className="fixed-bottom-button flex gap-3">
        <Button onClick={handleSkip} theme="secondary" size="md" block>
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
            loading={isWorkerSignUpPending}
            disabled={isWorkerSignUpPending}
          >
            확인했어요
          </Button>
        </div>
      </Modal>

      <Modal visible={showErrorModal} onClose={handleErrorModalClose}>
        <div className="px-8 py-10 text-center">
          <div className="mb-6 flex justify-center">
            <WarningIcon />
          </div>
          <h2 className="mb-8 text-xl font-bold text-gray-900">
            {errorMessage}
          </h2>
          <Button
            onClick={handleErrorModalClose}
            theme="primary"
            size="md"
            className="mx-auto w-full max-w-[200px]"
          >
            확인
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default WorkerAccountStep;
