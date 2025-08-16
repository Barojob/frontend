import type { CapacitorConfig } from "@capacitor/cli";
import { configs } from "./src/configs";

const config: CapacitorConfig = {
  appId: configs.DEEP_LINK_HOST,
  appName: configs.APP_NAME,
  webDir: "dist",
};

export default config;
