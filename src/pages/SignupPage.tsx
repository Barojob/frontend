import React from "react";
import { useNavigate } from "react-router-dom";
import DeprecatedButton from "../components/DeprecatedButton/DeprecatedButton";
import NavigationHeader from "../components/NavigationHeader/NavigationHeader";
import { ProfileSetupStepHandle } from "../components/Signup/ProfileSetupStep";
import SignupTermsStep from "../components/Signup/SignupTermsStep";
import { CheckItem } from "../components/SignUpTerms";
import TERMS_FIXTURE from "../fixtures/terms.json";
import { cn } from "../utils/classname";

enum Step {
  TERMS,
  PHONE_VERIFICATION,
  PHONE_VERIFICATION_SUCCESS,
  USER_TYPE_SELECTION,
  ALREADY_REGISTERED,
  EMPLOYER_INFO,
  WORKER_INFO,
  WORKER_EXPERIENCE,
  PROFILE_SETUP,
}

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const [step, setStep] = React.useState(Step.TERMS);
  const [terms, setTerms] = React.useState<CheckItem[]>(TERMS_FIXTURE);
  const [selectedUserType, setSelectedUserType] = React.useState<string>("");
  const [selectedJobsCount, setSelectedJobsCount] = React.useState<number>(0);
  const [alreadyRegistered, setAlreadyRegistered] = React.useState(false);

  const profileSetupRef = React.useRef<ProfileSetupStepHandle>(null);

  const shouldShowBackButton = step !== Step.TERMS;

  return (
    <div className="min-h-screen px-6">
      <div className="mt-4 flex flex-col">
        <NavigationHeader
          title={getPageTitle()}
          onBack={handleBack}
          showBackButton={shouldShowBackButton}
        />
        <div className="flex-1 overflow-y-auto pb-4">{renderStep()}</div>
      </div>

      <DeprecatedButton
        className={cn(
          "w-full rounded-[10px] border-blue-500 bg-blue-500 py-3 font-normal text-white transition-all duration-150 active:scale-[0.95]",
        )}
        onClick={handleNext}
      >
        {getButtonText()}
      </DeprecatedButton>
    </div>
  );

  function handleBack() {
    if (step === Step.TERMS) {
      return;
    }

    setStep((prev) => prev - 1);
  }

  function getPageTitle() {
    switch (step) {
      case Step.TERMS:
        return "회원가입";
      // case Step.PHONE_VERIFICATION:
      //   return "휴대폰 번호 입력";
      // case Step.PHONE_VERIFICATION_SUCCESS:
      //   return "휴대폰 인증";
      // case Step.USER_TYPE_SELECTION:
      //   return alreadyRegistered ? "회원가입" : "회원가입";
      // case Step.EMPLOYER_INFO:
      //   return alreadyRegistered
      //     ? "회원가입"
      //     : selectedUserType === "employer"
      //       ? "구인자 정보 입력"
      //       : selectedUserType === "worker"
      //         ? "경험 체크"
      //         : "회원가입";
      // case Step.PROFILE_SETUP:
      //   return alreadyRegistered ? "회원가입" : "회원가입";
      default:
        console.error("Unknown step", step);
        return "";
    }
  }

  function renderStep() {
    switch (step) {
      case Step.TERMS:
        return <SignupTermsStep items={terms} onChange={setTerms} />;
      // case Step.PHONE_VERIFICATION:
      //   return (
      //     <PhoneVerificationStep
      //       verificationSent={false}
      //       onSendVerification={handleSendVerification}
      //     />
      //   );
      // case Step.ALREADY_REGISTERED:
      //   return <AlreadyRegisteredStep />;
      // case Step.USER_TYPE_SELECTION:
      //   return <UserTypeSelectionStep onUserTypeChange={setSelectedUserType} />;
      // case Step.EMPLOYER_INFO:
      //   return <EmployerInfoStep />;
      // case Step.WORKER_INFO:
      //   return (
      //     <WorkerExperienceStep onSelectedJobsChange={setSelectedJobsCount} />
      //   );
      // case Step.PROFILE_SETUP:
      //   return <ProfileSetupStep ref={profileSetupRef} />;
      default:
        console.error("Unknown step", step);
        return null;
    }
  }

  function getButtonText() {
    switch (step) {
      // case Step.PHONE_VERIFICATION:
      //   return "인증번호 받기";
      // case Step.EMPLOYER_INFO:
      //   return selectedUserType === "employer" ? "회원가입 완료" : "다음 단계";
      // case Step.WORKER_INFO:
      //   return selectedJobsCount > 0 ? "다음 단계" : "건너뛰기";
      // case Step.PROFILE_SETUP:
      //   return alreadyRegistered ? "로그인" : "완료";
      default:
        console.error("Unknown step", step);
        return "다음";
    }
  }

  function handleNext() {
    // if (step === Step.PHONE_VERIFICATION) {
    //   // 인증번호 받기 버튼을 눌렀을 때 인증번호 입력 상태로 변경하고 다음 스텝으로
    //   handleSendVerification();
    //   setStep(Step.PHONE_VERIFICATION_SUCCESS);
    // } else if (step === Step.PHONE_VERIFICATION_SUCCESS) {
    //   // 인증번호 입력 완료 후 API 체크를 통해 이미 가입된 회원인지 확인합니다.
    //   const isAlreadyRegistered = false; // 실제 로직에선 API 호출 결과에 따라 결정
    //   if (isAlreadyRegistered) {
    //     setAlreadyRegistered(true);
    //     setStep(Step.ALREADY_REGISTERED); // 이미 가입된 경우 5단계로
    //   } else {
    //     setStep(Step.USER_TYPE_SELECTION); // 유형 선택 단계로
    //   }
    // } else if (step === Step.USER_TYPE_SELECTION) {
    //   setStep(Step.EMPLOYER_INFO); // 유형 선택 완료 후 5단계로
    // } else if (step === Step.EMPLOYER_INFO) {
    //   // step 5에서 사용자 타입에 따른 분기 처리
    //   if (selectedUserType === "employer") {
    //     // 구인자의 경우 SignupSuccessPage로 이동
    //     navigate("/signup-success");
    //   } else if (selectedUserType === "worker") {
    //     // 근로자의 경우 SignupLicensePage로 이동
    //     navigate("/signup/license");
    //   } else {
    //     setStep(Step.WORKER_INFO); // 기본값은 6단계로
    //   }
    // } else if (step < Step.PROFILE_SETUP) {
    //   setStep((prev) => prev + 1);
    // } else if (step === Step.PROFILE_SETUP) {
    //   if (alreadyRegistered) {
    //     navigate("/login");
    //   } else {
    //     if (
    //       profileSetupRef.current &&
    //       profileSetupRef.current.triggerComplete()
    //     ) {
    //       navigate("/signup-success");
    //     }
    //   }
    // }
  }

  function handleSendVerification() {
    // 인증번호 발송 로직 (실제로는 API 호출)
  }
};

export default SignupPage;
