import { configs } from "@/configs/environments";
import { SECOND } from "@/utils/misc";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: configs.API_BASE_URL,
  timeout: 10 * SECOND,
});
