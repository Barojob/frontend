import React from "react";
import Button from "../component/Button/Button";
import HomeIntroList from "../component/Home/HomeIntroList";
import { useNavigate } from "react-router-dom";

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
    <div className="px-[6%] flex flex-col justify-center items-center h-full">
      <HomeIntroList />
      <div className="w-fit flex gap-4">
        <Button
          variant={"primary"}
          size={"md"}
          className="w-fit"
          children="로그인"
          onClick={handleLogin}
          onTouchStart={handleLogin}
        />
        <Button
          variant={"secondary"}
          size={"md"}
          className="w-fit bg-gray-900"
          children="회원가입"
          onClick={handleSignUp}
          onTouchStart={handleSignUp}
        />
      </div>
      <div className=" font-normal text-[0.875rem] pt-5">
        계정이 기억나지 않나요?{" "}
        <span className="font-bold border-b border-black">계정 찾기</span>
      </div>
    </div>
  );
};

export default HomePage;
