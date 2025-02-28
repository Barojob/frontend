import React, { useState, useEffect } from "react";
import { cn } from "../../utils/classname";
import Button from "../Button/Button";

type Props = {
  className?: string;
  onProceed: () => void;
  missingCertificate: boolean;
  missingBankAccount: boolean;
};

const PhotoModal: React.FC<Props> = ({
  className,
  onProceed,
  missingCertificate,
  missingBankAccount,
}) => {
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    // 배경 스크롤 방지
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // 외부 클릭 시 모달 닫기 (애니메이션 후 onProceed 호출)
  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => {
      onProceed();
    }, 400); // exit 애니메이션 지속시간
  };

  // 누락된 항목에 따라 메시지 구성
  const missingItems: string[] = [];
  if (missingCertificate) missingItems.push("이수증");
  if (missingBankAccount) missingItems.push("통장 사본");

  let missingMessage = "";
  if (missingItems.length === 1) {
    missingMessage = `현재 ${missingItems[0]}이 등록되지 않았습니다.`;
  } else if (missingItems.length === 2) {
    missingMessage = `현재 ${missingItems.join(" 및 ")}이 등록되지 않았습니다.`;
  }

  return (
    <div className={cn("fixed inset-0 z-50", className)} onClick={handleClose}>
      <div className="absolute inset-0 bg-black bg-opacity-80" />
      <div className="absolute bottom-0 left-0 right-0 max-w-[460px] mx-auto">
        <div
          className={cn(
            "bg-white rounded-t-[40px] py-8 px-6 w-full transition-transform duration-400 transform",
            animate ? "animate-slide-up" : "animate-slide-down"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-xl mb-8 text-center font-black">
            {missingMessage}
            <br />
            나중에 설정할까요?
            <br />
            <span className="text-xs text-gray-400">
              인증 미등록시 매칭이 불가합니다.
            </span>
          </div>
        </div>
        <Button
          onClick={onProceed}
          className={cn(
            "absolute bottom-0 left-0 rounded-none w-full py-4 bg-blue-300 border-blue-300 text-extraBlack-1 font-normal"
          )}
        >
          나중에 설정할게요
        </Button>
      </div>
    </div>
  );
};

export default PhotoModal;
