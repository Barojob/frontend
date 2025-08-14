import React from "react";
import PresenceTransition from "../components/PresenceTransition";
import EmployerInfoStep from "../components/Signup/EmployerInfoStep";
import PersonalInfoStep from "../components/Signup/PersonalInfoStep";
import PhoneVerificationCodeStep from "../components/Signup/PhoneVerificationCodeStep";
import SignupTermsStep from "../components/Signup/SignupTermsStep";
import UserTypeSelectionStep from "../components/Signup/UserTypeSelectionStep";
import WorkerAccountStep from "../components/Signup/WorkerAccountStep";
import WorkerExperienceStep from "../components/Signup/WorkerExperienceStep";
import WorkerLicenseStep from "../components/Signup/WorkerLicenseStep";
import SignupHeader from "../components/SignupHeader";
import useSignupContext from "../hooks/useSignupContext";
import SignupProvider from "../providers/SignupProvider";
import { SignupStep } from "../types/signup";
import SignupSuccessPage from "./SignupSuccessPage";

const SignupPageContent: React.FC = () => {
  const {
    stepState: [step, setStep],
  } = useSignupContext();

  return (
    <main className="relative flex min-h-screen flex-col px-6">
      {/* SIGNUP_SUCCESS 단계일 때는 전체 화면으로 표시 */}
      {step === SignupStep.SIGNUP_SUCCESS ? (
        <div className="absolute inset-0">
          <SignupSuccessPage />
        </div>
      ) : (
        <>
          <SignupHeader className="mt-8" step={step} onStepChange={setStep} />
          <PresenceTransition
            className="flex-1 overflow-y-auto"
            transitionKey={step.toString()}
            variant="fadeInOut"
          >
            {step === SignupStep.TERMS && <SignupTermsStep />}
            {step === SignupStep.PERSONAL_INFO && (
              <PersonalInfoStep onValidityChange={() => {}} />
            )}
            {step === SignupStep.PHONE_VERIFICATION && (
              <PhoneVerificationCodeStep onValidityChange={() => {}} />
            )}
            {step === SignupStep.PHONE_VERIFICATION_SUCCESS && (
              <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                  <h2 className="text-xl font-bold">인증 완료</h2>
                  <p>휴대폰 인증이 완료되었습니다.</p>
                </div>
              </div>
            )}
            {step === SignupStep.USER_TYPE_SELECTION && (
              <UserTypeSelectionStep
                onValidityChange={() => {}}
                onUserTypeChange={() => {}}
              />
            )}
            {step === SignupStep.ALREADY_REGISTERED && (
              <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                  <h2 className="text-xl font-bold">기존 회원</h2>
                  <p>이미 가입된 회원입니다.</p>
                </div>
              </div>
            )}
            {step === SignupStep.EMPLOYER_INFO && (
              <EmployerInfoStep onValidityChange={() => {}} />
            )}
            {step === SignupStep.WORKER_INFO && (
              <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                  <h2 className="text-xl font-bold">근로자 정보</h2>
                  <p>근로자 정보 입력 페이지입니다.</p>
                </div>
              </div>
            )}
            {step === SignupStep.WORKER_EXPERIENCE && (
              <WorkerExperienceStep
                onValidityChange={() => {}}
                onSelectedJobsChange={() => {}}
              />
            )}
            {step === SignupStep.WORKER_LICENSE && (
              <WorkerLicenseStep onValidityChange={() => {}} />
            )}
            {step === SignupStep.WORKER_ACCOUNT && (
              <WorkerAccountStep onValidityChange={() => {}} />
            )}
            {step === SignupStep.PROFILE_SETUP && (
              <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                  <h2 className="text-xl font-bold">프로필 설정</h2>
                  <p>프로필 설정 페이지입니다.</p>
                </div>
              </div>
            )}
          </PresenceTransition>
        </>
      )}
    </main>
  );
};

const SignupPage: React.FC = () => {
  return (
    <SignupProvider>
      <SignupPageContent />
    </SignupProvider>
  );
};

export default SignupPage;
