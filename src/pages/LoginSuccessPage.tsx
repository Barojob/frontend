import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import CongratsIcon from "../svgs/CongratsIcon";

const LoginSuccessPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToMain = () => {
    navigate("/");
  };

  return (
    <div className="flex size-full flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-blue-600 px-6 text-white">
      <CongratsIcon className="mb-3" />

      <div className="mb-3 text-center text-2xl font-bold">
        환영합니다!
        <br />
        로그인이 완료되었어요
      </div>
      <div className="mb-32 text-center text-sm text-slate-300">
        이제 일을 매칭하러 가볼까요?
      </div>

      {/* 메인홈으로 이동 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 px-6 pb-10">
        <Button
          onClick={handleGoToMain}
          className="w-full rounded-[0.625rem] border-white bg-white py-6 text-neutral-600"
        >
          메인홈으로 이동하기
        </Button>
      </div>
    </div>
  );
};

export default LoginSuccessPage;
