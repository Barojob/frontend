import React, { useEffect, useRef, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import NavigationHeader from "../components/layouts/NavigationHeader";
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

  const getPageTitle = () => {
    switch (step) {
      case 1:
        return "회원가입";
      case 2:
      case 3:
        return "휴대폰 인증";
      case 4:
        return alreadyRegistered ? "회원가입" : "회원가입";
      default:
        return "회원가입";
    }
  };

  const shouldShowBackButton = () => {
    return step !== 1;
  };

  return (
    <div className="px-[6%]">
      <div className="mt-4 flex h-auto w-full flex-1 flex-col justify-start">
        <NavigationHeader
          title={getPageTitle()}
          onBack={handleBack}
          showBackButton={shouldShowBackButton()}
        />
        <div>{renderStep()}</div>
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

      <PhoneAgreeModal
        visible={showPhoneAgreeModal}
        onSuccess={handlePhoneAgressSuccess}
        onClose={handlePhoneAgressClose}
      />
    </div>
  );

  function handlePhoneAgressSuccess() {
    setPhoneAgree(true);
  }

  function handlePhoneAgressClose() {
    setShowPhoneAgreeModal(false);
  }
};

export default SignupPage;
