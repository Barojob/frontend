import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { cn } from "../utils/classname";
import Layout from "../component/layouts/Layout";
import LeftArrowIcon from "../svgs/LeftArrowIcon";
import SignupTermsStep from "../component/Signup/SignupTermsStep";
import PhoneVerificationStep from "../component/Signup/PhoneVerificationStep";
import ProfileSetupStep from "../component/Signup/ProfileSetupStep";
import Button from "../component/Button/Button";

type Props = {
  className?: string;
};

const SignupPage: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isStepValid, setIsStepValid] = useState(false);

  const handleBack = () => {
    if (step === 1) {
      navigate("/");
    } else {
      setStep((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      // 회원가입 완료 처리
      navigate("/signup-complete");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <SignupTermsStep onValidityChange={setIsStepValid} />;
      case 2:
        return <PhoneVerificationStep onValidityChange={setIsStepValid} />;
      case 3:
        return <ProfileSetupStep onValidityChange={setIsStepValid} />;
      default:
        return null;
    }
  };

  return (
    <Layout className={cn("", className)}>
      <div className="w-full h-auto flex flex-1 mt-4 flex-col justify-start">
        <LeftArrowIcon onClick={handleBack} />
        <div>{renderStep()}</div>
        <Button
          disabled={!isStepValid}
          className={cn(
            "w-full py-3 mt-[10%] rounded-[4px] bg-blue-300 border-blue-300 text-black-1 font-normal",
            isStepValid ? "" : "opacity-50"
          )}
          onClick={handleNext}
        >
          {step < 3 ? "다음" : "완료"}
        </Button>
      </div>
    </Layout>
  );
};

export default SignupPage;
