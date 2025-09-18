export interface MatchingHistoryItem {
  id: string;
  date: string;
  worker: string;
  address: string;
  wage: number;
  requestDate: string;
}

export const matchingHistoryData: MatchingHistoryItem[] = [
  {
    id: "1",
    date: "2025-09-18",
    worker: "보통인부 3명, 철거 2명",
    address: "서울시 강남구 테헤란로 123",
    wage: 150000,
    requestDate: "2025-09-13",
  },
  {
    id: "2",
    date: "2024-09-20",
    worker: "보통인부 3명, 철거 2명",
    address: "서울시 서초구 서초대로 456",
    wage: 180000,
    requestDate: "2025-09-15",
  },
  {
    id: "3",
    date: "2024-09-22",
    worker: "보통인부 3명, 철거 2명",
    address: "서울시 송파구 올림픽로 789",
    wage: 200000,
    requestDate: "2025-09-17",
  },
  {
    id: "4",
    date: "2024-09-25",
    worker: "보통인부 3명, 철거 2명",
    address: "서울시 마포구 홍대입구역 101",
    wage: 160000,
    requestDate: "2025-09-18",
  },
];
