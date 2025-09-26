import { apiClient } from "@/configs/apis";
import { useMutation } from "@tanstack/react-query";

type SendSmsArgs = { phoneNumber: string };

export const useSendSms = () => {
  return useMutation({
    mutationKey: ["sms:send"],
    mutationFn: ({ phoneNumber }: SendSmsArgs) => {
      // 전화번호에서 하이픈 제거
      const cleanedPhoneNumber = phoneNumber.replace(/[^0-9]/g, "");
      console.log(
        "SMS 전송 - 원본:",
        phoneNumber,
        "정제된:",
        cleanedPhoneNumber,
      );
      return apiClient.post("/auth/send/signup", {
        phoneNumber: cleanedPhoneNumber,
      });
    },
  });
};
