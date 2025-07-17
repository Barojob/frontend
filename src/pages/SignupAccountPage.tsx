import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BoxButton from "../components/BoxButton/BoxButton";
import { Drawer, DrawerContent, DrawerTrigger } from "../components/Drawer";
import Input from "../components/Input/Input";
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

  const handleBankSelect = (bankName: string) => {
    setSelectedBank(bankName);
  };

  const handleAccountNumberChange = (value: string) => {
    // 숫자만 허용
    const numericValue = value.replace(/[^0-9]/g, '');
    setAccountNumber(numericValue);
  };

  const handleBack = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  return (
    <div className="min-h-screen bg-white px-6 py-8">
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
          
          <Drawer>
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
  );
};

export default SignupAccountPage;