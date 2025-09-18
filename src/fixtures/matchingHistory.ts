export interface WorkerInfo {
  id: string;
  name: string;
  jobType: string;
  age: number;
  experience: string;
  rating?: number;
  review?: string;
  isBlacklisted?: boolean;
  isPriorityMatched?: boolean;
}

export interface MatchingHistoryItem {
  id: string;
  date: string;
  worker: string;
  address: string;
  wage: number;
  requestDate: string;
  workers: WorkerInfo[];
}

export const matchingHistoryData: MatchingHistoryItem[] = [
  {
    id: "1",
    date: "2025-09-18",
    worker: "보통인부 3명, 철거 2명",
    address: "서울시 강남구 테헤란로 123",
    wage: 150000,
    requestDate: "2025-09-13",
    workers: [
      {
        id: "w1",
        name: "김철수",
        jobType: "보통인부",
        age: 35,
        experience: "5년",
      },
      {
        id: "w2",
        name: "이영희",
        jobType: "보통인부",
        age: 28,
        experience: "3년",
      },
      {
        id: "w3",
        name: "박민수",
        jobType: "보통인부",
        age: 42,
        experience: "8년",
      },
      {
        id: "w4",
        name: "정수진",
        jobType: "철거",
        age: 31,
        experience: "4년",
      },
      {
        id: "w5",
        name: "최동현",
        jobType: "철거",
        age: 39,
        experience: "6년",
      },
    ],
  },
  {
    id: "2",
    date: "2025-08-20",
    worker: "보통인부 3명, 철거 2명",
    address: "서울시 서초구 서초대로 456",
    wage: 180000,
    requestDate: "2025-08-15",
    workers: [
      {
        id: "w6",
        name: "강지훈",
        jobType: "보통인부",
        age: 33,
        experience: "7년",
      },
      {
        id: "w7",
        name: "윤서연",
        jobType: "보통인부",
        age: 26,
        experience: "2년",
      },
      {
        id: "w8",
        name: "임태호",
        jobType: "보통인부",
        age: 45,
        experience: "10년",
      },
      {
        id: "w9",
        name: "한미영",
        jobType: "철거",
        age: 29,
        experience: "3년",
      },
      {
        id: "w10",
        name: "송재현",
        jobType: "철거",
        age: 37,
        experience: "5년",
      },
    ],
  },
  {
    id: "3",
    date: "2025-09-22",
    worker: "보통인부 3명, 철거 2명",
    address: "서울시 송파구 올림픽로 789",
    wage: 200000,
    requestDate: "2025-09-17",
    workers: [
      {
        id: "w11",
        name: "조현우",
        jobType: "보통인부",
        age: 30,
        experience: "4년",
      },
      {
        id: "w12",
        name: "배수정",
        jobType: "보통인부",
        age: 27,
        experience: "3년",
      },
      {
        id: "w13",
        name: "오준석",
        jobType: "보통인부",
        age: 41,
        experience: "9년",
      },
      {
        id: "w14",
        name: "신예린",
        jobType: "철거",
        age: 32,
        experience: "5년",
      },
      {
        id: "w15",
        name: "권도현",
        jobType: "철거",
        age: 38,
        experience: "7년",
      },
    ],
  },
  {
    id: "4",
    date: "2025-09-25",
    worker: "보통인부 3명, 철거 2명",
    address: "서울시 마포구 홍대입구역 101",
    wage: 160000,
    requestDate: "2025-08-18",
    workers: [
      {
        id: "w16",
        name: "홍길동",
        jobType: "보통인부",
        age: 34,
        experience: "6년",
      },
      {
        id: "w17",
        name: "김영수",
        jobType: "보통인부",
        age: 25,
        experience: "1년",
      },
      {
        id: "w18",
        name: "이민호",
        jobType: "보통인부",
        age: 43,
        experience: "11년",
      },
      {
        id: "w19",
        name: "박지영",
        jobType: "철거",
        age: 30,
        experience: "4년",
      },
      {
        id: "w20",
        name: "정현수",
        jobType: "철거",
        age: 36,
        experience: "6년",
      },
    ],
  },
];
