import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../component/Button/Button";
import HomeIntroList from "../component/Home/HomeIntroList";

export type Props = {
  className?: string;
};

const HomePage: React.FC<Props> = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="flex h-full flex-col items-center justify-center px-[6%]">
      <HomeIntroList />
      <div className="flex w-fit gap-4">
        <Button
          variant={"primary"}
          size={"md"}
          className="w-fit"
          onClick={handleLogin}
          onTouchStart={handleLogin}
        >
          로그인
        </Button>
        <Button
          variant={"secondary"}
          size={"md"}
          className="w-fit bg-gray-900"
          onClick={handleSignUp}
          onTouchStart={handleSignUp}
        >
          회원가입
        </Button>
      </div>
      <div className="pt-5 text-[0.875rem] font-normal">
        계정이 기억나지 않나요?{" "}
        <span className="border-b border-black font-bold">계정 찾기</span>
      </div>
    </div>
  );
};

export default HomePage;
