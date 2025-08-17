import type { CapacitorConfig } from "@capacitor/cli";
import dotenv from "dotenv";

dotenv.config();

const config: CapacitorConfig = {
  appId: process.env.VITE_DEEP_LINK_HOST,
  appName: process.env.VITE_APP_NAME,
  webDir: "dist",
};

export default config;
