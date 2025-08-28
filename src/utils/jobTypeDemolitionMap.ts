export type SelectOption = {
  id: string;
  label: string;
};

// 직업군별 세부업무 매핑
const generalLaborDemolition: SelectOption[] = [
  { id: "clean-up", label: "자재 정리" },
  { id: "spadework", label: "삽질" },
  { id: "sawing", label: "톱질" },
  { id: "sickle", label: "낫질" },
];

const demolitionWorkGeneral: SelectOption[] = [
  { id: "debris-sort", label: "폐기물 분류" },
  { id: "debris-carry", label: "폐기물 운반" },
  { id: "site-clean", label: "현장 정리" },
];

const carpenterDemolition: SelectOption[] = [
  { id: "formwork-remove", label: "거푸집 철거" },
  { id: "wood-trim", label: "목재 정리" },
];

const rebarDemolition: SelectOption[] = [
  { id: "rebar-cut", label: "철근 절단" },
  { id: "rebar-sort", label: "철근 정리" },
];

const concreteDemolition: SelectOption[] = [
  { id: "chip-concrete", label: "콘크리트 파쇄" },
  { id: "dust-clean", label: "분진 청소" },
];

const tileDemolition: SelectOption[] = [
  { id: "tile-remove", label: "타일 철거" },
  { id: "tile-carry", label: "타일 운반" },
];

const defaultDemolition: SelectOption[] = generalLaborDemolition;

const jobTypeToOptionsMap: Record<string, SelectOption[]> = {
  // 보통 인부 계열
  "general-labor": generalLaborDemolition,
  "material-mgmt": [{ id: "warehouse-sort", label: "자재 창고 정리" }],
  "signal-worker": [{ id: "signal-support", label: "신호 보조" }],
  demolition: demolitionWorkGeneral,
  kitchen: [{ id: "kitchen-assist", label: "곰방 보조" }],
  cleaning: [{ id: "hoist", label: "양중 보조" }],
  "demolition-work": demolitionWorkGeneral,

  // 기능공 계열
  carpenter: carpenterDemolition,
  rebar: rebarDemolition,
  concrete: concreteDemolition,
  tile: tileDemolition,
};

export const getDemolitionWorkOptions = (
  selectedJobTypes: string[] | undefined,
): SelectOption[] => {
  if (!selectedJobTypes || selectedJobTypes.length === 0) {
    return defaultDemolition;
  }

  const merged: Record<string, SelectOption> = {};
  selectedJobTypes.forEach((jobTypeId) => {
    const options = jobTypeToOptionsMap[jobTypeId] ?? defaultDemolition;
    options.forEach((opt) => {
      merged[opt.id] = opt;
    });
  });

  return Object.values(merged);
};
