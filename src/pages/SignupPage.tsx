import React, { useEffect, useRef, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import AlreadyRegisteredStep from "../components/Signup/AlreadyRegistered";
import InputVerifyNumber from "../components/Signup/InputVerifyNumber";
import PhoneAgreeModal from "../components/Signup/PhoneAgreeModal";
import PhoneVerificationStep from "../components/Signup/PhoneVerificationStep";
import ProfileSetupStep, {
  ProfileSetupStepHandle,
} from "../components/Signup/ProfileSetupStep";
import SignupTermsStep from "../components/Signup/SignupTermsStep";
import { cn } from "../utils/classname";

type Props = {
  className?: string;
};

const SignupPage: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isStepValid, setIsStepValid] = useState(false);
  const [showPhoneAgreeModal, setShowPhoneAgreeModal] = useState(false);
  const [phoneAgree, setPhoneAgree] = useState(false);
  // 이미 가입된 회원 여부를 판단하기 위한 상태
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  const profileSetupRef = useRef<ProfileSetupStepHandle>(null);

  const handleBack = () => {
    if (step === 1) {
      return;
    } else {
      if (step === 3) {
        setPhoneAgree(false);
      }
      setStep((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (step === 2) {
      // 2단계에서는 약관 동의를 받기 위해 모달을 엽니다.
      setShowPhoneAgreeModal(true);
    } else if (step === 3) {
      // step 3에서 인증번호 입력 완료 후 API 체크를 통해 이미 가입된 회원인지 확인합니다.
      // 아래는 예시로 이미 가입된 회원이라 가정하는 dummy 코드입니다.
      const isAlreadyRegistered = true; // 실제 로직에선 API 호출 결과에 따라 결정
      if (isAlreadyRegistered) {
        setAlreadyRegistered(true);
      }
      setStep((prev) => prev + 1);
    } else if (step < 4) {
      setStep((prev) => prev + 1);
    } else {
      // step === 4
      if (alreadyRegistered) {
        navigate("/login");
      } else {
        if (
          profileSetupRef.current &&
          profileSetupRef.current.triggerComplete()
        ) {
          navigate("/signup-complete");
        }
      }
    }
  };

  // phoneAgree가 true가 되어야만 다음 단계로 진행
  useEffect(() => {
    if (phoneAgree && step === 2) {
      setStep(3);
    }
  }, [phoneAgree, step]);

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "회원가입";
      case 2:
        return (
          <div className="flex items-center gap-1">
            <BsChevronLeft />
            <span>휴대폰 인증</span>
          </div>
        );
      case 3:
        return (
          <div className="flex items-center gap-1">
            <BsChevronLeft />
            <span>인증번호 입력</span>
          </div>
        );
      case 4:
        return alreadyRegistered ? (
          <div className="flex items-center gap-1">
            <BsChevronLeft />
            <span>이미 가입된 회원</span>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <BsChevronLeft />
            <span>프로필 설정</span>
          </div>
        );
      default:
        return "회원가입";
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <SignupTermsStep onValidityChange={setIsStepValid} />;
      case 2:
        return <PhoneVerificationStep onValidityChange={setIsStepValid} />;
      case 3:
        return <InputVerifyNumber onValidityChange={setIsStepValid} />;
      case 4:
        return alreadyRegistered ? (
          <AlreadyRegisteredStep />
        ) : (
          <ProfileSetupStep
            ref={profileSetupRef}
            onValidityChange={setIsStepValid}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen flex-col px-[6%]">
      {/* 상단 헤더 영역 */}
      <div className="mb-7 mt-6">
        <div
          className={cn("cursor-pointer text-base text-gray-500")}
          onClick={handleBack}
        >
          {getStepTitle()}
        </div>
      </div>

      {/* 메인 컨텐츠 영역 - 스크롤 가능 */}
      <div className="flex-1 overflow-y-auto">{renderStep()}</div>

      {/* 하단 고정 버튼 */}
      <div className="pb-safe sticky bottom-10 bg-white pt-4">
        <Button
          disabled={!isStepValid}
          className={cn(
            "w-full rounded-[10px] border-blue-500 bg-blue-500 py-3 font-normal text-white",
            isStepValid ? "" : "opacity-50",
          )}
          onClick={handleNext}
        >
          {step < 4 ? "다음" : alreadyRegistered ? "로그인" : "완료"}
        </Button>
      </div>

      {showPhoneAgreeModal && (
        <PhoneAgreeModal
          setPhoneAgree={setPhoneAgree}
          setShowPhoneAgreeModal={setShowPhoneAgreeModal}
          onAllCheckedChange={() => {}}
        />
      )}
    </div>
  );
};

export default SignupPage;
