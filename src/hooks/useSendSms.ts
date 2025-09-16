import { apiClient } from "@/configs/apis";
import { useMutation } from "@tanstack/react-query";

type SendSmsArgs = { phoneNumber: string };

export const useSendSms = () => {
  return useMutation({
    mutationKey: ["sms:send"],
    mutationFn: ({ phoneNumber }: SendSmsArgs) =>
      apiClient.post("/auth/send/signup", { phoneNumber }),
  });
};
