import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BoxButton from "../components/BoxButton/BoxButton";
import DeprecatedButton from "../components/DeprecatedButton/DeprecatedButton";
import { Drawer, DrawerContent, DrawerTrigger } from "../components/Drawer";
import Modal from "../components/Modal";
import NavigationHeader from "../components/NavigationHeader/NavigationHeader";
import CameraIcon from "../svgs/CameraIcon";
import GalleryIcon from "../svgs/GalleryIcon";
import WarningIcon from "../svgs/WarningIcon";
import { cn } from "../utils/classname";

// 카메라 촬영 함수 (웹 전용, 추후 Capacitor 추가 예정)
const takePicture = async (): Promise<string | null> => {
  try {
    // 현재는 웹 환경에서만 작동 (Capacitor는 추후 설치 시 활성화)
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
    // 현재는 웹 환경에서만 작동 (Capacitor는 추후 설치 시 활성화)
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

const SignupLicensePage: React.FC = () => {
  const navigate = useNavigate();
  const [drawerKey, setDrawerKey] = useState(0);
  const [showSkipModal, setShowSkipModal] = useState(false);
  const [showCameraPermissionModal, setShowCameraPermissionModal] =
    useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleBack = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  const handleCameraSelect = () => {
    console.log("카메라 선택");
    setDrawerKey((prev) => prev + 1); // 드로어 닫기

    // 웹에서는 권한 모달 표시 (추후 모바일에서는 바로 카메라 실행)
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
    setDrawerKey((prev) => prev + 1); // 드로어 닫기

    const imageData = await selectFromGallery();
    if (imageData) {
      setUploadedImage(imageData);
    }
  };

  const handleSkip = () => {
    setShowSkipModal(true);
  };

  const handleSkipNext = () => {
    setShowSkipModal(false);
    // 다음 페이지로 이동
    console.log("다음 페이지로 이동");
    navigate("/");
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

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* 메인 콘텐츠 */}
      <div className="flex-1 px-6 py-8">
        <div className="mx-auto max-w-md">
          {/* 네비게이션 헤더 */}
          <NavigationHeader
            title="정보 입력"
            onBack={handleBack}
            showBackButton={true}
            className="mb-10"
          />

          {/* 헤더 섹션 */}
          <div className="mb-8">
            <h1 className="mb-3 text-3xl font-bold text-gray-900">
              건설업 <span className="text-blue-500">기초안전보건교육 </span>
              <br />
              <span className="text-blue-500">이수증</span>을 등록해주세요
            </h1>
            <p className="text-sm text-gray-500">
              관련 법령(산업안전보건법 31조)에 따라
              <br />
              일자리 매칭 시 이수증 등록이 필요합니다
            </p>
          </div>

          {/* 이수증 업로드 섹션 */}
          <div className="mb-6">
            {uploadedImage ? (
              /* 업로드된 이미지 표시 */
              <div className="relative">
                <img
                  src={uploadedImage}
                  alt="업로드된 이수증"
                  className="h-48 w-full rounded-lg border-2 border-blue-400 object-cover"
                />
                <button
                  onClick={handleImageChange}
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 transition-colors hover:bg-blue-600"
                >
                  <PlusIcon className="h-5 w-5 text-white" />
                </button>
              </div>
            ) : (
              /* 기존 업로드 버튼 */
              <Drawer key={drawerKey}>
                <DrawerTrigger asChild>
                  <button
                    className={cn(
                      "h-48 w-full rounded-lg border-2 border-gray-300",
                      "flex flex-col items-center justify-center bg-gray-50",
                      "transition-all hover:border-gray-400 hover:bg-gray-100",
                      "focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100",
                    )}
                  >
                    <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500">
                      <PlusIcon className="h-12 w-12 text-white" />
                    </div>
                  </button>
                </DrawerTrigger>

                <DrawerContent position="bottom" className="p-6">
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
                </DrawerContent>
              </Drawer>
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
        </div>
      </div>

      {/* 하단 고정 버튼 섹션 (푸터) */}
      <div className="safe-area-inset-bottom bg-white px-6 py-6 pb-12">
        <div className="mx-auto max-w-md">
          <DeprecatedButton
            variant="primary"
            size="md"
            className="w-full bg-gray-200"
            onClick={handleSkip}
          >
            건너뛰기
          </DeprecatedButton>
        </div>
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
            <DeprecatedButton
              variant="primary"
              size="md"
              className="flex-1"
              onClick={handleSkipNext}
            >
              다음에 등록하기
            </DeprecatedButton>
            <DeprecatedButton
              variant="blue"
              size="md"
              className="flex-1"
              onClick={handleStayAndRegister}
            >
              지금 등록하기
            </DeprecatedButton>
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
            <DeprecatedButton
              variant="primary"
              size="md"
              className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
              onClick={handleCameraPermissionDeny}
            >
              거부
            </DeprecatedButton>
            <DeprecatedButton
              variant="blue"
              size="md"
              className="flex-1"
              onClick={handleCameraPermissionAllow}
            >
              허용
            </DeprecatedButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SignupLicensePage;
