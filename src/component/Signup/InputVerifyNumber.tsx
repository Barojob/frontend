import React, { useEffect, useState } from "react";
import { cn } from "../../utils/classname";

type Props = {
  className?: string;
  onValidityChange: (valid: boolean) => void;
};

const InputVerifyNumber: React.FC<Props> = ({
  className,
  onValidityChange,
}) => {
  const [verifyNumber, setVerifyNumber] = useState("");
  const [timer, setTimer] = useState(180); // 3분

  useEffect(() => {
    onValidityChange(verifyNumber.length === 6);
  }, [verifyNumber, onValidityChange]);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className={cn("", className)}>
      <div className="mt-6 text-2xl font-black text-extraBlack-1">
        인증번호 확인
      </div>
      <div className="mt-1 text-base text-gray-500">
        휴대폰으로 발송한 인증번호를 입력해주세요
      </div>
      {/* 인증번호 입력 필드 컨테이너 */}
      <div className="relative mt-5">
        <div className="flex flex-col rounded-md border border-gray-200 p-2 focus-within:border-gray-500">
          <label className="bg-white px-1 text-xs font-normal text-gray-400">
            인증번호
          </label>
          <input
            type="text"
            placeholder="인증번호를 입력하세요"
            value={verifyNumber}
            onChange={(e) => setVerifyNumber(e.target.value)}
            className="w-full border-none px-1 pb-0 pt-0.5 outline-none"
            inputMode="numeric"
          />
          {/* 타이머를 오른쪽에 절대 위치로 배치 (입력 필드 내부) */}
          <div className="absolute right-3 top-6 text-xs font-normal text-blue-500">
            {formatTime(timer)}
          </div>
        </div>
      </div>
      <p className="mt-6 text-center text-sm font-light text-gray-500">
        인증번호가 오지 않는다면?{" "}
        <span
          onClick={() => setTimer(180)}
          className="border-b border-extraBlack-1 font-bold leading-none"
        >
          재발송
        </span>
      </p>
    </div>
  );
};

export default InputVerifyNumber;
