import { useEffect, useState } from "react";
import { SignupStep } from "../types/signup";
import { selectFromGallery, takePicture } from "../utils/media";
import useSignupContext from "./useSignupContext";

export const useWorkerLicense = (
  onValidityChange: (isValid: boolean) => void,
) => {
  const {
    stepState: [, setCurrentStep],
  } = useSignupContext();

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

  const handleComplete = () => {
    // FIXME: 업로드된 이미지(uploadedImage)를 서버로 전송하는 로직 필요
    setCurrentStep(SignupStep.WORKER_ACCOUNT);
  };

  const handleSkipConfirm = () => {
    setShowSkipModal(false);
    setCurrentStep(SignupStep.WORKER_ACCOUNT);
  };

  return {
    uploadedImage,
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
