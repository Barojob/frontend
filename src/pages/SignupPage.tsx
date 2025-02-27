import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "../utils/classname";
import Layout from "../component/layouts/Layout";
import LeftArrowIcon from "../svgs/LeftArrowIcon";
import SignupTermsStep from "../component/Signup/SignupTermsStep";
import PhoneVerificationStep from "../component/Signup/PhoneVerificationStep";
import ProfileSetupStep from "../component/Signup/ProfileSetupStep";
import Button from "../component/Button/Button";
import PhoneAgreeModal from "../component/Signup/PhoneAgreeModal";
import InputVerifyNumber from "../component/Signup/InputVerifyNumber";

type Props = {
  className?: string;
};

const SignupPage: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isStepValid, setIsStepValid] = useState(false);
  const [showPhoneAgreeModal, setShowPhoneAgreeModal] = useState(false);
  const [phoneAgree, setPhoneAgree] = useState(false);

  const handleBack = () => {
    if (step === 1) {
      navigate("/");
    } else {
      if (step === 3) {
        setPhoneAgree(false);
      }
      setStep((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (step === 2) {
      // 2단계에서는 모달을 열어서 약관 동의를 받도록 함
      setShowPhoneAgreeModal(true);
    } else if (step < 4) {
      setStep((prev) => prev + 1);
    } else {
      // 회원가입 완료 처리
      navigate("/signup-complete");
    }
  };

  // phoneAgree가 true가 되어야만 다음 단계로 진행
  useEffect(() => {
    if (phoneAgree && step === 2) {
      setStep(3);
    }
  }, [phoneAgree, step]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <SignupTermsStep onValidityChange={setIsStepValid} />;
      case 2:
        return <PhoneVerificationStep onValidityChange={setIsStepValid} />;
      case 3:
        return <InputVerifyNumber onValidityChange={setIsStepValid} />;
      case 4:
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
            "w-full py-3 mt-[10%] rounded-[4px] bg-blue-300 border-blue-300 text-extraBlack-1 font-normal",
            isStepValid ? "" : "opacity-50"
          )}
          onClick={handleNext}
        >
          {step < 4 ? "다음" : "완료"}
        </Button>
      </div>
      {showPhoneAgreeModal && (
        <PhoneAgreeModal
          setPhoneAgree={setPhoneAgree}
          setShowPhoneAgreeModal={setShowPhoneAgreeModal}
          // 부모에서는 onAllCheckedChange를 처리하지 않도록 빈 함수 전달
          onAllCheckedChange={() => {}}
        />
      )}
    </Layout>
  );
};

export default SignupPage;
