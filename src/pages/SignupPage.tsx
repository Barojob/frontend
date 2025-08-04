import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeprecatedButton from "../components/DeprecatedButton/DeprecatedButton";
import NavigationHeader from "../components/NavigationHeader/NavigationHeader";
import AlreadyRegisteredStep from "../components/Signup/AlreadyRegistered";
import EmployerInfoStep from "../components/Signup/EmployerInfoStep";
import PhoneVerificationStep from "../components/Signup/PhoneVerificationStep";
import ProfileSetupStep, {
  ProfileSetupStepHandle,
} from "../components/Signup/ProfileSetupStep";
import SignupTermsStep from "../components/Signup/SignupTermsStep";
import UserTypeSelectionStep from "../components/Signup/UserTypeSelectionStep";
import WorkerExperienceStep from "../components/Signup/WorkerExperienceStep";
import { cn } from "../utils/classname";

type Props = {
  className?: string;
};

const SignupPage: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isStepValid, setIsStepValid] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<string>("");
  const [selectedJobsCount, setSelectedJobsCount] = useState<number>(0);
  // 이미 가입된 회원 여부를 판단하기 위한 상태
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  const handleSendVerification = () => {
    // 인증번호 발송 로직 (실제로는 API 호출)
  };

  const profileSetupRef = useRef<ProfileSetupStepHandle>(null);

  const handleBack = () => {
    if (step === 1) {
      return;
    } else {
      setStep((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (step === 2) {
      // 인증번호 받기 버튼을 눌렀을 때 인증번호 입력 상태로 변경하고 다음 스텝으로
      handleSendVerification();
      setStep(3);
    } else if (step === 3) {
      // 인증번호 입력 완료 후 API 체크를 통해 이미 가입된 회원인지 확인합니다.
      const isAlreadyRegistered = false; // 실제 로직에선 API 호출 결과에 따라 결정
      if (isAlreadyRegistered) {
        setAlreadyRegistered(true);
        setStep(5); // 이미 가입된 경우 5단계로
      } else {
        setStep(4); // 유형 선택 단계로
      }
    } else if (step === 4) {
      setStep(5); // 유형 선택 완료 후 5단계로
    } else if (step === 5) {
      // step 5에서 사용자 타입에 따른 분기 처리
      if (selectedUserType === "employer") {
        // 구인자의 경우 SignupSuccessPage로 이동
        navigate("/signup-success");
      } else if (selectedUserType === "worker") {
        // 근로자의 경우 SignupLicensePage로 이동
        navigate("/signup/license");
      } else {
        setStep(6); // 기본값은 6단계로
      }
    } else if (step < 6) {
      setStep((prev) => prev + 1);
    } else if (step === 6) {
      if (alreadyRegistered) {
        navigate("/login");
      } else {
        if (
          profileSetupRef.current &&
          profileSetupRef.current.triggerComplete()
        ) {
          navigate("/signup-success");
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
            verificationSent={false}
            onSendVerification={handleSendVerification}
          />
        );
      case 3:
        return (
          <PhoneVerificationStep
            onValidityChange={setIsStepValid}
            verificationSent={true}
            onSendVerification={handleSendVerification}
          />
        );
      case 4:
        return alreadyRegistered ? (
          <AlreadyRegisteredStep />
        ) : (
          <UserTypeSelectionStep
            onValidityChange={setIsStepValid}
            onUserTypeChange={setSelectedUserType}
          />
        );
      case 5:
        return alreadyRegistered ? (
          <AlreadyRegisteredStep />
        ) : selectedUserType === "employer" ? (
          <EmployerInfoStep onValidityChange={setIsStepValid} />
        ) : selectedUserType === "worker" ? (
          <WorkerExperienceStep
            onValidityChange={setIsStepValid}
            onSelectedJobsChange={setSelectedJobsCount}
          />
        ) : (
          <ProfileSetupStep
            ref={profileSetupRef}
            onValidityChange={setIsStepValid}
          />
        );
      case 6:
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
        return "휴대폰 번호 입력";
      case 3:
        return "휴대폰 인증";
      case 4:
        return alreadyRegistered ? "회원가입" : "회원가입";
      case 5:
        return alreadyRegistered
          ? "회원가입"
          : selectedUserType === "employer"
            ? "구인자 정보 입력"
            : selectedUserType === "worker"
              ? "경험 체크"
              : "회원가입";
      case 6:
        return alreadyRegistered ? "회원가입" : "회원가입";
      default:
        return "회원가입";
    }
  };

  const getButtonText = () => {
    if (step === 2) {
      return "인증번호 받기";
    } else if (step === 5 && selectedUserType === "employer") {
      return "회원가입 완료";
    } else if (step === 5 && selectedUserType === "worker") {
      return selectedJobsCount > 0 ? "다음 단계" : "건너뛰기";
    } else if (step < 6) {
      return "다음";
    } else {
      return alreadyRegistered ? "로그인" : "완료";
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
      {/* 모든 단계에서 버튼 표시 */}
      <div className="mt-auto pb-8">
        <DeprecatedButton
          disabled={!isStepValid}
          className={cn(
            "w-full rounded-[10px] border-blue-500 bg-blue-500 py-3 font-normal text-white transition-all duration-150 active:scale-[0.95]",
            isStepValid ? "" : "opacity-50",
          )}
          onClick={handleNext}
        >
          {getButtonText()}
        </DeprecatedButton>
      </div>
    </div>
  );
};

export default SignupPage;
