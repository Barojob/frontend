import { ensure } from "../utils/assert";

export const configs = {
  KAKAO_MAP_API_KEY: ensure(
    import.meta.env.VITE_KAKAO_MAP_API_KEY,
    "KAKAO_MAP_API_KEY is not set",
  ),
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  DEEP_LINK_SCHEME: import.meta.env.VITE_DEEP_LINK_SCHEME || "barojob",
  DEEP_LINK_HOST: import.meta.env.VITE_DEEP_LINK_HOST || "com.barojob.app",
  APP_NAME: import.meta.env.VITE_APP_NAME || "인력특공대",
};
