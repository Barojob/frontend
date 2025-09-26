import {
  authApi,
  type EmployerSignUpRequest,
  type SignUpResponse,
} from "@/apis/auth";
import { useMutation } from "@tanstack/react-query";

type EmployerSignUpArgs = EmployerSignUpRequest & {
  signUpKey: string;
};

export const useEmployerSignUp = () => {
  return useMutation({
    mutationKey: ["auth:employerSignUp"],
    mutationFn: async ({
      signUpKey,
      ...signUpData
    }: EmployerSignUpArgs): Promise<SignUpResponse> => {
      const response = await authApi.signUpEmployer(signUpData, signUpKey);
      return response;
    },
  });
};
