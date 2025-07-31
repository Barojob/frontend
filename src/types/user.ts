export interface User {
  email: string;
  nickname: string;
}

export interface UserResponse {
  success: boolean;
  data: User;
  message?: string;
}

export type UserType = "worker" | "employer" | null;
