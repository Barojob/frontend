import {
  authApi,
  type SignUpResponse,
  type WorkerSignUpRequest,
} from "@/apis/auth";
import { useMutation } from "@tanstack/react-query";

type WorkerSignUpArgs = WorkerSignUpRequest & {
  signUpKey: string;
};

export const useWorkerSignUp = () => {
  return useMutation({
    mutationKey: ["auth:workerSignUp"],
    mutationFn: async ({
      signUpKey,
      ...signUpData
    }: WorkerSignUpArgs): Promise<SignUpResponse> => {
      const response = await authApi.signUpWorker(signUpData, signUpKey);
      return response;
    },
  });
};
