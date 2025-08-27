import { ensure } from "@/utils/assert";

export const apiConfig = {
  BASE_URL: ensure(
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
    "API_BASE_URL is not set",
  ),
};

export const createApiUrl = (endpoint: string): string => {
  return `${apiConfig.BASE_URL}${endpoint}`;
};
