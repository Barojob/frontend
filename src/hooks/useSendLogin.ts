import {
  authApi,
  type SendLoginRequest,
  type SendLoginResponse,
} from "@/apis/auth";
import { useMutation } from "@tanstack/react-query";

export const useSendLogin = () => {
  return useMutation({
    mutationKey: ["auth:sendLogin"],
    mutationFn: async (data: SendLoginRequest): Promise<SendLoginResponse> => {
      const response = await authApi.sendLogin(data);
      return response;
    },
  });
};
