import React from "react";
import Button from "../component/Button/Button";
import { cn } from "../utils/classname";
import HomeIntroList from "../component/Home/HomeIntroList";

export type Props = {
  className?: string;
};

const HomePage: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "w-full flex flex-col justify-end pb-[24%] sm:pb-[20%] md:pb-[5%] items-center h-screen bg-white",
        className
      )}
    >
      <HomeIntroList />
      <div className="w-fit flex gap-4">
        <Button
          variant={"primary"}
          size={"md"}
          className="w-fit"
          children={"로그인"}
        />
        <Button
          variant={"secondary"}
          size={"md"}
          className="w-fit bg-gray-900"
          children="회원가입"
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
