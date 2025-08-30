import PresenceTransition from "@/components/PresenceTransition";
import SignupHeader from "@/components/SignupHeader";
import useSignupContext from "@/hooks/useSignupContext";
import EmployerInfoStep from "@/pages/Signup/EmployerInfoStep";
import PersonalInfoStep from "@/pages/Signup/PersonalInfoStep";
import PhoneVerificationCodeStep from "@/pages/Signup/PhoneVerificationCodeStep";
import SignupGeneralStep from "@/pages/Signup/SignupGeneralStep";
import SignupSuccessStep from "@/pages/Signup/SignupSuccessStep";
import SignupTermsStep from "@/pages/Signup/SignupTermsStep";
import UserTypeSelectionStep from "@/pages/Signup/UserTypeSelectionStep";
import WorkerAccountStep from "@/pages/Signup/WorkerAccountStep";
import WorkerExperienceStep from "@/pages/Signup/WorkerExperienceStep";
import WorkerLicenseStep from "@/pages/Signup/WorkerLicenseStep";
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
  } = useSignupContext();

  return (
    // 👇 pt-[env(safe-area-inset-top)]를 추가하여 안전 영역 확보
    <main className="keyboard-avoiding flex min-h-screen flex-col pt-[env(safe-area-inset-top)]">
      {/* 👇 mt-3 클래스 제거 */}
      <SignupHeader className="px-6" step={step} onStepChange={setStep} />
      <PresenceTransition
        className="mobile-scroll flex-1 overflow-y-auto px-6"
        transitionKey={step.toString()}
        variant="fadeInOut"
      >
        {step === SignupStep.TERMS && (
          <SignupTermsStep onNext={handleNextStep(SignupStep.PERSONAL_INFO)} />
        )}

        {step === SignupStep.PERSONAL_INFO && (
          <PersonalInfoStep
            onNextStep={handleNextStep(SignupStep.PHONE_VERIFICATION)}
          />
        )}

        {step === SignupStep.PHONE_VERIFICATION && (
          <PhoneVerificationCodeStep
            onNext={handleNextStep(SignupStep.USER_TYPE_SELECTION)}
          />
        )}

        {step === SignupStep.PHONE_VERIFICATION_SUCCESS && (
          <SignupGeneralStep
            title="인증 완료"
            description="휴대폰 인증이 완료되었습니다."
          />
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
