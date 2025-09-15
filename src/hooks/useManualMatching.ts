import { matchingApi } from "@/apis/matching";
import type { ManualMatchingRequest } from "@/types/matching";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useManualMatching = (request: ManualMatchingRequest) => {
  return useQuery({
    queryKey: [
      "manualMatching",
      request.neighborhoodId,
      request.jobTypeId,
      request.page,
    ],
    queryFn: () => matchingApi.getManualMatching(request),
    enabled: request.neighborhoodId > 0 && request.jobTypeId > 0,
    staleTime: 5 * 60 * 1000, // 5분
    retry: 2,
  });
};

export const useWorkerSelection = (maxSelection: number) => {
  const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);

  const handleWorkerSelect = (workerId: string) => {
    setSelectedWorkers((prev) => {
      if (prev.includes(workerId)) {
        return prev.filter((id) => id !== workerId);
      } else if (prev.length < maxSelection) {
        return [...prev, workerId];
      }
      return prev;
    });
  };

  const isSelectionComplete = selectedWorkers.length >= maxSelection;

  const clearSelection = () => {
    setSelectedWorkers([]);
  };

  return {
    selectedWorkers,
    handleWorkerSelect,
    isSelectionComplete,
    clearSelection,
  };
};
