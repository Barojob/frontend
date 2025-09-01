import React, { useState } from "react";

interface PersonCountSelectorProps {
  personCount: number;
  onPersonCountChange: (count: number) => void;
  className?: string;
}

const PersonCountSelector: React.FC<PersonCountSelectorProps> = ({
  personCount,
  onPersonCountChange,
  className = "",
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDecrease = () => {
    if (personCount > 1) {
      onPersonCountChange(personCount - 1);
    }
  };

  const handleIncrease = () => {
    if (personCount < 50) {
      onPersonCountChange(personCount + 1);
    }
  };

  const handleDropdownSelect = (count: number) => {
    onPersonCountChange(count);
    setIsDropdownOpen(false);
  };

  // 드롭다운 옵션들 (1명부터 50명까지)
  const countOptions = Array.from({ length: 50 }, (_, i) => i + 1);

  return (
    <div className={`flex items-center gap-16 ${className}`}>
      {/* 감소 버튼 */}
      <button
        onClick={handleDecrease}
        disabled={personCount <= 1}
        className={`flex h-9 w-12 items-center justify-center rounded-xl transition-all duration-200 ${
          personCount <= 1
            ? "cursor-not-allowed border-gray-100 bg-gray-100 text-gray-300"
            : "border-gray-100 bg-gray-100 text-blue-600"
        }`}
      >
        <svg width="12" height="2" viewBox="0 0 16 2" fill="none">
          <path
            d="M0 1H16"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* 인원수 드롭다운 */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex min-w-[90px] items-center justify-between rounded-lg border border-gray-100 bg-gray-100 px-4 py-2 text-base font-medium text-gray-500 transition-all duration-200"
        >
          <span>{personCount}명</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="9"
            viewBox="0 0 11 9"
            fill="none"
            className={`transform transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          >
            <path
              d="M6.10324 8.4445C5.76111 9.03709 4.90577 9.03709 4.56364 8.4445L0.714639 1.77783C0.372506 1.18524 0.800173 0.444497 1.48444 0.444497L9.18245 0.444498C9.86671 0.444498 10.2944 1.18524 9.95224 1.77783L6.10324 8.4445Z"
              fill="#247AF2"
            />
          </svg>
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
            {countOptions.map((count) => (
              <button
                key={count}
                onClick={() => handleDropdownSelect(count)}
                className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-blue-50 ${
                  personCount === count
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700"
                }`}
              >
                {count}명
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 증가 버튼 */}
      <button
        onClick={handleIncrease}
        disabled={personCount >= 50}
        className={`flex h-9 w-12 items-center justify-center rounded-xl transition-all duration-200 ${
          personCount >= 50
            ? "cursor-not-allowed border-gray-100 bg-gray-100 text-gray-300"
            : "border-gray-100 bg-gray-100 text-blue-600"
        }`}
      >
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 0V16M0 8H16"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* 드롭다운 외부 클릭 시 닫기 */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default PersonCountSelector;
