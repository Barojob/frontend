import HomePage from "@/components/HomePage";
import React from "react";

// TODO: 실제 사용자 인증 훅으로 교체
// import { useAuth } from "@/hooks/useAuth";

const MainPage: React.FC = () => {
  // TODO: 실제 로그인한 사용자 정보를 가져오는 로직
  // const { user, isLoading } = useAuth();

  // 현재는 임시로 로컬스토리지나 다른 방법으로 사용자 타입을 판별
  // 실제 구현에서는 JWT 토큰이나 컨텍스트에서 사용자 정보를 가져와야 함
  const getUserType = (): "worker" | "employer" => {
    // 예시: 로컬스토리지에서 사용자 타입 확인
    const userType = localStorage.getItem("userType");

    if (userType === "employer") return "employer";
    return "worker";
  };

  // TODO: 로딩 상태 처리
  // if (isLoading) {
  //   return <div className="flex h-screen items-center justify-center">로딩 중...</div>;
  // }

  const userType = getUserType();

  return <HomePage userType={userType} />;
};

export default MainPage;
