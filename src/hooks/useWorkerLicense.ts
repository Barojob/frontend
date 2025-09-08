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
  } = useSignupContext();

  const { mutateAsync: uploadCertificate, isPending: isUploading } =
    useCertificateUpload();

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
    if (!uploadedImage) {
      setCurrentStep(SignupStep.WORKER_ACCOUNT);
      return;
    }

    try {
      await uploadCertificate({
        certificate: uploadedImage,
      });
      setCurrentStep(SignupStep.WORKER_ACCOUNT);
    } catch (error) {
      console.error("이수증 업로드 실패:", error);
      // 실패해도 일단 다음 단계로 진행
      setCurrentStep(SignupStep.WORKER_ACCOUNT);
    }
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
