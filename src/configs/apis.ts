import { configs } from "@/configs/environments";
import { SECOND } from "@/utils/misc";
import { getSessionId } from "@/utils/session";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: configs.API_BASE_URL,
  timeout: 10 * SECOND,
});

// 요청 인터셉터: 모든 요청에 sessionId 자동 포함
apiClient.interceptors.request.use(
  (config) => {
    const sessionId = getSessionId();
    if (sessionId) {
      // 요청 헤더에 sessionId 추가
      config.headers["Authorization"] = `Bearer ${sessionId}`;

      // 또는 요청 body에 sessionId 추가 (API 스펙에 따라)
      if (config.data && typeof config.data === "object") {
        config.data.sessionId = sessionId;
      }
    }

    console.log("API 요청:", {
      url: config.url,
      method: config.method,
      hasSessionId: !!sessionId,
      headers: config.headers,
    });

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터: 세션 만료 처리
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 401 Unauthorized 응답 시 세션 만료 처리
    if (error.response?.status === 401) {
      console.log("세션 만료됨, 로그아웃 처리");
      // 필요시 로그아웃 처리 또는 로그인 페이지로 리다이렉트
      // clearSession();
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
