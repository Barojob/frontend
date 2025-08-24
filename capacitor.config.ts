import type { CapacitorConfig } from "@capacitor/cli";
import dotenv from "dotenv";

dotenv.config();

const config: CapacitorConfig = {
  appId: process.env.VITE_DEEP_LINK_HOST,
  appName: process.env.VITE_APP_NAME,
  webDir: "dist",
  ios: {
    // iOS 네이티브 스와이프 뒤로가기 활성화
    allowsLinkPreview: false,
    backgroundColor: "#ffffff",
    // 스와이프 뒤로가기 활성화
    preferredContentMode: "mobile",
  },
  server: {
    // 개발 중 live reload를 위한 설정
    androidScheme: "https",
    iosScheme: "https",
    cleartext: true,
  },
  plugins: {
    // iOS의 네이티브 스와이프 뒤로가기를 위한 설정
    App: {
      launchAutoHide: true,
    },
  },
};

export default config;
