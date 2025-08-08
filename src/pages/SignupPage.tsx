import React from "react";
import PresenceTransition from "../components/PresenceTransition";
import PhoneVerificationStep from "../components/Signup/PhoneVerificationStep";
import SignupTermsStep from "../components/Signup/SignupTermsStep";
import SignupHeader from "../components/SignupHeader";
import { CheckItem } from "../components/SignUpTerms";
import TERMS_FIXTURE from "../fixtures/terms.json";
import { SignupStep } from "../types/signup";

const SignupPage: React.FC = () => {
  const [step, setStep] = React.useState(SignupStep.TERMS);
  const [terms, setTerms] = React.useState<CheckItem[]>(TERMS_FIXTURE);

  return (
    <main className="relative flex min-h-screen flex-col px-6">
      <SignupHeader className="mt-4" step={step} onStepChange={setStep} />

      <PresenceTransition
        className="flex-1 overflow-y-auto"
        transitionKey={step.toString()}
        variant="fadeInOut"
      >
        {step === SignupStep.TERMS && (
          <SignupTermsStep
            items={terms}
            onTermsChange={setTerms}
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
  );

  function handleStepChange(step: SignupStep) {
    return () => {
      setStep(step);
    };
  }
};

export default SignupPage;
