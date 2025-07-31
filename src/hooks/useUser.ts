import { useQuery } from "@tanstack/react-query";
import { authApi } from "../apis";
import type { UserType } from "../types/user";

export const useUser = () => {
  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user", "current"],
    queryFn: authApi.test,
    staleTime: 5 * 60 * 1000, // 5분간 fresh
    gcTime: 30 * 60 * 1000, // 30분간 캐시 (React Query v5에서 cacheTime → gcTime)
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // API 응답에서 실제 user 데이터 추출
  const user = response?.data;

  // 임시로 세션스토리지에서 userType 가져오기
  // (로그인/회원가입 시 저장된 role 정보 활용)
  let userType: UserType = null;
  try {
    const storedUserType = sessionStorage.getItem("userType");
    if (storedUserType) {
      userType = JSON.parse(storedUserType) as UserType;
    }
  } catch {
    userType = null;
  }

  // user가 없으면 userType도 null
  if (!user) {
    userType = null;
  }

  const isEmployer = userType === "employer";
  const isWorker = userType === "worker";

  return {
    user,
    userType,
    isEmployer,
    isWorker,
    isLoading,
    isError,
    error,
    refetch,
  };
};
