import Button from "@/components/Button";
import useSignupContext from "@/hooks/useSignupContext";
import CongratsIcon from "@/svgs/CongratsIcon";
import React from "react";
import { useNavigate } from "react-router-dom";

const SignupSuccessStep: React.FC = () => {
  const navigate = useNavigate();
  const {
    personalInfoState: [personalInfo],
    userTypeState: [userType],
  } = useSignupContext();

  const handleGoToLogin = () => {
    // 회원가입한 정보를 localStorage에 저장
    localStorage.setItem("recentSignupPhone", personalInfo.phoneNumber);
    localStorage.setItem("recentSignupUserType", userType || "");
    navigate("/login");
  };

  return (
    <div className="absolute inset-0 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-blue-600 text-white">
      <div className="mt-8 flex flex-1 flex-col items-center justify-center px-6">
        <CongratsIcon className="mb-3" />

        <div className="mb-3 text-center text-2xl font-bold">
          환영합니다!
          <br />
          회원가입이 완료되었어요
        </div>
        <div className="mb-32 text-center text-sm text-slate-300">
          이제 로그인만 하면 준비 끝이에요요
          <br />
          로그인 페이지로 이동할게요!
        </div>
      </div>

      <div className="w-full px-6 pb-8">
        <Button
          size="md"
          theme="primary"
          onClick={handleGoToLogin}
          className="w-full rounded-[0.625rem] border-white bg-white py-3 text-neutral-600 transition-transform duration-150 active:scale-[0.95]"
        >
          로그인 페이지로 이동하기
        </Button>
      </div>
    </div>
  );
};

export default SignupSuccessStep;
