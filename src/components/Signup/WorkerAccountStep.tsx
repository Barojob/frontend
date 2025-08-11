import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import useSignupContext from "../../hooks/useSignupContext";
import WarningIcon from "../../svgs/WarningIcon";
import { SignupStep } from "../../types/signup";
import { cn } from "../../utils/classname";
import BoxButton from "../BoxButton/BoxButton";
import Button from "../Button";
import { Drawer, DrawerContent, DrawerTrigger } from "../Drawer";
import Input from "../Input/Input";
import Modal from "../Modal";

const banks = [
  { id: "nh", name: "농협은행", image: "/BankSvg/nongHyup.svg" },
  { id: "shinhan", name: "신한은행", image: "/BankSvg/shinhan.svg" },
  { id: "kb", name: "국민은행", image: "/BankSvg/kb.svg" },
  { id: "woori", name: "우리은행", image: "/BankSvg/woori.svg" },
  { id: "kakao", name: "카카오뱅크", image: "/BankSvg/kakao.svg" },
  { id: "toss", name: "토스뱅크", image: "/BankSvg/toss.svg" },
];

type WorkerAccountStepProps = {
  className?: string;
  onValidityChange: (isValid: boolean) => void;
};

const WorkerAccountStep: React.FC<WorkerAccountStepProps> = ({
  className,
  onValidityChange,
}) => {
  const {
    stepState: [, setCurrentStep],
  } = useSignupContext();

  const [selectedBank, setSelectedBank] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [drawerKey, setDrawerKey] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 유효성 검사 - 항상 유효 (건너뛸 수 있음)
  const isValid = true;

  const handleBankSelect = (bankName: string) => {
    setSelectedBank(bankName);
    // 드로어를 강제로 닫기 위해 key를 변경하여 리렌더링
    setDrawerKey((prev) => prev + 1);
  };

  const handleAccountNumberChange = (value: string) => {
    // 숫자만 허용
    const numericValue = value.replace(/[^0-9]/g, "");
    setAccountNumber(numericValue);
  };

  const handleSkip = () => {
    // 건너뛰기 로직 - 모달 표시
    setShowModal(true);
  };

  const handleAddAccount = () => {
    // 계좌 추가하기 로직 - 모든 필드 검증
    const missingFields = [];

    if (!selectedBank) {
      missingFields.push("은행");
    }
    if (!accountNumber) {
      missingFields.push("계좌번호");
    }

    if (missingFields.length > 0) {
      setErrorMessage(`${missingFields.join(", ")}을(를) 입력해주세요.`);
      setShowErrorModal(true);
      return;
    }

    // 모든 정보가 입력되면 안내 모달 표시
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    // 모달 닫은 후 회원가입 성공 페이지로 이동
    setCurrentStep(SignupStep.SIGNUP_SUCCESS);
  };

  const handleErrorModalClose = () => {
    setShowErrorModal(false);
  };

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  return (
    <div className={cn("", className)}>
      {/* 상단 타이틀 */}
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

      {/* 은행 선택 섹션 */}
      <div className="mb-6 mt-12">
        <label className="mb-3 block text-base font-medium text-gray-900">
          은행명
        </label>

        <Drawer key={drawerKey}>
          <DrawerTrigger asChild>
            <button
              className={cn(
                "h-11 w-full rounded-lg border border-gray-200 px-4 py-3",
                "flex items-center justify-between bg-white text-left",
                "focus:border-gray-400 focus:outline-none",
                "transition-colors hover:border-gray-300 active:scale-[0.98]",
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
          </DrawerTrigger>

          <DrawerContent position="bottom" className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">은행 선택</h3>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {banks.map((bank) => (
                <BoxButton
                  key={bank.id}
                  name={bank.name}
                  image={bank.image}
                  variant="primary"
                  className="!h-28 !w-full"
                  selected={selectedBank === bank.name}
                  onClick={() => handleBankSelect(bank.name)}
                />
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* 계좌번호 입력 섹션 */}
      <div className="mb-6">
        <label className="mb-3 block text-base font-medium text-gray-900">
          계좌번호
        </label>

        <Input
          value={accountNumber}
          onValueChange={handleAccountNumberChange}
          placeholder="'-' 없이 숫자만 입력해주세요"
          type="text"
          inputMode="numeric"
          className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-150 hover:bg-gray-200 focus:outline-none active:scale-[0.95]"
        />
      </div>

      {/* 하단 버튼 영역 - 화면 하단 고정 */}
      <div className="animate-slide-up fixed bottom-8 left-4 right-4">
        <div className="flex gap-3">
          <Button
            onClick={handleSkip}
            theme="secondary"
            size="md"
            className="flex-1 transition-transform duration-150 active:scale-[0.95]"
          >
            건너뛰기
          </Button>
          <Button
            onClick={handleAddAccount}
            theme="primary"
            size="md"
            className="flex-1 transition-transform duration-150 active:scale-[0.95]"
          >
            계좌 추가하기
          </Button>
        </div>
      </div>

      {/* 계좌 안내 모달 */}
      <Modal visible={showModal} onClose={handleModalClose}>
        <div className="px-8 py-10 text-center">
          {/* 느낌표 아이콘 */}
          <div className="mb-6 flex justify-center">
            <WarningIcon />
          </div>

          {/* 메인 메시지 */}
          <h2 className="mb-3 text-xl font-bold text-gray-900">
            본인 명의 계좌만
            <br />
            등록가능해요
          </h2>

          {/* 서브 메시지 */}
          <p className="mb-8 text-sm text-gray-500">
            일치 여부 확인 후 등록해드립니다
          </p>

          {/* 확인 버튼 */}
          <Button
            onClick={handleModalClose}
            theme="primary"
            size="md"
            className="mx-auto w-full max-w-[200px] transition-transform duration-150 active:scale-[0.95]"
          >
            확인했어요
          </Button>
        </div>
      </Modal>

      {/* 입력 오류 모달 */}
      <Modal visible={showErrorModal} onClose={handleErrorModalClose}>
        <div className="px-8 py-10 text-center">
          {/* 느낌표 아이콘 */}
          <div className="mb-6 flex justify-center">
            <WarningIcon />
          </div>

          {/* 에러 메시지 */}
          <h2 className="mb-8 text-xl font-bold text-gray-900">
            {errorMessage}
          </h2>

          {/* 확인 버튼 */}
          <Button
            onClick={handleErrorModalClose}
            theme="primary"
            size="md"
            className="mx-auto w-full max-w-[200px] transition-transform duration-150 active:scale-[0.95]"
          >
            확인
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default WorkerAccountStep;
