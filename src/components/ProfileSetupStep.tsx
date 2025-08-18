import React, { useEffect, useImperativeHandle, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Nullable } from "../types/misc";
import { cn } from "../utils/classname";
import PhotoModal from "./PhotoModal";
import PhotoUpload from "./PhotoUpload";

export type ProfileSetupStepHandle = {
  triggerComplete: () => boolean;
};

type ProfileSetupStepProps = {
  ref?: React.RefObject<Nullable<ProfileSetupStepHandle>>;
  className?: string;
  onValidityChange: (isValid: boolean) => void;
  onComplete?: () => void;
};

const ProfileSetupStep: React.FC<ProfileSetupStepProps> = ({
  className,
  ref,
  onValidityChange,
  onComplete,
}) => {
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [bankAccountFile, setBankAccountFile] = useState<File | null>(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  // 선택사항이므로 단계 자체는 항상 유효
  const isValid = true;

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  // 상위(SignupPage)에서 완료 버튼 클릭 시 호출할 함수
  const triggerComplete = () => {
    if (!certificateFile || !bankAccountFile) {
      setShowPhotoModal(true);
      return false;
    }
    return true;
  };

  useImperativeHandle(ref, () => ({
    triggerComplete,
  }));

  const navigate = useNavigate();
  // PhotoModal의 버튼 클릭 또는 외부 클릭 시 (나중에 설정) 처리
  const handleModalProceed = () => {
    navigate("/"); // 경로는 실제 위치에 맞게 수정
    if (onComplete) onComplete();
  };

  return (
    <div className={cn("", className)}>
      <div className="text-extraBlack-1 mt-6 text-2xl font-black">
        프로필 설정
      </div>
      <div className="mt-1 text-base text-gray-500">
        나중에 내 정보 탭에서 설정이 가능해요
      </div>
      <PhotoUpload
        label="건설업 기초안전보건교육 이수증 (필수)"
        file={certificateFile}
        onFileChange={setCertificateFile}
        className="mt-6"
      />
      <PhotoUpload
        label="임금을 받으실 통장사본 (필수)"
        file={bankAccountFile}
        onFileChange={setBankAccountFile}
        className="mt-6"
      />

      <PhotoModal
        visible={showPhotoModal}
        missingCertificate={!certificateFile}
        missingBankAccount={!bankAccountFile}
        onProceed={handleModalProceed}
        onClose={handlePhotoModalClose}
      />
    </div>
  );

  function handlePhotoModalClose() {
    setShowPhotoModal(false);
  }
};

export default ProfileSetupStep;
