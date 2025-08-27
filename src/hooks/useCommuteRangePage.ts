import { COMMUTE_RANGE_ORDER } from "@/fixtures/commuteAreas";
import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useCommuteRangePage = () => {
  const navigate = useNavigate();
  const [selectedRange, setSelectedRange] = useState(1);
  const [selectedTransport, setSelectedTransport] = useState<
    "대중교통 + 도보" | "자차" | null
  >(null);

  // 200ms 지연된 값을 생성. 이 값은 지도 계산에만 사용됩니다.
  const debouncedSelectedRange = useDebounce(selectedRange, 200);

  const currentStepKey = COMMUTE_RANGE_ORDER[debouncedSelectedRange - 1];
  const currentStepInfo = COMMUTE_RANGE_DATA[currentStepKey];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRange(Number(e.target.value));
  };

  const handleNext = () => {
    // FIXME: 선택된 범위와 교통수단을 저장하는 API 로직 필요
    navigate("/worker-detail");
  };

  return {
    selectedRange, // 슬라이더 UI는 즉시 반응하도록 원래 값을 사용
    handleSliderChange,
    selectedTransport,
    setSelectedTransport,
    currentStepInfo, // 지도 계산에는 지연된 값이 반영된 정보를 전달
    handleNext,
  };
};
