import React, { useState, useEffect, useRef } from "react";
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
  const [verificationSent, setVerificationSent] = useState(false);
  const [timer, setTimer] = useState(300);
  const [verificationCode, setVerificationCode] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    let countdown: ReturnType<typeof setInterval>;
    if (verificationSent && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setVerificationSent(false);
    }
    return () => clearInterval(countdown);
  }, [verificationSent, timer]);

  const handleRequestVerification = () => {
    if (phoneNumber.length !== 13) return; // 버튼 비활성화된 상태에서 눌릴 경우 방지
    setVerificationSent(true);
    setTimer(60);
    setVerificationCode("");
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const isPhoneNumberValid = phoneNumber.length === 13;
  const isVerificationCodeValid = verificationCode.length >= 6;

  // 입력 필드가 focus될 때 자동 스크롤
  useEffect(() => {
    const handleFocus = () => {
      setTimeout(() => {
        inputRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 300);
    };

    if (inputRef.current) {
      inputRef.current.addEventListener("focus", handleFocus);
    }

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener("focus", handleFocus);
      }
    };
  }, []);

  return (
    <Layout className={cn("", className)}>
      <div className="w-full flex flex-1 mt-4 flex-col justify-start">
        <LeftArrowIcon onClick={handleBack} onTouchStart={handleBack} />
        <div className="mt-6 font-black text-2xl">
          안녕하세요!
          <br />
          휴대폰 번호로 로그인해주세요.
        </div>
        <div className="text-sm mt-2 text-gray-500">
          휴대폰 번호는 안전하게 보관되며 다른 용도로 사용되지 않아요.
        </div>
        <Input
          type="tel"
          placeholder="휴대폰번호( - 없이 숫자만 입력)"
          value={phoneNumber}
          onValueChange={setPhoneNumber}
          rounded={"md"}
          className="mt-2 text-black-1 focus:border focus:border-gray-400 placeholder-gray-300"
        />
        <Button
          onClick={handleRequestVerification}
          disabled={!isPhoneNumberValid} // 입력값이 13자리 아니면 비활성화
          className={cn(
            "mt-4 text-base font-normal border transition-colors",
            isPhoneNumberValid
              ? "text-white border-gray-400 bg-gray-400"
              : "text-gray-300 border-gray-200 cursor-not-allowed"
          )}
        >
          {verificationSent
            ? `인증문자 다시 받기 (${formatTime(timer)})`
            : "인증문자 받기"}
        </Button>

        {verificationSent && (
          <div className="mt-4">
            <Input
              ref={inputRef}
              type="text"
              placeholder="인증번호 입력"
              value={verificationCode}
              onValueChange={setVerificationCode}
              rounded={"md"}
              className="mt-2 focus:border-blue-500 text-black-1 placeholder-gray-300"
            />
            <div className="p-1 text-gray-500 text-sm">
              어떤 경우에도 타인과 공유하지 마세요!
            </div>
            <Button
              className={cn(
                "mt-3 text-base font-normal border-2 transition-colors",
                isVerificationCodeValid
                  ? "border-blue-500 bg-blue-500 text-gray-100"
                  : "border-gray-300 text-gray-400 cursor-not-allowed",
                { "opacity-50 pointer-events-none": !isVerificationCodeValid } // 6자리 입력 안 되면 비활성화
              )}
            >
              인증번호 확인
            </Button>
          </div>
        )}

        <div className="text-center mt-4 text-[0.8125rem] text-gray-600 font-normal">
          휴대폰 번호가 변경되었나요?{" "}
          <span className="border-gray-600 border-b">이메일로 계정찾기</span>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
