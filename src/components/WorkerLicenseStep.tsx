import {
  ArrowUturnLeftIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import useSignupContext from "../hooks/useSignupContext";
import CameraIcon from "../svgs/CameraIcon";
import GalleryIcon from "../svgs/GalleryIcon";
import WarningIcon from "../svgs/WarningIcon";
import { SignupStep } from "../types/signup";
import { cn } from "../utils/classname";
import BoxButton from "./BoxButton";
import Button from "./Button";
import Modal from "./Modal";

// 카메라 촬영 함수 (웹 전용, 추후 Capacitor 추가 예정)
const takePicture = async (): Promise<string | null> => {
  try {
    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.capture = "environment";
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        } else {
          resolve(null);
        }
      };
      input.click();
    });
  } catch (error) {
    console.error("카메라 사용 중 오류:", error);
    return null;
  }
};

// 갤러리에서 사진 선택 함수 (웹 전용, 추후 Capacitor 추가 예정)
const selectFromGallery = async (): Promise<string | null> => {
  try {
    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        } else {
          resolve(null);
        }
      };
      input.click();
    });
  } catch (error) {
    console.error("갤러리 사용 중 오류:", error);
    return null;
  }
};

type WorkerLicenseStepProps = {
  className?: string;
  onValidityChange: (isValid: boolean) => void;
};

const WorkerLicenseStep: React.FC<WorkerLicenseStepProps> = ({
  className,
  onValidityChange,
}) => {
  const {
    stepState: [, setCurrentStep],
  } = useSignupContext();

  const [showSkipModal, setShowSkipModal] = useState(false);
  const [showCameraPermissionModal, setShowCameraPermissionModal] =
    useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // 유효성 검사 - 항상 유효 (건너뛸 수 있음)
  const isValid = true;

  const handleCameraSelect = () => {
    console.log("카메라 선택");
    setIsDrawerOpen(false); // 드로어 상태 업데이트
    setShowCameraPermissionModal(true);
  };

  const handleCameraCapture = async () => {
    const imageData = await takePicture();
    if (imageData) {
      setUploadedImage(imageData);
    }
  };

  const handleGallerySelect = async () => {
    console.log("갤러리 선택");
    setIsDrawerOpen(false); // 드로어 상태 업데이트

    const imageData = await selectFromGallery();
    if (imageData) {
      setUploadedImage(imageData);
    }
  };

  const handleSkip = () => {
    setShowSkipModal(true);
  };

  const handleSkipConfirm = () => {
    setShowSkipModal(false);
    // 계좌 등록 페이지로 이동
    setCurrentStep(SignupStep.WORKER_ACCOUNT);
  };

  const handleStayAndRegister = () => {
    setShowSkipModal(false);
    // 모달만 닫고 현재 페이지에 머물기
  };

  const handleCameraPermissionDeny = () => {
    setShowCameraPermissionModal(false);
    console.log("카메라 권한 거부");
  };

  const handleCameraPermissionAllow = async () => {
    setShowCameraPermissionModal(false);
    console.log("카메라 권한 허용");
    await handleCameraCapture();
  };

  const handleImageChange = async () => {
    // 이미지 변경을 위해 갤러리에서 새 이미지 선택
    const imageData = await selectFromGallery();
    if (imageData) {
      setUploadedImage(imageData);
    }
  };

  const handleImageDelete = () => {
    setUploadedImage(null);
  };

  const handleComplete = () => {
    // 이수증 등록 완료 후 계좌 등록 페이지로 이동
    setCurrentStep(SignupStep.WORKER_ACCOUNT);
  };

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  useEffect(() => {
    console.log("WorkerLicenseStep isDrawerOpen 상태 변화:", isDrawerOpen);
  }, [isDrawerOpen]);

  return (
    <div className={cn("", className)}>
      {/* 상단 타이틀 */}
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

      {/* 이수증 업로드 섹션 */}
      <div className="mb-6 mt-12">
        {uploadedImage ? (
          /* 업로드된 이미지 표시 */
          <div className="relative">
            <img
              src={uploadedImage}
              alt="업로드된 이수증"
              className="h-48 w-full rounded-lg border-2 border-blue-400 bg-gray-50 object-contain"
            />
            <div className="absolute right-2 top-2 flex flex-col gap-2">
              <button
                onClick={handleImageChange}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 transition-colors hover:bg-blue-600 active:scale-[0.95]"
              >
                <ArrowUturnLeftIcon className="h-5 w-5 text-white" />
              </button>
              <button
                onClick={handleImageDelete}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 transition-colors hover:bg-red-600 active:scale-[0.95]"
              >
                <XMarkIcon className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        ) : (
          /* 기존 업로드 버튼 */
          <>
            <button
              className={cn(
                "h-48 w-full rounded-lg border-2 border-gray-300",
                "flex flex-col items-center justify-center bg-gray-50",
                "transition-all hover:border-gray-400 hover:bg-gray-100",
                "focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100",
                "active:scale-[0.98]",
              )}
              onClick={(e) => {
                e.stopPropagation(); // 이벤트 버블링 방지
                console.log("+ 버튼 클릭, setIsDrawerOpen(true) 호출");
                setIsDrawerOpen(true);
              }}
            >
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500">
                <PlusIcon className="h-12 w-12 text-white" />
              </div>
            </button>

            {/* 커스텀 드로어 */}
            {isDrawerOpen && (
              <div className="fixed inset-0 z-50 flex items-end justify-center">
                {/* Backdrop */}
                <div
                  className="fixed inset-0 bg-black/50 transition-opacity duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDrawerOpen(false);
                  }}
                />

                {/* Drawer Content */}
                <div
                  className="relative max-h-[85vh] w-full max-w-lg transform overflow-hidden rounded-t-lg bg-white p-6 shadow-lg transition-all duration-300 ease-out"
                  onClick={(e) => e.stopPropagation()} // 드로어 내부 클릭 시 닫히지 않도록
                >
                  {/* Handle */}
                  <div className="flex justify-center pb-2 pt-4">
                    <div className="h-1 w-10 rounded-full bg-gray-300" />
                  </div>

                  <div className="mb-4">
                    <h3 className="flex items-center justify-center text-lg font-semibold text-gray-900">
                      이수증 등록 방법 선택
                    </h3>
                  </div>

                  <div className="flex gap-4">
                    <BoxButton
                      name="카메라"
                      variant="primary"
                      className="!h-36 !w-full"
                      icon={<CameraIcon width="64" height="64" />}
                      onClick={handleCameraSelect}
                    />
                    <BoxButton
                      name="갤러리"
                      variant="primary"
                      className="!h-36 !w-full"
                      icon={<GalleryIcon width="64" height="64" />}
                      onClick={handleGallerySelect}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* 안내 박스 */}
      <div className="mb-6 rounded-lg border border-blue-200 bg-blue-100 px-4 py-3">
        <div className="flex items-center">
          <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500">
            <span className="text-sm font-bold text-white">!</span>
          </div>
          <span className="text-sm font-medium text-blue-400">
            이수증 <span className="text-blue-600">앞면이 나온 사진</span>을
            등록해주세요
          </span>
        </div>
      </div>

      {/* 하단 버튼 영역 - 화면 하단 고정 */}
      <div className="animate-slide-up fixed-bottom-button">
        {uploadedImage ? (
          <Button
            onClick={handleComplete}
            theme="primary"
            size="md"
            className="w-full transition-transform duration-150 active:scale-[0.95]"
          >
            완료
          </Button>
        ) : (
          !isDrawerOpen && (
            <Button
              onClick={handleSkip}
              theme="primary"
              size="md"
              className="w-full transition-transform duration-150 active:scale-[0.95]"
            >
              건너뛰기
            </Button>
          )
        )}
      </div>

      {/* 건너뛰기 모달 */}
      <Modal visible={showSkipModal} onClose={() => setShowSkipModal(false)}>
        <div className="px-8 py-10 text-center">
          {/* 삼각형 느낌표 아이콘 */}
          <div className="mb-4 flex justify-center">
            <WarningIcon />
          </div>

          {/* 메인 메시지 */}
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            다음에 등록할까요?
          </h2>

          {/* 서브 메시지 */}
          <p className="mb-8 text-xs font-medium text-gray-500">
            이수증을 등록하지 않으면 매칭이 불가능해요
            <br />
            매칭 전 마이페이지에서 등록할 수 있어요
          </p>

          {/* 버튼들 */}
          <div className="flex gap-3">
            <Button
              onClick={handleSkipConfirm}
              theme="secondary"
              size="md"
              className="flex-1 transition-transform duration-150 active:scale-[0.95]"
            >
              다음에 등록하기
            </Button>
            <Button
              onClick={handleStayAndRegister}
              theme="primary"
              size="md"
              className="flex-1 transition-transform duration-150 active:scale-[0.95]"
            >
              지금 등록하기
            </Button>
          </div>
        </div>
      </Modal>

      {/* 카메라 권한 요청 모달 */}
      <Modal
        visible={showCameraPermissionModal}
        onClose={() => setShowCameraPermissionModal(false)}
      >
        <div className="px-8 py-10 text-center">
          {/* 카메라 아이콘 */}
          <div className="mb-6 flex justify-center">
            <CameraIcon width="80" height="80" />
          </div>

          {/* 메인 메시지 */}
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            카메라 접근 권한 허용
          </h2>

          {/* 서브 메시지 */}
          <p className="mb-8 text-sm font-medium text-gray-400">
            카메라에서 사진을 촬용하고
            <br />
            동영상을 녹화하도록 허용하시겠어요?
          </p>

          {/* 버튼들 */}
          <div className="flex gap-3">
            <Button
              onClick={handleCameraPermissionDeny}
              theme="secondary"
              size="md"
              className="flex-1 transition-transform duration-150 active:scale-[0.95]"
            >
              거부
            </Button>
            <Button
              onClick={handleCameraPermissionAllow}
              theme="primary"
              size="md"
              className="flex-1 transition-transform duration-150 active:scale-[0.95]"
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
