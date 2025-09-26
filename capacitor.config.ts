import type { CapacitorConfig } from "@capacitor/cli";
import dotenv from "dotenv";

dotenv.config();

const config: CapacitorConfig = {
  appId: process.env.VITE_DEEP_LINK_HOST,
  appName: process.env.VITE_APP_NAME,
  webDir: "dist",
  ios: {
    allowsLinkPreview: false,
    backgroundColor: "#ffffff",
    preferredContentMode: "mobile",
  },
  server: {
    // 개발 중 live reload를 위한 설정
    androidScheme: "https",
    iosScheme: "https",
    cleartext: true,
  },
  plugins: {
    App: {
      launchAutoHide: true,
    },
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
