import { createApiUrl } from "@/configs/api";
import type {
  ManualMatchingRequest,
  ManualMatchingResponse,
} from "@/types/matching";

export const matchingApi = {
  // 직접 매칭 - 인력 리스트 조회
  async getManualMatching(
    data: ManualMatchingRequest,
  ): Promise<ManualMatchingResponse> {
    if (import.meta.env.DEV) {
      // 개발 환경에서는 mock 응답
      return new Promise((resolve) => {
        setTimeout(() => {
          // mockWorkers에서 데이터 가져오기
          const mockWorkers = [
            {
              id: "worker-1",
              name: "김철수",
              workType: "보통인부(자재 정리)",
              totalExperience: 9,
              matchingScore: 82,
              rating: 3.5,
              reviewCount: 17,
              price: 140700,
              isRecommended: true,
              isPriorityMatch: true,
            },
            {
              id: "worker-2",
              name: "박영희",
              workType: "보통인부(자재 정리)",
              totalExperience: 12,
              matchingScore: 88,
              rating: 4.2,
              reviewCount: 23,
              price: 145000,
              isRecommended: true,
              isPriorityMatch: false,
            },
            {
              id: "worker-3",
              name: "이민수",
              workType: "보통인부(자재 정리)",
              totalExperience: 7,
              matchingScore: 75,
              rating: 3.8,
              reviewCount: 15,
              price: 135000,
              isRecommended: false,
              isPriorityMatch: false,
            },
            {
              id: "worker-4",
              name: "정수진",
              workType: "보통인부(자재 정리)",
              totalExperience: 15,
              matchingScore: 92,
              rating: 4.5,
              reviewCount: 31,
              price: 150000,
              isRecommended: false,
              isPriorityMatch: false,
            },
            {
              id: "worker-5",
              name: "최동현",
              workType: "보통인부(자재 정리)",
              totalExperience: 6,
              matchingScore: 70,
              rating: 3.2,
              reviewCount: 8,
              price: 130000,
              isRecommended: false,
              isPriorityMatch: false,
            },
          ];

          resolve({
            success: true,
            data: {
              workers: mockWorkers,
              totalCount: mockWorkers.length,
              currentPage: data.page,
              totalPages: Math.ceil(mockWorkers.length / 10),
            },
            message: "인력 리스트를 성공적으로 조회했습니다.",
          });
        }, 1000);
      });
    }

    const response = await fetch(createApiUrl("/manualMatching"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to get manual matching: ${response.statusText}`);
    }

    const result: ManualMatchingResponse = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to get manual matching");
    }

    return result;
  },
};
