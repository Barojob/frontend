import React, { useState, useEffect } from "react";
import Button from "../component/Button/Button";
import Input from "../component/Input/Input";
import Layout from "../component/layouts/Layout";
import { cn } from "../utils/classname";
import LeftArrowIcon from "../svgs/LeftArrowIcon";
import { useNavigate } from "react-router-dom";

type Props = {
  className?: string;
};

const LoginPage: React.FC<Props> = ({ className }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [textColor, setTextColor] = useState(false);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    setTextColor(phoneNumber.length === 13);
  }, [phoneNumber]);

  return (
    <Layout className={cn("", className)}>
      <div className="w-full flex flex-1 mt-6 flex-col justify-start">
        <LeftArrowIcon onClick={handleBack} onTouchStart={handleBack} />
        <div className="mt-6 font-black text-2xl">
          안녕하세요!
          <br />
          휴대폰 번호로 로그인해주세요.
        </div>
        <div className="text-[0.75rem] mt-3 text-gray-600">
          휴대폰 번호는 안전하게 보관되며 다른 용도로 사용되지 않아요.
        </div>
        <Input
          type="tel"
          placeholder="휴대폰번호( - 없이 숫자만 입력)"
          value={phoneNumber}
          onValueChange={setPhoneNumber}
          rounded={"md"}
          className="mt-2 text-gray-800 focus:border-blue-2"
        />
        <Button
          className={cn(
            "mt-4 text-base font-black border-2 border-gray-200 transition-colors",
            textColor
              ? "text-white border-blue-500 bg-blue-500"
              : "text-gray-400"
          )}
          children="인증문자 받기"
        />
        <div className="text-center mt-4 text-[13px] text-gray-600 font-normal">
          휴대폰 번호가 변경되었나요?{" "}
          <span className="border-gray-600 border-b">이메일로 계정찾기</span>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
