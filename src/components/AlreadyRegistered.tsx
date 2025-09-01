import { cn } from "@/utils/classname";
import React from "react";

type AlreadyRegisteredProps = {
  className?: string;
};

const AlreadyRegistered: React.FC<AlreadyRegisteredProps> = ({ className }) => {
  return (
    <div className={cn("flex flex-col justify-center p-4", className)}>
      <div className="m-6 text-center text-2xl font-bold">
        이미 가입된 회원입니다.
      </div>
      <p className="mb-4 text-center">
        입력하신 전화번호는 이미 가입되어 있습니다.
        <br /> 로그인 페이지로 이동하시겠습니까?
      </p>
    </div>
  );
};

export default AlreadyRegistered;
