import { apiClient } from "@/configs/apis";
import { useMutation } from "@tanstack/react-query";

export type WorkerSignUpRequest = {
  email: string;
  nickname: string;
  phoneNumber: string;
  name: string;
  experienceCategories: string;
  equipmentTypes: string;
  bankName: string;
  accountNumber: string;
};

export type WorkerSignUpResponse = {
  user: {
    email: string;
    nickname: string;
  };
};

export const useWorkerSignUp = () => {
  return useMutation({
    mutationKey: ["auth:workerSignUp"],
    mutationFn: async (
      signUpData: WorkerSignUpRequest,
    ): Promise<WorkerSignUpResponse> => {
      const response = await apiClient.post("/auth/worker/sign-up", signUpData);
      return response.data;
    },
  });
};
