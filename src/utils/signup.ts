import { type Nullable } from "@/types/misc";
import { SignupStep } from "@/types/signup";

const SIGNUP_STEP_TITLES: Record<SignupStep, string> = {
  [SignupStep.TERMS]: "회원가입",
  [SignupStep.USER_TYPE_SELECTION]: "회원가입",
  [SignupStep.PERSONAL_INFO]: "휴대폰 인증",
  [SignupStep.PHONE_VERIFICATION]: "휴대폰 인증",
  [SignupStep.PHONE_VERIFICATION_SUCCESS]: "휴대폰 인증 완료",
  [SignupStep.ALREADY_REGISTERED]: "기존 회원 확인",
  [SignupStep.EMPLOYER_INFO]: "구인자 회원가입",
  [SignupStep.EMPLOYER_ACCOUNT]: "계좌 입력",
  [SignupStep.WORKER_INFO]: "근로자 정보 입력",
  [SignupStep.WORKER_EXPERIENCE]: "경력 체크",
  [SignupStep.WORKER_LICENSE]: "정보 입력",
  [SignupStep.WORKER_ACCOUNT]: "계좌 입력",
  [SignupStep.PROFILE_SETUP]: "프로필 설정",
  [SignupStep.SIGNUP_SUCCESS]: "회원가입 완료",
};

const PREVIOUS_STEP_MAP: Partial<Record<SignupStep, SignupStep>> = {
  // 새로운 플로우: 약관동의 -> 타입선택 -> 개인정보 -> 인증번호 -> 각자 정보입력 -> 계좌 -> 완료
  [SignupStep.USER_TYPE_SELECTION]: SignupStep.TERMS,
  [SignupStep.PERSONAL_INFO]: SignupStep.USER_TYPE_SELECTION,
  [SignupStep.PHONE_VERIFICATION]: SignupStep.PERSONAL_INFO,
  [SignupStep.PHONE_VERIFICATION_SUCCESS]: SignupStep.PHONE_VERIFICATION,

  // 고용주 플로우: 타입선택 -> 개인정보 -> 인증 -> 고용주정보 -> 계좌 -> 완료
  [SignupStep.EMPLOYER_INFO]: SignupStep.PHONE_VERIFICATION,
  [SignupStep.EMPLOYER_ACCOUNT]: SignupStep.EMPLOYER_INFO, // 고용주의 계좌 등록

  // 근로자 플로우: 타입선택 -> 개인정보 -> 인증 -> 경력체크 -> 이수증 -> 계좌 -> 완료
  [SignupStep.WORKER_EXPERIENCE]: SignupStep.PHONE_VERIFICATION,
  [SignupStep.WORKER_LICENSE]: SignupStep.WORKER_EXPERIENCE,
  [SignupStep.WORKER_ACCOUNT]: SignupStep.WORKER_LICENSE, // 근로자의 계좌 등록

  // 기타
  [SignupStep.ALREADY_REGISTERED]: SignupStep.USER_TYPE_SELECTION,
  [SignupStep.WORKER_INFO]: SignupStep.USER_TYPE_SELECTION,
  [SignupStep.PROFILE_SETUP]: SignupStep.WORKER_EXPERIENCE,
};

export const getSignupStepTitle = (step: SignupStep): string => {
  return SIGNUP_STEP_TITLES[step];
};

export const getPreviousSignupStep = (
  currentStep: SignupStep,
): Nullable<SignupStep> => {
  return PREVIOUS_STEP_MAP[currentStep] ?? null;
};
