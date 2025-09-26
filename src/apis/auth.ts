import { createApiUrl } from "@/configs/api";
import type { User, UserResponse } from "@/types/user";

// API 요청/응답 타입 정의
export interface CheckUserRequest {
  role: string;
  phoneNumber: string;
}

interface CheckUserResponse {
  success: boolean;
  exists: boolean;
  message?: string;
}

// 로그인용 인증번호 발송 API
export interface SendLoginRequest {
  phoneNumber: string;
}

export interface SendLoginResponse {
  success: boolean;
  message?: string;
}

// 문자 인증 API
export interface VerifyRequest {
  phoneNumber: string;
  verificationCode: string;
}

export interface VerifyResponse {
  success: boolean;
  message?: string;
  signUpKey?: string; // 헤더에서 받을 값
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

// 근로자 회원가입
export interface WorkerSignUpRequest {
  phoneNumber: string;
  name: string;
  experienceCategories: string[];
  equipmentTypes: string[];
  bankName: string;
  accountNumber: string;
  birthDate: string;
}

// 구인자 회원가입
export interface EmployerSignUpRequest {
  email: string;
  phoneNumber: string;
  name: string;
  companyName: string;
  title: string;
  businessRegistrationNumber: string;
  birthDate: string;
  bankName: string;
  accountNumber: string;
}

export interface SignUpResponse {
  user: User;
}

// 개발 환경에서 사용할 mock 데이터 (auth/test용)
const MOCK_USERS = {
  worker: {
    nickname: "김근로자",
    accountType: "worker" as const,
  },
  employer: {
    nickname: "박고용주",
    accountType: "employer" as const,
  },
} as const;

export const authApi = {
  // 사용자 존재 확인 및 인증번호 발송
  async checkUser(data: CheckUserRequest): Promise<CheckUserResponse> {
    const response = await fetch(createApiUrl("/auth/checkUser"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },

  // 로그인용 인증번호 발송
  async sendLogin(data: SendLoginRequest): Promise<SendLoginResponse> {
    const response = await fetch(createApiUrl("/auth/send/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },

  // 문자 인증 확인 (signUpKey 발급)
  async verify(data: VerifyRequest): Promise<VerifyResponse> {
    console.log("verify API 호출:", data);

    // 전화번호에서 하이픈 제거
    const cleanedData = {
      ...data,
      phoneNumber: data.phoneNumber.replace(/[^0-9]/g, ""),
    };
    console.log("정제된 verify 데이터:", cleanedData);

    const response = await fetch(createApiUrl("/auth/verify"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cleanedData),
    });

    const result = await response.json();
    console.log("verify API 응답:", result);
    console.log("응답에 signUpKey 포함:", result.signUpKey);

    // 헤더에서 signUpKey 추출 시도 (여러 가능한 헤더명 확인)
    const signUpKey =
      response.headers.get("signUpKey") ||
      response.headers.get("signupkey") ||
      response.headers.get("SignUpKey") ||
      response.headers.get("SIGNUPKEY") ||
      response.headers.get("Signupkey"); // 실제 서버 헤더명 추가

    console.log("signUpKey 헤더:", signUpKey);
    console.log(
      "모든 response headers:",
      Object.fromEntries(response.headers.entries()),
    );

    // 각 헤더명별로 확인
    console.log("signUpKey:", response.headers.get("signUpKey"));
    console.log("signupkey:", response.headers.get("signupkey"));
    console.log("SignUpKey:", response.headers.get("SignUpKey"));
    console.log("SIGNUPKEY:", response.headers.get("SIGNUPKEY"));
    console.log("Signupkey:", response.headers.get("Signupkey"));

    // API 응답이 단순히 true/false일 경우 처리
    if (typeof result === "boolean") {
      return {
        success: result,
        message: result ? "인증이 완료되었습니다." : "인증에 실패했습니다.",
        signUpKey: signUpKey || undefined,
      };
    }

    // API 응답이 객체일 경우 - signUpKey가 body에 있을 수도 있음
    return {
      ...result,
      signUpKey: signUpKey || result.signUpKey || undefined,
    };
  }, // SMS 인증번호를 통한 로그인
  async signIn(data: SignInRequest): Promise<SignInResponse> {
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

  // 근로자 회원가입
  async signUpWorker(
    data: WorkerSignUpRequest,
    signUpKey: string,
  ): Promise<SignUpResponse> {
    console.log("근로자 회원가입 API 호출:", data, "signUpKey:", signUpKey);

    const response = await fetch(createApiUrl("/auth/sign-up/worker"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        signUpKey,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("근로자 회원가입 API 응답:", result);
    return result;
  },

  // 구인자 회원가입
  async signUpEmployer(
    data: EmployerSignUpRequest,
    signUpKey: string,
  ): Promise<SignUpResponse> {
    console.log("구인자 회원가입 API 호출:", data, "signUpKey:", signUpKey);

    const response = await fetch(createApiUrl("/auth/sign-up/employer"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        signUpKey,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("구인자 회원가입 API 응답:", result);
    return result;
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

// 기존 외부로 노출된 함수들도 수정
export const checkUser = (data: CheckUserRequest) => authApi.checkUser(data);
export const sendLogin = (data: SendLoginRequest) => authApi.sendLogin(data);
export const verify = (data: VerifyRequest) => authApi.verify(data);
export const signIn = (data: SignInRequest) => authApi.signIn(data);

// signUpEmployer 함수를 새로운 스펙에 맞게 수정
export interface SignUpEmployerRequest {
  email: string;
  phoneNumber: string;
  name: string;
  companyName: string;
  title: string;
  businessRegistrationNumber: string;
  birthDate: string;
  bankName: string;
  accountNumber: string;
  signUpKey?: string;
}

export const signUpEmployer = async (req: SignUpEmployerRequest) => {
  console.log("signUpEmployer API 호출 - request data:", req);
  console.log("signUpEmployer API 호출 - signUpKey:", req.signUpKey);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (req.signUpKey) {
    headers["signUpKey"] = req.signUpKey;
    console.log("signUpKey 헤더 추가됨:", headers["signUpKey"]);
  }

  console.log("최종 headers:", headers);

  const apiUrl = createApiUrl("/api/user/signup/employer");
  console.log("최종 API URL:", apiUrl);

  const requestBody = {
    email: req.email,
    phoneNumber: req.phoneNumber,
    name: req.name,
    companyName: req.companyName,
    title: req.title,
    businessRegistrationNumber: req.businessRegistrationNumber,
    birthDate: req.birthDate,
    bankName: req.bankName,
    accountNumber: req.accountNumber,
  };
  console.log("최종 request body:", JSON.stringify(requestBody, null, 2));

  const response = await fetch(apiUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(requestBody),
  });

  console.log("signUpEmployer API 응답 status:", response.status);
  console.log(
    "signUpEmployer API 응답 headers:",
    Object.fromEntries(response.headers.entries()),
  );
  const responseText = await response.text();
  console.log("signUpEmployer API 응답 body:", responseText);

  if (!response.ok) {
    throw new Error(
      `Failed to sign up employer: ${response.status} ${responseText}`,
    );
  }

  try {
    return JSON.parse(responseText);
  } catch {
    return responseText;
  }
};
