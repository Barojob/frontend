import EmployerAccountStep from "@/components/EmployerAccountStep";
import EmployerInfoStep from "@/components/EmployerInfoStep";
import PersonalInfoStep from "@/components/PersonalInfoStep";
import PhoneVerificationCodeStep from "@/components/PhoneVerificationCodeStep";
import PresenceTransition from "@/components/PresenceTransition";
import SignupGeneralStep from "@/components/SignupGeneralStep";
import SignupHeader from "@/components/SignupHeader";
import SignupSuccessStep from "@/components/SignupSuccessStep";
import SignupTermsStep from "@/components/SignupTermsStep";
import UserTypeSelectionStep from "@/components/UserTypeSelectionStep";
import WorkerAccountStep from "@/components/WorkerAccountStep";
import WorkerExperienceStep from "@/components/WorkerExperienceStep";
import WorkerLicenseStep from "@/components/WorkerLicenseStep";
import useSignupContext from "@/hooks/useSignupContext";
import SignupProvider from "@/providers/SignupProvider";
import { SignupStep } from "@/types/signup";
import React from "react";

const SignupPage: React.FC = () => (
  <SignupProvider>
    <SignupPageContent />
  </SignupProvider>
);

const SignupPageContent: React.FC = () => {
  const {
    stepState: [step, setStep],
    userTypeState: [userType],
  } = useSignupContext();

  const handlePhoneVerificationComplete = () => {
    if (userType === "employer") {
      setStep(SignupStep.EMPLOYER_INFO);
    } else if (userType === "worker") {
      setStep(SignupStep.WORKER_EXPERIENCE);
    } else {
      setStep(SignupStep.USER_TYPE_SELECTION);
    }
  };

  return (
    <main className="keyboard-avoiding flex min-h-screen flex-col pt-[env(safe-area-inset-top)]">
      <SignupHeader className="px-6" step={step} onStepChange={setStep} />
      <PresenceTransition
        className="mobile-scroll flex-1 overflow-y-auto px-6"
        transitionKey={step.toString()}
        variant="fadeInOut"
      >
        {step === SignupStep.TERMS && (
          <SignupTermsStep onNext={handleNextStep(SignupStep.PERSONAL_INFO)} />
        )}

        {step === SignupStep.USER_TYPE_SELECTION && (
          <UserTypeSelectionStep
            onValidityChange={() => {
              /* FIXME: 유효성 검사 로직 구현 필요 */
            }}
            onUserTypeChange={() => {
              /* FIXME: 사용자 유형 변경 로직 구현 필요 */
            }}
          />
        )}

        {step === SignupStep.PERSONAL_INFO && (
          <PersonalInfoStep
            onNextStep={handleNextStep(SignupStep.PHONE_VERIFICATION)}
          />
        )}

        {step === SignupStep.PHONE_VERIFICATION && (
          <PhoneVerificationCodeStep onNext={handlePhoneVerificationComplete} />
        )}

        {step === SignupStep.ALREADY_REGISTERED && (
          <SignupGeneralStep
            title="기존 회원"
            description="이미 가입된 회원입니다."
          />
        )}

        {step === SignupStep.EMPLOYER_INFO && (
          <EmployerInfoStep
            onValidityChange={() => {
              /* FIXME: 유효성 검사 로직 구현 필요 */
            }}
          />
        )}

        {step === SignupStep.EMPLOYER_ACCOUNT && (
          <EmployerAccountStep
            onValidityChange={() => {
              /* FIXME: 유효성 검사 로직 구현 필요 */
            }}
          />
        )}

        {step === SignupStep.WORKER_INFO && (
          <SignupGeneralStep
            title="근로자 정보"
            description="근로자 정보 입력 페이지입니다."
          />
        )}

        {step === SignupStep.WORKER_EXPERIENCE && (
          <WorkerExperienceStep
            onValidityChange={() => {
              /* FIXME: 유효성 검사 로직 구현 필요 */
            }}
            onSelectedJobsChange={() => {
              /* FIXME: 선택 직종 변경 로직 구현 필요 */
            }}
          />
        )}

        {step === SignupStep.WORKER_LICENSE && (
          <WorkerLicenseStep
            onValidityChange={() => {
              /* FIXME: 유효성 검사 로직 구현 필요 */
            }}
          />
        )}

        {step === SignupStep.WORKER_ACCOUNT && (
          <WorkerAccountStep
            onValidityChange={() => {
              /* FIXME: 유효성 검사 로직 구현 필요 */
            }}
          />
        )}

        {step === SignupStep.PROFILE_SETUP && (
          <SignupGeneralStep
            title="프로필 설정"
            description="프로필 설정 페이지입니다."
          />
        )}

        {step === SignupStep.SIGNUP_SUCCESS && <SignupSuccessStep />}
      </PresenceTransition>
    </main>
  );

  function handleNextStep(step: SignupStep) {
    return () => {
      setStep(step);
    };
  }
};

export default SignupPage;
