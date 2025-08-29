export type JobHistory = {
  id: number;
  type: string;
  date: string;
  location: string;
  dailyWage: number;
  workHours: string;
};

export const DUMMY_JOB_HISTORY: JobHistory[] = [
  {
    id: 1,
    type: "철거",
    date: "25년 09월 18일",
    location: "경기 포천시 중앙로 61번길 18",
    dailyWage: 140700,
    workHours: "06:00 ~ 15:00",
  },
  {
    id: 2,
    type: "철거",
    date: "25년 09월 18일",
    location: "경기 포천시 중앙로 61번길 18",
    dailyWage: 140700,
    workHours: "06:00 ~ 15:00",
  },
  {
    id: 3,
    type: "철거",
    date: "25년 09월 18일",
    location: "경기 포천시 중앙로 61번길 18",
    dailyWage: 140700,
    workHours: "06:00 ~ 15:00",
  },
];
