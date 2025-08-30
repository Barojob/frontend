import { configs } from "@/configs/environments";
import { type User, userSchema } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

const fetchUser = async (): Promise<User> => {
  const response = await fetch(`${configs.BACKEND_BASE_URL}/auth/test`);
  const data = await response.json();
  return userSchema.parse(data);
};

export const useUser = () => {
  const {
    data: account,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(),
  });

  return { account, isError, isLoading };
};
