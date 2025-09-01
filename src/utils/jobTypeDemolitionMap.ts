export type SelectOption = {
  id: string;
  label: string;
};

// 보통인부 카테고리 세부업무 매핑 (요청 명세 반영)
const demolitionWorkByGeneral: Record<string, SelectOption[]> = {
  "general-labor": [
    { id: "general-normal", label: "일반" },
    { id: "general-system", label: "시스템/아시바/폼자재정리" },
    { id: "general-spade", label: "삽질" },
    { id: "general-saw", label: "톱질" },
    { id: "general-sickle", label: "낫질" },
  ],
  signal: [
    { id: "signal-pedestrian", label: "보행안전도우미" },
    { id: "signal-vehicle", label: "차량/지게차 신호수" },
    { id: "signal-fire-watch", label: "화기감시" },
  ],
  lifting: [
    { id: "lifting-light", label: "경량자재" },
    { id: "lifting-heavy", label: "시멘트 등 중량자재" },
  ],
  gombang: [
    { id: "gombang-light", label: "경량자재" },
    { id: "gombang-heavy", label: "시멘트 등 중량자재" },
  ],
  demolition: [
    { id: "demolition-main", label: "철거" },
    { id: "demolition-followup", label: "철거 뒷일" },
  ],
};

// 기능공(스킬드) 클릭 시에는 모달 오픈 예정 -> 옵션은 비우거나 별도 처리

export const getDemolitionWorkOptions = (
  selectedJobTypes: string[] | undefined,
): SelectOption[] => {
  if (!selectedJobTypes || selectedJobTypes.length === 0) {
    return [];
  }

  // 우선순위: 첫 번째 선택된 직업 기준으로 세부업무 제공
  const primary = selectedJobTypes[0];
  if (primary in demolitionWorkByGeneral) {
    return demolitionWorkByGeneral[
      primary as keyof typeof demolitionWorkByGeneral
    ];
  }
  return [];
};
