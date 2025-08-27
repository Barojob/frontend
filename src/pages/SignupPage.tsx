import EmployerInfoStep from "@/components/EmployerInfoStep";
import PersonalInfoStep from "@/components/PersonalInfoStep";
import PhoneVerificationCodeStep from "@/components/PhoneVerificationCodeStep";
import SignupSuccessStep from "@/components/SignupSuccessStep";
import SignupTermsStep from "@/components/SignupTermsStep";
import UserTypeSelectionStep from "@/components/UserTypeSelectionStep";
import WorkerAccountStep from "@/components/WorkerAccountStep";
import WorkerExperienceStep from "@/components/WorkerExperienceStep";
import WorkerLicenseStep from "@/components/WorkerLicenseStep";
import React from "react";
import PresenceTransition from "../components/PresenceTransition";
import SignupHeader from "../components/SignupHeader";
import useSignupContext from "../hooks/useSignupContext";
import SignupProvider from "../providers/SignupProvider";
import { SignupStep } from "../types/signup";

const SimpleStepComponent = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="flex min-h-full items-center justify-center text-center">
    <div>
      <h2 className="text-xl font-bold">{title}</h2>
      <p>{description}</p>
    </div>
  </div>
);

const stepComponentMap: Record<SignupStep, React.ReactNode> = {
  [SignupStep.TERMS]: <SignupTermsStep />,
  [SignupStep.PERSONAL_INFO]: (
    <PersonalInfoStep
      onValidityChange={() => {
        /* FIXME: 유효성 검사 로직 구현 필요 */
      }}
    />
  ),
  [SignupStep.PHONE_VERIFICATION]: (
    <PhoneVerificationCodeStep
      onValidityChange={() => {
        /* FIXME: 유효성 검사 로직 구현 필요 */
      }}
    />
  ),
  [SignupStep.PHONE_VERIFICATION_SUCCESS]: (
    <SimpleStepComponent
      title="인증 완료"
      description="휴대폰 인증이 완료되었습니다."
    />
  ),
  [SignupStep.USER_TYPE_SELECTION]: (
    <UserTypeSelectionStep
      onValidityChange={() => {
        /* FIXME: 유효성 검사 로직 구현 필요 */
      }}
      onUserTypeChange={() => {
        /* FIXME: 사용자 유형 변경 로직 구현 필요 */
      }}
    />
  ),
  [SignupStep.ALREADY_REGISTERED]: (
    <SimpleStepComponent
      title="기존 회원"
      description="이미 가입된 회원입니다."
    />
  ),
  [SignupStep.EMPLOYER_INFO]: (
    <EmployerInfoStep
      onValidityChange={() => {
        /* FIXME: 유효성 검사 로직 구현 필요 */
      }}
    />
  ),
  [SignupStep.WORKER_INFO]: (
    <SimpleStepComponent
      title="근로자 정보"
      description="근로자 정보 입력 페이지입니다."
    />
  ),
  [SignupStep.WORKER_EXPERIENCE]: (
    <WorkerExperienceStep
      onValidityChange={() => {
        /* FIXME: 유효성 검사 로직 구현 필요 */
      }}
      onSelectedJobsChange={() => {
        /* FIXME: 선택 직종 변경 로직 구현 필요 */
      }}
    />
  ),
  [SignupStep.WORKER_LICENSE]: (
    <WorkerLicenseStep
      onValidityChange={() => {
        /* FIXME: 유효성 검사 로직 구현 필요 */
      }}
    />
  ),
  [SignupStep.WORKER_ACCOUNT]: (
    <WorkerAccountStep
      onValidityChange={() => {
        /* FIXME: 유효성 검사 로직 구현 필요 */
      }}
    />
  ),
  [SignupStep.PROFILE_SETUP]: (
    <SimpleStepComponent
      title="프로필 설정"
      description="프로필 설정 페이지입니다."
    />
  ),
  [SignupStep.SIGNUP_SUCCESS]: null,
};

const SignupPageContent: React.FC = () => {
  const {
    stepState: [step, setStep],
  } = useSignupContext();

  if (step === SignupStep.SIGNUP_SUCCESS) {
    return (
      <main className="relative min-h-screen">
        <div className="absolute inset-0">
          <SignupSuccessStep />
        </div>
      </main>
    );
  }

  return (
    <main className="keyboard-avoiding mobile-scroll flex min-h-screen flex-col">
      <SignupHeader className="mt-2 px-6" step={step} onStepChange={setStep} />
      <PresenceTransition
        className="mobile-scroll flex-1 overflow-y-auto px-6"
        transitionKey={step.toString()}
        variant="fadeInOut"
      >
        {stepComponentMap[step]}
      </PresenceTransition>
    </main>
  );
};

const SignupPage: React.FC = () => (
  <SignupProvider>
    <SignupPageContent />
  </SignupProvider>
);

export default SignupPage;
