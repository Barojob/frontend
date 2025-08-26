import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi, SignInRequest, SignUpRequest } from "../apis/auth";

export const useAuth = () => {
  const queryClient = useQueryClient();

  // 로그인 mutation
  const signInMutation = useMutation({
    mutationFn: authApi.signIn,
    onSuccess: (data, variables) => {
      // 로그인 성공 시 role 정보를 세션스토리지에 저장
      const userType = variables.role === "employer" ? "employer" : "worker";
      sessionStorage.setItem("userType", JSON.stringify(userType));

      // 유저 정보 캐시 무효화하여 최신 정보 다시 가져오기
      queryClient.invalidateQueries({ queryKey: ["user", "current"] });
    },
  });

  // 회원가입 mutation
  const signUpMutation = useMutation({
    mutationFn: authApi.signUp,
    onSuccess: (data, variables) => {
      // 회원가입 성공 시 businessName 유무로 role 결정하여 저장
      const userType = variables.businessName ? "employer" : "worker";
      sessionStorage.setItem("userType", JSON.stringify(userType));

      // 유저 정보 캐시 무효화하여 최신 정보 다시 가져오기
      queryClient.invalidateQueries({ queryKey: ["user", "current"] });
    },
  });

  // 로그아웃 mutation
  const signOutMutation = useMutation({
    mutationFn: authApi.signOut,
    onSuccess: () => {
      // 로그아웃 시 세션스토리지 클리어
      sessionStorage.removeItem("userType");

      // 모든 쿼리 캐시 클리어
      queryClient.clear();
    },
  });

  // Promise를 반환하는 async 함수들
  const signIn = async (data: SignInRequest) => {
    return signInMutation.mutateAsync(data);
  };

  const signUp = async (data: SignUpRequest) => {
    return signUpMutation.mutateAsync(data);
  };

  const signOut = async () => {
    return signOutMutation.mutateAsync();
  };

  return {
    // async 함수들 (Promise 반환)
    signIn,
    signUp,
    signOut,

    // 로딩 상태
    isSigningIn: signInMutation.isPending,
    isSigningUp: signUpMutation.isPending,
    isSigningOut: signOutMutation.isPending,

    // 에러 상태
    signInError: signInMutation.error,
    signUpError: signUpMutation.error,
    signOutError: signOutMutation.error,

    // 원본 mutation 객체들 (필요시 직접 접근)
    signInMutation,
    signUpMutation,
    signOutMutation,
  };
};
