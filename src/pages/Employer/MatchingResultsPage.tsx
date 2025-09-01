import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationHeader from "../../components/NavigationHeader";
import StepIndicator from "../../components/StepIndicator";

type Props = {
  className?: string;
};

const MatchingResultsPage: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleBackToJobPosting = () => {
    navigate("/job-posting");
  };

  return (
    <div className="flex h-screen w-full flex-col bg-white">
      {/* 고정 헤더 영역 */}
      <div className="flex-shrink-0 bg-white px-6 pt-12">
        <NavigationHeader
          title="매칭 결과"
          className="mb-7"
          onBack={handleBackToJobPosting}
        />
        <StepIndicator currentStep={2} totalSteps={3} />
      </div>

      {/* 스크롤 가능한 내용 영역 */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-neutral-700">
            매칭 결과를 확인해주세요
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            조건에 맞는 근로자들을 찾았습니다
          </p>
        </div>

        {/* 매칭 결과 목록 */}
        <div className="space-y-4">
          {/* 임시 매칭 결과 카드들 */}
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                  <div>
                    <h3 className="font-semibold text-neutral-700">
                      김기술 (32세)
                    </h3>
                    <p className="text-sm text-neutral-500">
                      경력 5년 • 서울 강남구
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-600">35,000원</p>
                  <p className="text-xs text-neutral-500">1인당</p>
                </div>
              </div>
              <div className="mt-3 flex space-x-2">
                <button className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white">
                  선택하기
                </button>
                <button className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium text-neutral-700">
                  상세보기
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 추가 매칭 버튼 */}
        <div className="mt-6">
          <button
            onClick={() => setIsLoading(true)}
            disabled={isLoading}
            className="w-full rounded-xl border border-blue-600 py-3 font-medium text-blue-600 disabled:opacity-50"
          >
            {isLoading ? "매칭 중..." : "더 많은 매칭 결과 보기"}
          </button>
        </div>
      </div>

      {/* 고정 하단 바 영역 */}
      <div className="flex-shrink-0 px-6 py-4">
        <button
          onClick={() => navigate("/job-confirmation")}
          className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white"
        >
          선택 완료
        </button>
      </div>
    </div>
  );
};

export default MatchingResultsPage;
