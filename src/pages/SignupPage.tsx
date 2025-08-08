import React from "react";
import PresenceTransition from "../components/PresenceTransition";
import PhoneVerificationStep from "../components/Signup/PhoneVerificationStep";
import SignupTermsStep from "../components/Signup/SignupTermsStep";
import SignupHeader from "../components/SignupHeader";
import SignupProvider from "../providers/SignupProvider";
import { SignupStep } from "../types/signup";

const SignupPage: React.FC = () => {
  const [step, setStep] = React.useState(SignupStep.TERMS);

  return (
    <SignupProvider>
      <main className="relative flex min-h-screen flex-col px-6">
        <SignupHeader className="mt-4" step={step} onStepChange={setStep} />

        <PresenceTransition
          className="flex-1 overflow-y-auto"
          transitionKey={step.toString()}
          variant="fadeInOut"
        >
          {step === SignupStep.TERMS && (
            <SignupTermsStep
              onStepChange={handleStepChange(SignupStep.PHONE_VERIFICATION)}
            />
          )}
          {step === SignupStep.PHONE_VERIFICATION && (
            <PhoneVerificationStep
              verificationSent={false}
              onSendVerification={() => {}}
              onValidityChange={() => {}}
            />
          )}

          {/* FIXME: add other steps */}
        </PresenceTransition>
      </main>
    </SignupProvider>
  );

  function handleStepChange(step: SignupStep) {
    return () => {
      setStep(step);
    };
  }
};

export default SignupPage;
