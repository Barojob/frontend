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
      <div className="mt-6 font-black text-2xl text-black">인증번호 확인</div>
      <div className="mt-1 text-base text-gray-500">
        휴대폰으로 발송한 인증번호를 입력해주세요
      </div>
      {/* 인증번호 입력 필드 컨테이너 */}
      <div className="mt-5 relative">
        <div className="flex flex-col border border-gray-200 focus-within:border-gray-500 rounded-md p-2">
          <label className="bg-white px-1 font-normal text-xs text-gray-400">
            인증번호
          </label>
          <input
            type="text"
            placeholder="인증번호를 입력하세요"
            value={verifyNumber}
            onChange={(e) => setVerifyNumber(e.target.value)}
            className="w-full px-1 pt-0.5 pb-0 border-none outline-none"
          />
          {/* 타이머를 오른쪽에 절대 위치로 배치 (입력 필드 내부) */}
          <div className="absolute top-6 right-3 text-xs font-normal text-blue-500">
            {formatTime(timer)}
          </div>
        </div>
      </div>
      <p className="mt-6 text-sm text-center font-light text-gray-500">
        인증번호가 오지 않는다면?{" "}
        <span
          onClick={() => setTimer(180)}
          className="leading-none font-bold border-b border-extraBlack-1"
        >
          재발송
        </span>
      </p>
    </div>
  );
};

export default InputVerifyNumber;
