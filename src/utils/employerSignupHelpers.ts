import { EmployerState, PersonalInfoState } from "@/types/signup";

export type EmployerSignUpData = {
  personalInfo: PersonalInfoState;
  employerInfo: EmployerState;
  // FIXME: 백엔드에서 고용주 계좌 정보 지원 시 추가 예정
};

export const createEmployerSignUpRequest = ({
  personalInfo,
  employerInfo,
  // FIXME: 백엔드에서 고용주 계좌 정보 지원 시 추가 예정
}: EmployerSignUpData) => {
  return {
    email: employerInfo.email,
    nickname: personalInfo.name, // 임시: 이름을 닉네임으로 사용
    phoneNumber: personalInfo.phoneNumber,
    name: personalInfo.name,
    businessName: "미입력", // TODO: EmployerState에 businessName 필드 추가 필요
    title: employerInfo.position,
    businessRegistrationNumber: employerInfo.businessNumber,
    // FIXME: 백엔드에서 고용주 계좌 정보 지원 시 추가 예정
  };
};
