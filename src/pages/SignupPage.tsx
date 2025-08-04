import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeprecatedButton from "../components/DeprecatedButton/DeprecatedButton";
import NavigationHeader from "../components/NavigationHeader/NavigationHeader";
import AlreadyRegisteredStep from "../components/Signup/AlreadyRegistered";
import PhoneVerificationStep from "../components/Signup/PhoneVerificationStep";
import ProfileSetupStep, {
  ProfileSetupStepHandle,
} from "../components/Signup/ProfileSetupStep";
import SignupTermsStep from "../components/Signup/SignupTermsStep";
import UserTypeSelectionStep from "../components/Signup/UserTypeSelectionStep";
import { cn } from "../utils/classname";

type Props = {
  className?: string;
};

const SignupPage: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isStepValid, setIsStepValid] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [userType, setUserType] = useState<string>("");
  // 이미 가입된 회원 여부를 판단하기 위한 상태
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  const handleSendVerification = () => {
    setVerificationSent(true);
  };

  const handleUserTypeSelect = (userType: string) => {
    setUserType(userType);
    // 유형 선택 후 자동으로 다음 단계로
    setStep(4);
  };

  const profileSetupRef = useRef<ProfileSetupStepHandle>(null);

  const handleBack = () => {
    if (step === 1) {
      return;
    } else {
      if (step === 2 && verificationSent) {
        // 인증번호 입력 상태에서 뒤로가기하면 휴대폰 입력 상태로
        setVerificationSent(false);
      } else {
        setStep((prev) => prev - 1);
      }
    }
  };

  const handleNext = () => {
    if (step === 2) {
      if (!verificationSent) {
        // 인증번호 받기 버튼을 눌렀을 때 인증번호 입력 상태로 변경
        handleSendVerification();
      } else {
        // 인증번호 입력 완료 후 API 체크를 통해 이미 가입된 회원인지 확인합니다.
        const isAlreadyRegistered = false; // 실제 로직에선 API 호출 결과에 따라 결정
        if (isAlreadyRegistered) {
          setAlreadyRegistered(true);
          setStep(4); // 이미 가입된 경우 4단계로
        } else {
          setStep(3); // 유형 선택 단계로
        }
      }
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

  const renderStep = () => {
    switch (step) {
      case 1:
        return <SignupTermsStep onValidityChange={setIsStepValid} />;
      case 2:
        return (
          <PhoneVerificationStep
            onValidityChange={setIsStepValid}
            verificationSent={verificationSent}
            onSendVerification={handleSendVerification}
          />
        );
      case 3:
        return alreadyRegistered ? (
          <AlreadyRegisteredStep />
        ) : (
          <UserTypeSelectionStep
            onValidityChange={setIsStepValid}
            onUserTypeChange={setUserType}
            onUserTypeSelect={handleUserTypeSelect}
          />
        );
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
        return "휴대폰 인증";
      case 3:
        return alreadyRegistered ? "회원가입" : "회원 유형 선택";
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
    <div className="flex h-screen flex-col px-[6%]">
      <div className="mt-4 flex flex-col">
        <NavigationHeader
          title={getPageTitle()}
          onBack={handleBack}
          showBackButton={shouldShowBackButton()}
        />
        <div className="flex-1 overflow-y-auto pb-4">{renderStep()}</div>
      </div>
      {/* 3단계(유형 선택)에서는 버튼 숨김 */}
      {step !== 3 && (
        <div className="mt-auto pb-8">
          <DeprecatedButton
            disabled={!isStepValid}
            className={cn(
              "w-full rounded-[10px] border-blue-500 bg-blue-500 py-3 font-normal text-white transition-all duration-150 active:scale-[0.95]",
              isStepValid ? "" : "opacity-50",
            )}
            onClick={handleNext}
          >
            {step === 2 && !verificationSent
              ? "인증번호 받기"
              : step < 4
                ? "다음"
                : alreadyRegistered
                  ? "로그인"
                  : "완료"}
          </DeprecatedButton>
        </div>
      )}
    </div>
  );
};

export default SignupPage;
