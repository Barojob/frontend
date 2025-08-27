import BoxButton from "@/components/BoxButton";
import Button from "@/components/Button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/Drawer";
import Modal from "@/components/Modal";
import { useWorkerLicense } from "@/hooks/useWorkerLicense";
import CameraIcon from "@/svgs/CameraIcon";
import GalleryIcon from "@/svgs/GalleryIcon";
import WarningIcon from "@/svgs/WarningIcon";
import { cn } from "@/utils/classname";
import {
  ArrowUturnLeftIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";

type WorkerLicenseStepProps = {
  className?: string;
  onValidityChange: (isValid: boolean) => void;
};

const WorkerLicenseStep: React.FC<WorkerLicenseStepProps> = ({
  className,
  onValidityChange,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const {
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
  } = useWorkerLicense(onValidityChange);

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="flex-1">
        <div className="mt-8">
          <div className="text-2xl font-bold text-gray-900">
            건설업 <span className="text-blue-500">기초안전보건교육</span>
          </div>
          <div className="mt-1 text-2xl font-bold text-gray-900">
            <span className="text-blue-500">이수증</span>을 등록해주세요
          </div>
          <p className="mt-4 text-sm text-gray-500">
            관련 법령(산업안전보건법 31조)에 따라
            <br />
            일자리 매칭 시 이수증 등록이 필요합니다
          </p>
        </div>

        <div className="mb-6 mt-12">
          {uploadedImage ? (
            <div className="relative">
              <img
                src={uploadedImage}
                alt="업로드된 이수증"
                className="h-48 w-full rounded-lg border-2 border-blue-400 object-contain"
              />
              <div className="absolute right-2 top-2 flex flex-col gap-2">
                <button
                  onClick={handleImageChange}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500"
                >
                  <ArrowUturnLeftIcon className="h-5 w-5 text-white" />
                </button>
                <button
                  onClick={handleImageDelete}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500"
                >
                  <XMarkIcon className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
          ) : (
            <Drawer>
              <DrawerTrigger asChild>
                <button
                  className={cn(
                    "h-48 w-full rounded-lg border-2 border-gray-300",
                    "flex flex-col items-center justify-center bg-gray-50",
                  )}
                >
                  <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500">
                    <PlusIcon className="h-12 w-12 text-white" />
                  </div>
                </button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>이수증 등록 방법 선택</DrawerTitle>
                </DrawerHeader>
                <div className="flex gap-4 p-6">
                  <BoxButton
                    name="카메라"
                    className="!h-36 flex-1"
                    icon={<CameraIcon width="64" height="64" />}
                    onClick={() => {
                      setIsDrawerOpen(false);
                      handleCameraSelect();
                    }}
                  />
                  <BoxButton
                    name="갤러리"
                    className="!h-36 flex-1"
                    icon={<GalleryIcon width="64" height="64" />}
                    onClick={() => {
                      setIsDrawerOpen(false);
                      handleGallerySelect();
                    }}
                  />
                </div>
              </DrawerContent>
            </Drawer>
          )}
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-100 px-4 py-3">
          <div className="flex items-center">
            <div className="mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500">
              <span className="text-sm font-bold text-white">!</span>
            </div>
            <span className="text-sm font-medium text-blue-400">
              이수증 <span className="text-blue-600">앞면이 나온 사진</span>을
              등록해주세요
            </span>
          </div>
        </div>
      </div>

      {!isDrawerOpen && (
        <div className="fixed-bottom-button">
          <Button
            onClick={
              uploadedImage ? handleComplete : () => setShowSkipModal(true)
            }
            theme="primary"
            size="md"
            block
          >
            {uploadedImage ? "완료" : "건너뛰기"}
          </Button>
        </div>
      )}

      <Modal visible={showSkipModal} onClose={() => setShowSkipModal(false)}>
        <div className="px-8 py-10 text-center">
          <div className="mb-4 flex justify-center">
            <WarningIcon />
          </div>
          <h2 className="mb-3 text-2xl font-bold">다음에 등록할까요?</h2>
          <p className="mb-8 text-xs font-medium text-gray-500">
            이수증을 등록하지 않으면 매칭이 불가능해요
            <br />
            매칭 전 마이페이지에서 등록할 수 있어요
          </p>
          <div className="flex gap-3">
            <Button
              onClick={handleSkipConfirm}
              theme="secondary"
              size="md"
              block
            >
              다음에 등록하기
            </Button>
            <Button
              onClick={() => setShowSkipModal(false)}
              theme="primary"
              size="md"
              block
            >
              지금 등록하기
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        visible={showCameraPermissionModal}
        onClose={() => setShowCameraPermissionModal(false)}
      >
        <div className="px-8 py-10 text-center">
          <div className="mb-6 flex justify-center">
            <CameraIcon width="80" height="80" />
          </div>
          <h2 className="mb-3 text-2xl font-bold">카메라 접근 권한 허용</h2>
          <p className="mb-8 text-sm font-medium text-gray-400">
            카메라에서 사진을 촬영하고
            <br />
            동영상을 녹화하도록 허용하시겠어요?
          </p>
          <div className="flex gap-3">
            <Button
              onClick={() => setShowCameraPermissionModal(false)}
              theme="secondary"
              size="md"
              block
            >
              거부
            </Button>
            <Button
              onClick={handleCameraPermissionAllow}
              theme="primary"
              size="md"
              block
            >
              허용
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WorkerLicenseStep;
