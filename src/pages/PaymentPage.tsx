import NavigationHeader from "@/components/NavigationHeader";
import StepIndicator from "@/components/StepIndicator";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  className?: string;
};

const PaymentPage: React.FC<Props> = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full flex-col bg-white">
      <div className="flex-shrink-0 bg-white px-6 pt-12">
        <NavigationHeader
          title="결제"
          className="mb-7"
          onBack={() => navigate(-1)}
        />
        <StepIndicator currentStep={3} totalSteps={3} />
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <h1 className="mb-2 text-2xl font-bold text-neutral-700">결제</h1>
        <p className="text-sm text-neutral-500">결제 플로우는 추후 연동 예정</p>
      </div>

      <div className="flex-shrink-0 px-6 py-4">
        <button
          onClick={() => navigate("/")}
          className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white"
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
