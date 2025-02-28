import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { cn } from "../../utils/classname";
import PhotoUpload from "./PhotoUpload";
import PhotoModal from "./PhotoModal"; // 경로는 실제 위치에 맞게 수정
import { useNavigate } from "react-router-dom";

export type ProfileSetupStepHandle = {
  triggerComplete: () => boolean;
};

type ProfileSetupStepProps = {
  className?: string;
  onValidityChange: (isValid: boolean) => void;
  onComplete?: () => void;
};

const ProfileSetupStep = forwardRef<
  ProfileSetupStepHandle,
  ProfileSetupStepProps
>(({ className, onValidityChange, onComplete }, ref) => {
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
      <div className="mt-6 font-black text-2xl text-extraBlack-1">
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
      {showPhotoModal && (
        <PhotoModal
          onProceed={handleModalProceed}
          onClose={() => setShowPhotoModal(false)}
          missingCertificate={!certificateFile}
          missingBankAccount={!bankAccountFile}
        />
      )}
    </div>
  );
});

export default ProfileSetupStep;
