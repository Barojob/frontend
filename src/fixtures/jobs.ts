import groupBy from "lodash/groupBy";

export type Job = {
  id: string;
  name: string;
  category: "보통인부" | "기능공";
  dailyWage: number;
};

export type Equipment = {
  id: string;
  name: string;
  additionalPay: number;
};

export const JOB_LIST: Job[] = [
  {
    id: "ordinary_laborer",
    name: "보통 인부",
    category: "보통인부",
    dailyWage: 150000,
  },
  { id: "signalman", name: "신호수", category: "보통인부", dailyWage: 140000 },
  { id: "lifting", name: "양중", category: "보통인부", dailyWage: 170000 },
  { id: "carrying", name: "곰방", category: "보통인부", dailyWage: 180000 },
  { id: "demolition", name: "철거", category: "보통인부", dailyWage: 170000 },

  {
    id: "form_carpenter",
    name: "형틀 목수",
    category: "기능공",
    dailyWage: 250000,
  },
  { id: "rebar_placer", name: "철근공", category: "기능공", dailyWage: 250000 },
  { id: "electrician", name: "전기공", category: "기능공", dailyWage: 260000 },
];

export const JOB_CATEGORIES = groupBy(JOB_LIST, "category");
export type JobCategory = keyof typeof JOB_CATEGORIES;

export const EQUIPMENT_LIST: Equipment[] = [
  { id: "none", name: "없음", additionalPay: 0 },
  { id: "hammer_drill", name: "함마드릴", additionalPay: 20000 },
  { id: "grinder", name: "그라인더", additionalPay: 10000 },
  { id: "hydraulic_crusher", name: "유압크라샤", additionalPay: 30000 },
];
