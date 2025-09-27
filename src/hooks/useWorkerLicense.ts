import { useCertificateUpload } from "@/hooks/useCertificateUpload";
import useSignupContext from "@/hooks/useSignupContext";
import { SignupStep } from "@/types/signup";
import { selectFromGallery, takePicture } from "@/utils/media";
import { useEffect, useState } from "react";

export const useWorkerLicense = (
  onValidityChange: (isValid: boolean) => void,
) => {
  const {
    stepState: [, setCurrentStep],
    workerLicenseState: [, setWorkerLicense], // 이수증 상태 관리
  } = useSignupContext();

  const { isPending: isUploading } = useCertificateUpload();

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showSkipModal, setShowSkipModal] = useState(false);
  const [showCameraPermissionModal, setShowCameraPermissionModal] =
    useState(false);

  useEffect(() => {
    onValidityChange(true);
  }, [onValidityChange]);

  const handleSelectAndUpload = async (
    selectAction: () => Promise<string | null>,
  ) => {
    const imageData = await selectAction();
    if (imageData) {
      setUploadedImage(imageData);
    }
  };

  const handleCameraSelect = () => {
    setShowCameraPermissionModal(true);
  };

  const handleCameraPermissionAllow = () => {
    setShowCameraPermissionModal(false);
    handleSelectAndUpload(takePicture);
  };

  const handleGallerySelect = () => {
    handleSelectAndUpload(selectFromGallery);
  };

  const handleImageChange = () => {
    handleSelectAndUpload(selectFromGallery);
  };

  const handleImageDelete = () => {
    setUploadedImage(null);
  };

  const handleComplete = async () => {
    // 이수증 데이터를 Context에 저장
    setWorkerLicense({
      certificateImage: uploadedImage, // base64 이미지 데이터 또는 null
    });

    // 계좌 단계로 이동 (API 호출 X)
    setCurrentStep(SignupStep.WORKER_ACCOUNT);
  };

  const handleSkipConfirm = () => {
    setShowSkipModal(false);
    setCurrentStep(SignupStep.WORKER_ACCOUNT);
  };

  return {
    uploadedImage,
    isUploading,
    showSkipModal,
    setShowSkipModal,
    showCameraPermissionModal,
    setShowCameraPermissionModal,
    handleCameraSelect,
    handleCameraPermissionAllow,
    handleGallerySelect,
    handleImageChange,
    handleImageDelete,
    handleComplete,
    handleSkipConfirm,
  };
};
