import React from "react";
import ModalWrapper from "../ModalWrapper";
import Button from "../Button/Button";

type PhotoModalProps = {
  onProceed: () => void;
  missingCertificate: boolean;
  missingBankAccount: boolean;
  className?: string;
};

const PhotoModal: React.FC<PhotoModalProps> = ({
  className,
  onProceed,
  missingCertificate,
  missingBankAccount,
}) => {
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
    <ModalWrapper onClose={onProceed} className={className}>
      <div className="text-xl mb-8 text-center font-black">
        {missingMessage}
        <br />
        나중에 설정할까요?
        <br />
        <span className="text-xs text-gray-400">
          인증 미등록시 매칭이 불가합니다.
        </span>
      </div>
      <Button
        onClick={onProceed}
        className="absolute bottom-0 left-0 rounded-none w-full py-4 bg-blue-300 border-blue-300 text-extraBlack-1 font-normal"
      >
        나중에 설정할게요
      </Button>
    </ModalWrapper>
  );
};

export default PhotoModal;
