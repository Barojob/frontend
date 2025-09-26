import {
  authApi,
  type CheckUserRequest,
  type CheckUserResponse,
} from "@/apis/auth";
import { useMutation } from "@tanstack/react-query";

export const useCheckUser = () => {
  return useMutation({
    mutationKey: ["auth:checkUser"],
    mutationFn: async (data: CheckUserRequest): Promise<CheckUserResponse> => {
      const response = await authApi.checkUser(data);
      return response;
    },
  });
};
