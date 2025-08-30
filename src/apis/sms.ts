import { apiClient } from "@/configs/apis";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

type SendSmsArgs = { phoneNumber: string };

export const useSendSms = () => {
  return useMutation({
    mutationKey: ["sms:send"],
    mutationFn: ({ phoneNumber }: SendSmsArgs) =>
      apiClient.post("/sms/send", { phoneNumber }),
  });
};

type VerifySmsArgs = { phoneNumber: string; code: string };
const verifySmsResponseSchema = z.boolean();

export const useVerifySms = () => {
  return useMutation({
    mutationKey: ["sms:verify"],
    mutationFn: async ({ phoneNumber, code }: VerifySmsArgs) => {
      const response = await apiClient.post("/sms/verify", {
        phoneNumber,
        verificationCode: code,
      });

      return verifySmsResponseSchema.parse(response.data);
    },
  });
};
