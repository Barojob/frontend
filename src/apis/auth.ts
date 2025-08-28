import { createApiUrl } from "@/configs/api";
import type { User, UserResponse } from "@/types/user";

// API 요청/응답 타입 정의
export interface CheckUserRequest {
  role: string;
  phoneNumber: string;
}

export interface CheckUserResponse {
  success: boolean;
  exists: boolean;
  message?: string;
}

export interface SignInRequest {
  verificationCode: string;
  phoneNumber: string;
  role: string;
}

export interface SignInResponse {
  user: User;
  sessionId: string;
}

export interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
  phoneNumber: string;
  name: string;
  businessName?: string;
}

export interface SignUpResponse {
  user: User;
}

// 개발 환경에서 사용할 mock 데이터 (auth/test용)
const MOCK_USERS = {
  worker: {
    email: "worker@example.com",
    nickname: "김근로자",
  },
  employer: {
    email: "employer@example.com",
    nickname: "박고용주",
  },
} as const;

export const authApi = {
  // 사용자 존재 확인 및 인증번호 발송
  async checkUser(data: CheckUserRequest): Promise<CheckUserResponse> {
    if (import.meta.env.DEV) {
      // 개발 환경에서는 mock 응답
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            exists: Math.random() > 0.5, // 랜덤으로 기존/신규 사용자 결정
            message: "인증번호가 발송되었습니다.",
          });
        }, 500);
      });
    }

    const response = await fetch(createApiUrl("/auth/checkUser"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },

  // SMS 인증번호를 통한 로그인
  async signIn(data: SignInRequest): Promise<SignInResponse> {
    if (import.meta.env.DEV) {
      // 개발 환경에서는 mock 응답
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockUser =
            data.role === "employer" ? MOCK_USERS.employer : MOCK_USERS.worker;

          resolve({
            user: mockUser,
            sessionId: "mock-session-id-" + Date.now(),
          });
        }, 1000);
      });
    }

    const response = await fetch(createApiUrl("/auth/sign-in"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    return response.json();
  },

  // 회원가입
  async signUp(data: SignUpRequest): Promise<SignUpResponse> {
    if (import.meta.env.DEV) {
      // 개발 환경에서는 mock 응답
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            user: {
              email: data.email,
              nickname: data.nickname,
            },
          });
        }, 1000);
      });
    }

    const response = await fetch(createApiUrl("/auth/sign-up"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    return response.json();
  },

  // 로그아웃
  async signOut(): Promise<{ success: boolean; message?: string }> {
    if (import.meta.env.DEV) {
      // 개발 환경에서는 mock 응답
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: "로그아웃 되었습니다.",
          });
        }, 500);
      });
    }

    const response = await fetch(createApiUrl("/auth/sign-out"), {
      method: "POST",
      credentials: "include",
    });

    return response.json();
  },

  // 세션 유효성 테스트 (현재 로그인한 사용자 정보 가져오기)
  async test(): Promise<UserResponse> {
    if (import.meta.env.DEV) {
      // 개발 환경에서는 mock 응답
      return new Promise((resolve) => {
        setTimeout(() => {
          // 테스트용: 특정 타입 강제 설정
          // 'employer' 또는 'worker'로 변경해서 테스트 가능
          const forceUserType = "employer"; // 이 값을 변경해서 테스트

          const mockUser =
            forceUserType === "employer"
              ? MOCK_USERS.employer
              : MOCK_USERS.worker;

          resolve({
            success: true,
            data: mockUser,
            message: "세션이 유효합니다.",
          });
        }, 1000);
      });
    }

    const response = await fetch(createApiUrl("/auth/test"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to test session: ${response.statusText}`);
    }

    const data: UserResponse = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Session is invalid");
    }

    return data;
  },
};
