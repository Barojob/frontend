import DeprecatedButton from "@/components/DeprecatedButton";
import Modal from "@/components/Modal";
import React from "react";

type PhotoModalProps = {
  className?: string;
  missingCertificate: boolean;
  missingBankAccount: boolean;
  visible: boolean;
  onProceed: () => void;
  onClose: () => void;
};

const PhotoModal: React.FC<PhotoModalProps> = ({
  className,
  missingCertificate,
  missingBankAccount,
  visible,
  onProceed,
  onClose,
}) => {
  // FIXME: replace this with react use-state
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
    <Modal className={className} visible={visible} onClose={onClose}>
      <div className="pb-7 pt-5 text-center text-xl font-black">
        {missingMessage}
        <br />
        나중에 설정할까요?
      </div>
      <div className="mb-14 text-center text-sm text-gray-500">
        인증 미등록시 매칭이 불가합니다.
      </div>
      <div className="absolute bottom-0 left-0 grid w-full grid-cols-2">
        <DeprecatedButton
          onClick={onProceed}
          className="w-full rounded-none border-gray-400 bg-gray-400 py-4 font-normal text-white"
        >
          지금 할게요
        </DeprecatedButton>
        <DeprecatedButton
          onClick={onClose}
          className="w-full rounded-none border-blue-500 bg-blue-500 py-4 font-normal text-white"
        >
          나중에 할게요
        </DeprecatedButton>
      </div>
    </Modal>
  );
};

export default PhotoModal;
