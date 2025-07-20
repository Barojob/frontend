import { ChevronDownIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BoxButton from "../components/BoxButton/BoxButton";
import Button from "../components/Button/Button";
import { Drawer, DrawerContent, DrawerTrigger } from "../components/Drawer";
import Input from "../components/Input/Input";
import Modal from "../components/Modal";
import NavigationHeader from "../components/layouts/NavigationHeader";
import { cn } from "../utils/classname";

const banks = [
  { id: "nh", name: "농협은행", image: "/images/banks/nh.png" },
  { id: "shinhan", name: "신한은행", image: "/images/banks/shinhan.png" },
  { id: "kb", name: "국민은행", image: "/images/banks/kb.png" },
  { id: "woori", name: "우리은행", image: "/images/banks/woori.png" },
  { id: "samsung", name: "삼성증권", image: "/images/banks/samsung.png" },
  { id: "hyundai", name: "현대증권", image: "/images/banks/hyundai.png" },
  { id: "daegu", name: "대구은행", image: "/images/banks/daegu.png" },
  { id: "busan", name: "부산은행", image: "/images/banks/busan.png" },
  { id: "kakao", name: "카카오뱅크", image: "/images/banks/kakao.png" },
  { id: "toss", name: "토스뱅크", image: "/images/banks/toss.png" },
  { id: "kbank", name: "케이뱅크", image: "/images/banks/kbank.png" },
];

const SignupAccountPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [drawerKey, setDrawerKey] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleBankSelect = (bankName: string) => {
    setSelectedBank(bankName);
    // 드로어를 강제로 닫기 위해 key를 변경하여 리렌더링
    setDrawerKey(prev => prev + 1);
  };

  const handleAccountNumberChange = (value: string) => {
    // 숫자만 허용
    const numericValue = value.replace(/[^0-9]/g, '');
    setAccountNumber(numericValue);
  };

  const handleBack = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  const handleSkip = () => {
    // 건너뛰기 로직 - 모달 표시
    setShowModal(true);
  };

  const handleAddAccount = () => {
    // 계좌 추가하기 로직 - 모든 필드 검증
    const missingFields = [];
    
    if (!selectedBank) {
      missingFields.push("은행");
    }
    if (!accountNumber) {
      missingFields.push("계좌번호");
    }
    
    if (missingFields.length > 0) {
      setErrorMessage(`${missingFields.join(", ")}을(를) 입력해주세요.`);
      setShowErrorModal(true);
      return;
    }
    
    // 모든 정보가 입력되면 안내 모달 표시
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    // 모달 닫은 후 다음 페이지로 이동
    //console.log("다음 페이지로 이동");
    // TODO: 실제 네비게이션 구현
    // navigate('/next-page');
  };

  const handleErrorModalClose = () => {
    setShowErrorModal(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 메인 콘텐츠 */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-md mx-auto">
          {/* 네비게이션 헤더 */}
          <NavigationHeader 
            title="계좌 입력" 
            onBack={handleBack}
            showBackButton={true}
            className="mb-10"
          />
          
          {/* 헤더 섹션 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              임금을 <span className="text-blue-600">지급받을 계좌</span>를
            </h1>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              등록해주세요
            </h1>
            <p className="text-sm text-gray-500">
              본인 명의 계좌만 가능
            </p>
          </div>

          {/* 은행 선택 섹션 */}
          <div className="mb-6">
            <label className="block text-base font-medium text-gray-900 mb-3">
              은행명
            </label>
            
            <Drawer key={drawerKey}>
              <DrawerTrigger asChild>
                <button
                  className={cn(
                    "w-full h-11 px-4 py-3 border border-gray-200 rounded-lg",
                    "bg-white text-left flex items-center justify-between",
                    "focus:outline-none focus:border-gray-400",
                    "hover:border-gray-300 transition-colors"
                  )}
                >
                  <span className={cn(
                    "text-base",
                    selectedBank ? "text-gray-900" : "text-gray-400"
                  )}>
                    {selectedBank || "은행을 선택해주세요"}
                  </span>
                  <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                </button>
              </DrawerTrigger>
              
              <DrawerContent position="bottom" className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    은행 선택
                  </h3>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {banks.map((bank) => (
                    <BoxButton
                      key={bank.id}
                      name={bank.name}
                      image={bank.image}
                      variant="primary"
                      className="!w-full !h-28"
                      selected={selectedBank === bank.name}
                      onClick={() => handleBankSelect(bank.name)}
                    />
                  ))}
                </div>
              </DrawerContent>
            </Drawer>
          </div>

          {/* 계좌번호 입력 섹션 */}
          <div className="mb-6">
            <label className="block text-base font-medium text-gray-900 mb-3">
              계좌번호
            </label>
            
            <Input
              value={accountNumber}
              onValueChange={handleAccountNumberChange}
              placeholder="'-' 없이 숫자만 입력해주세요"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              size="lg"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* 하단 고정 버튼 섹션 (푸터) */}
      <div className="bg-white px-6 py-6 pb-12 safe-area-inset-bottom">
        <div className="max-w-md mx-auto flex gap-3">
          <Button
            variant="primary"
            size="md"
            className="flex-1"
            onClick={handleSkip}
          >
            건너뛰기
          </Button>
          <Button
            variant="blue"
            size="md"
            className="flex-1"
            onClick={handleAddAccount}
          >
            계좌 추가하기
          </Button>
        </div>
      </div>

      {/* 계좌 안내 모달 */}
      <Modal visible={showModal} onClose={handleModalClose}>
        <div className="px-8 py-10 text-center">
          {/* 느낌표 아이콘 */}
          <div className="mb-6 flex justify-center">
            <ExclamationTriangleIcon className="w-16 h-16 text-blue-500" />
          </div>
          
          {/* 메인 메시지 */}
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            본인 명의 계좌만
            <br />
            등록가능해요
          </h2>
          
          {/* 서브 메시지 */}
          <p className="text-sm text-gray-500 mb-8">
            일치 여부 확인 후 등록해드립니다
          </p>
          
          {/* 확인 버튼 */}
          <Button
            variant="blue"
            size="md"
            className="w-full max-w-[200px] mx-auto"
            onClick={handleModalClose}
          >
            확인했어요
          </Button>
        </div>
      </Modal>

      {/* 입력 오류 모달 */}
      <Modal visible={showErrorModal} onClose={handleErrorModalClose}>
        <div className="px-8 py-10 text-center">
          {/* 느낌표 아이콘 */}
          <div className="mb-6 flex justify-center">
            <ExclamationTriangleIcon className="w-16 h-16 text-blue-500" />
          </div>
          
          {/* 에러 메시지 */}
          <h2 className="text-xl font-bold text-gray-900 mb-8">
            {errorMessage}
          </h2>
          
          {/* 확인 버튼 */}
          <Button
            variant="blue"
            size="md"
            className="w-full max-w-[200px] mx-auto"
            onClick={handleErrorModalClose}
          >
            확인
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default SignupAccountPage;