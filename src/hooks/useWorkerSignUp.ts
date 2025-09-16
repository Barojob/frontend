import { apiClient } from "@/configs/apis";
import { useMutation } from "@tanstack/react-query";

export type WorkerSignUpRequest = {
  phoneNumber: string;
  name: string;
  bankName: string;
  AccountNumber: string;
  birthDate: string;
};

export type WorkerSignUpResponse = {
  user: {
    phoneNumber: string;
    name: string;
  };
};

export const useWorkerSignUp = () => {
  return useMutation({
    mutationKey: ["auth:workerSignUp"],
    mutationFn: async (
      signUpData: WorkerSignUpRequest,
    ): Promise<WorkerSignUpResponse> => {
      const response = await apiClient.post("/auth/sign-up/worker", signUpData);
      return response.data;
    },
  });
};
