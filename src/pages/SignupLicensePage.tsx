import { ExclamationTriangleIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BoxButton from "../components/BoxButton/BoxButton";
import Button from "../components/Button/Button";
import { Drawer, DrawerContent, DrawerTrigger } from "../components/Drawer";
import Modal from "../components/Modal";
import NavigationHeader from "../components/layouts/NavigationHeader";
import { cn } from "../utils/classname";

const SignupLicensePage: React.FC = () => {
  const navigate = useNavigate();
  const [drawerKey, setDrawerKey] = useState(0);
  const [showSkipModal, setShowSkipModal] = useState(false);

  const handleBack = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  const handleCameraSelect = () => {
    console.log("카메라 선택");
    // 카메라 기능 구현
    setDrawerKey(prev => prev + 1); // 드로어 닫기
  };

  const handleGallerySelect = () => {
    console.log("갤러리 선택");
    // 갤러리 기능 구현
    setDrawerKey(prev => prev + 1); // 드로어 닫기
  };

  const handleSkip = () => {
    setShowSkipModal(true);
  };

  const handleSkipNext = () => {
    setShowSkipModal(false);
    // 다음 페이지로 이동
    console.log("다음 페이지로 이동");
    // TODO: 실제 네비게이션 구현
    // navigate('/next-page');
  };

  const handleStayAndRegister = () => {
    setShowSkipModal(false);
    // 모달만 닫고 현재 페이지에 머물기
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 메인 콘텐츠 */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-md mx-auto">
          {/* 네비게이션 헤더 */}
          <NavigationHeader 
            title="정보 입력" 
            onBack={handleBack}
            showBackButton={true}
            className="mb-10"
          />
          
          {/* 헤더 섹션 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
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
            <Drawer key={drawerKey}>
              <DrawerTrigger asChild>
                <button
                  className={cn(
                    "w-full h-48 border-2 border-gray-300 rounded-lg",
                    "bg-gray-50 flex flex-col items-center justify-center",
                    "hover:border-gray-400 hover:bg-gray-100 transition-all",
                    "focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  )}
                >
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-3">
                    <PlusIcon className="w-12 h-12 text-white" />
                  </div>
                </button>
              </DrawerTrigger>
              
              <DrawerContent position="bottom" className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center justify-center">
                    이수증 등록 방법 선택
                  </h3>
                </div>
                
                <div className="flex gap-4">
                  <BoxButton
                    name="카메라"
                    variant="primary"
                    className="!w-full !h-36"
                    onClick={handleCameraSelect}
                  />
                  <BoxButton
                    name="갤러리"
                    variant="primary"
                    className="!w-full !h-36"
                    onClick={handleGallerySelect}
                  />
                </div>
              </DrawerContent>
            </Drawer>
          </div>

          {/* 안내 박스 */}
          <div className="bg-blue-100 border border-blue-200 rounded-lg px-4 py-3 mb-6">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">!</span>
              </div>
              <span className="text-blue-400 text-sm font-medium">
                이수증 <span className="text-blue-600">앞면이 나온 사진</span>을 등록해주세요
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 고정 버튼 섹션 (푸터) */}
      <div className="bg-white px-6 py-6 pb-12 safe-area-inset-bottom">
        <div className="max-w-md mx-auto">
          <Button
            variant="primary"
            size="md"
            className="w-full bg-gray-200 "
            onClick={handleSkip}
          >
            건너뛰기
          </Button>
        </div>
      </div>

      {/* 건너뛰기 모달 */}
      <Modal visible={showSkipModal} onClose={() => setShowSkipModal(false)}>
        <div className="px-8 py-10 text-center">
          {/* 삼각형 느낌표 아이콘 */}
          <div className="mb-4 flex justify-center">
            <ExclamationTriangleIcon className="w-24 h-24 text-blue-500" />
          </div>
          
          {/* 메인 메시지 */}
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            다음에 등록할까요?
          </h2>
          
          {/* 서브 메시지 */}
          <p className="text-xs text-gray-500 font-medium mb-8">
            이수증을 등록하지 않으면 매칭이 불가능해요
            <br />
            매칭 전 마이페이지에서 등록할 수 있어요
          </p>
          
          {/* 버튼들 */}
          <div className="flex gap-3">
            <Button
              variant="primary"
              size="md"
              className="flex-1"
              onClick={handleSkipNext}
            >
              다음에 등록하기
            </Button>
            <Button
              variant="blue"
              size="md"
              className="flex-1"
              onClick={handleStayAndRegister}
            >
              지금 등록하기
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SignupLicensePage;