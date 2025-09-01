import { useEffect, useState } from "react";
import type { UserType } from "../types/user";
import { useUser } from "./useUser";

// 전역 상태를 위한 변수들
let globalUserType: UserType = null;
const listeners = new Set<() => void>();

// 세션스토리지에서 초기값 로드
try {
  const stored = sessionStorage.getItem("userType");
  if (stored) {
    globalUserType = JSON.parse(stored) as UserType;
  }
} catch {
  globalUserType = null;
}

// 상태 변경 함수
const updateUserType = (newType: UserType) => {
  globalUserType = newType;

  // 세션스토리지에 저장
  try {
    sessionStorage.setItem("userType", JSON.stringify(newType));
  } catch (error) {
    console.error("sessionStorage 저장 중 에러:", error);
  }

  // 모든 리스너에게 변경 알림
  listeners.forEach((listener) => listener());
};

export const useUserType = () => {
  const [userType, setUserType] = useState<UserType>(globalUserType);
  const { account, isLoading } = useUser();

  useEffect(() => {
    // 컴포넌트가 마운트될 때 리스너 등록
    const listener = () => {
      setUserType(globalUserType);
    };

    listeners.add(listener);

    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      listeners.delete(listener);
    };
  }, []);

  // 백엔드에서 받은 유저 타입으로 전역 상태 업데이트
  useEffect(() => {
    if (
      !isLoading &&
      account?.accountType &&
      account.accountType !== globalUserType
    ) {
      updateUserType(account.accountType);
    }
  }, [account, isLoading]);

  const setWorker = () => updateUserType("worker");
  const setEmployer = () => updateUserType("employer");
  const clearUserType = () => updateUserType(null);

  return {
    userType,
    setWorker,
    setEmployer,
    clearUserType,
    isWorker: userType === "worker",
    isEmployer: userType === "employer",
    isLoading, // 백엔드 로딩 상태도 함께 반환
  };
};
