import { apiClient } from "@/configs/apis";
import { useMutation } from "@tanstack/react-query";

export const useSendSms = () => {
  return useMutation({
    mutationKey: ["send:sms"],
    mutationFn: (phoneNumber: string) =>
      apiClient.post("/sms/send", { phoneNumber }),
  });
};
