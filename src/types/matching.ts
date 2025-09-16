// 매칭 관련 타입 정의

export interface ManualMatchingRequest {
  neighborhoodId: number;
  jobTypeId: number;
  page: number;
}

export interface Worker {
  id: string;
  name: string;
  workType: string;
  totalExperience: number;
  matchingScore: number;
  rating: number;
  reviewCount: number;
  price: number;
  isRecommended: boolean;
  isPriorityMatch: boolean;
}

export interface ManualMatchingResponse {
  success: boolean;
  data: {
    workers: Worker[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
  };
  message?: string;
}
