/**
 * 세션 관련 유틸리티 함수들
 */

export const getSessionId = (): string | null => {
  return sessionStorage.getItem("sessionId");
};

export const setSessionId = (sessionId: string): void => {
  sessionStorage.setItem("sessionId", sessionId);
};

export const removeSessionId = (): void => {
  sessionStorage.removeItem("sessionId");
};

export const getUserType = (): string | null => {
  const userType = sessionStorage.getItem("userType");
  return userType ? JSON.parse(userType) : null;
};

export const setUserType = (userType: string): void => {
  sessionStorage.setItem("userType", JSON.stringify(userType));
};

export const removeUserType = (): void => {
  sessionStorage.removeItem("userType");
};

export const clearSession = (): void => {
  removeSessionId();
  removeUserType();
};

export const isLoggedIn = (): boolean => {
  return getSessionId() !== null;
};
