import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import React from "react";
import { SignupStep } from "../types/signup";
import { cn } from "../utils/classname";

type Props = {
  className?: string;
  step: SignupStep;
  onStepChange: (step: SignupStep) => void;
};

const SignupHeader: React.FC<Props> = ({ className, step, onStepChange }) => {
  const showBackButton =
    step !== SignupStep.TERMS && step !== SignupStep.SIGNUP_SUCCESS;

  return (
    <div className={cn("flex items-center gap-x-1 text-gray-500", className)}>
      {showBackButton && (
        <button onClick={handleBack}>
          <ChevronLeftIcon className="-mt-0.5 size-6 text-gray-500" />
        </button>
      )}
      {getStepTitle(step)}
    </div>
  );

  function handleBack() {
    if (step === SignupStep.TERMS) {
      return;
    }

    // 올바른 이전 스텝으로 이동
    switch (step) {
      case SignupStep.PERSONAL_INFO:
        onStepChange(SignupStep.TERMS);
        break;
      case SignupStep.PHONE_VERIFICATION:
        onStepChange(SignupStep.PERSONAL_INFO);
        break;
      case SignupStep.PHONE_VERIFICATION_SUCCESS:
        onStepChange(SignupStep.PHONE_VERIFICATION);
        break;
      case SignupStep.USER_TYPE_SELECTION:
        onStepChange(SignupStep.PHONE_VERIFICATION);
        break;
      case SignupStep.ALREADY_REGISTERED:
        onStepChange(SignupStep.USER_TYPE_SELECTION);
        break;
      case SignupStep.EMPLOYER_INFO:
        onStepChange(SignupStep.USER_TYPE_SELECTION);
        break;
      case SignupStep.WORKER_INFO:
        onStepChange(SignupStep.USER_TYPE_SELECTION);
        break;
      case SignupStep.WORKER_EXPERIENCE:
        onStepChange(SignupStep.USER_TYPE_SELECTION);
        break;
      case SignupStep.WORKER_LICENSE:
        onStepChange(SignupStep.WORKER_EXPERIENCE);
        break;
      case SignupStep.WORKER_ACCOUNT:
        onStepChange(SignupStep.WORKER_LICENSE);
        break;
      case SignupStep.PROFILE_SETUP:
        onStepChange(SignupStep.WORKER_EXPERIENCE);
        break;
      case SignupStep.SIGNUP_SUCCESS:
        // 회원가입 완료 페이지에서는 뒤로가기 없음
        break;
      default:
        // 안전장치: 기본적으로 이전 스텝으로
        onStepChange(step - 1);
        break;
    }
  }

  function getStepTitle(step: SignupStep) {
    switch (step) {
      case SignupStep.TERMS:
        return "회원가입";
      case SignupStep.PERSONAL_INFO:
        return "인적사항 입력";
      case SignupStep.PHONE_VERIFICATION:
        return "휴대폰 인증";
      case SignupStep.PHONE_VERIFICATION_SUCCESS:
        return "휴대폰 인증 완료";
      case SignupStep.USER_TYPE_SELECTION:
        return "사용자 유형 선택";
      case SignupStep.ALREADY_REGISTERED:
        return "기존 회원 확인";
      case SignupStep.EMPLOYER_INFO:
        return "업체 정보 입력";
      case SignupStep.WORKER_INFO:
        return "근로자 정보 입력";
      case SignupStep.WORKER_EXPERIENCE:
        return "경험 정보 입력";
      case SignupStep.WORKER_LICENSE:
        return "이수증 등록";
      case SignupStep.WORKER_ACCOUNT:
        return "계좌 등록";
      case SignupStep.PROFILE_SETUP:
        return "프로필 설정";
      case SignupStep.SIGNUP_SUCCESS:
        return "회원가입 완료";
      default:
        console.error("Unknown step", step);
        return "회원가입";
    }
  }
};

export default SignupHeader;
