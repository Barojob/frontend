import { apiClient } from "@/configs/apis";
import { useMutation } from "@tanstack/react-query";

type EmployerSignUpArgs = {
  email: string;
  nickname: string;
  phoneNumber: string;
  name: string;
  businessName: string;
  title: string;
  businessRegistrationNumber: string;
};

type EmployerSignUpResponse = {
  user: {
    email: string;
    nickname: string;
  };
};

export const useEmployerSignUp = () => {
  return useMutation({
    mutationKey: ["auth:employerSignUp"],
    mutationFn: async (
      signUpData: EmployerSignUpArgs,
    ): Promise<EmployerSignUpResponse> => {
      const response = await apiClient.post(
        "/auth/employer/sign-up",
        signUpData,
      );
      return response.data;
    },
  });
};
