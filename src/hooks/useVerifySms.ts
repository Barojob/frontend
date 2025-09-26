import { authApi, type VerifyResponse } from "@/apis/auth";
import { useMutation } from "@tanstack/react-query";

type VerifySmsArgs = { phoneNumber: string; code: string };

export const useVerifySms = () => {
  return useMutation({
    mutationKey: ["sms:verify"],
    mutationFn: async ({
      phoneNumber,
      code,
    }: VerifySmsArgs): Promise<VerifyResponse> => {
      const response = await authApi.verify({
        phoneNumber,
        verificationCode: code,
      });

      return response;
    },
  });
};
