import { z } from "zod";

export const userSchema = z.object({
  nickname: z.string(),
  accountType: z.enum(["worker", "employer"]),
});
export type User = z.infer<typeof userSchema>;

export interface UserResponse {
  success: boolean;
  data: User;
  message?: string;
}

export type UserType = "worker" | "employer" | null;
