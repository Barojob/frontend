import React from "react";
import ModalWrapper from "../ModalWrapper";
import Button from "../Button/Button";

type PhotoModalProps = {
  onProceed: () => void;
  onClose: () => void;
  missingCertificate: boolean;
  missingBankAccount: boolean;
  className?: string;
};

const PhotoModal: React.FC<PhotoModalProps> = ({
  className,
  onProceed,
  onClose,
  missingCertificate,
  missingBankAccount,
}) => {
  const missingItems: string[] = [];
  if (missingCertificate) missingItems.push("이수증");
  if (missingBankAccount) missingItems.push("통장 사본");

  let missingMessage = "";
  if (missingItems.length === 1) {
    missingMessage = `${missingItems[0]}이 등록되지 않았습니다.`;
  } else if (missingItems.length === 2) {
    missingMessage = `${missingItems.join(" 및 ")}이 등록되지 않았습니다.`;
  }

  return (
    <ModalWrapper onClose={onProceed} className={className}>
      <div className="pb-7 pt-5 text-center text-xl font-black">
        {missingMessage}
        <br />
        나중에 설정할까요?
      </div>
      <div className="mb-14 text-center text-sm text-gray-500">
        인증 미등록시 매칭이 불가합니다.
      </div>
      <div className="absolute bottom-0 left-0 grid w-full grid-cols-2">
        <Button
          onClick={onClose}
          className="w-full rounded-none border-gray-400 bg-gray-400 py-4 font-normal text-white"
        >
          지금 할게요
        </Button>
        <Button
          onClick={onProceed}
          className="w-full rounded-none border-blue-500 bg-blue-500 py-4 font-normal text-white"
        >
          나중에 할게요
        </Button>
      </div>
    </ModalWrapper>
  );
};

export default PhotoModal;
