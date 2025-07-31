import { ensure } from "./assert";

export const configs = {
  KAKAO_MAP_API_KEY: ensure(
    import.meta.env.VITE_KAKAO_MAP_API_KEY,
    "KAKAO_MAP_API_KEY is not set",
  ),
  BACKEND_BASE_URL: ensure(
    import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:8080",
    "BACKEND_BASE_URL is not set",
  ),
};
