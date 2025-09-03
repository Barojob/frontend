import { EmployerState, PersonalInfoState } from "@/types/signup";

export type EmployerSignUpData = {
  personalInfo: PersonalInfoState;
  employerInfo: EmployerState;
};

export const createEmployerSignUpRequest = ({
  personalInfo,
  employerInfo,
}: EmployerSignUpData) => {
  return {
    email: employerInfo.email,
    nickname: personalInfo.name, // 임시: 이름을 닉네임으로 사용
    phoneNumber: personalInfo.phoneNumber,
    name: personalInfo.name,
    businessName: employerInfo.businessNumber,
    title: employerInfo.position,
    businessRegistrationNumber: employerInfo.businessNumber,
  };
};
