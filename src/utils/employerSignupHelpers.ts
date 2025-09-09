import { EmployerState, PersonalInfoState } from "@/types/signup";

export type EmployerSignUpData = {
  personalInfo: PersonalInfoState;
  employerInfo: EmployerState;
  bankName: string;
  accountNumber: string;
};

export const createEmployerSignUpRequest = ({
  personalInfo,
  employerInfo,
  bankName,
  accountNumber,
}: EmployerSignUpData) => {
  return {
    email: employerInfo.email,
    phoneNumber: personalInfo.phoneNumber,
    name: personalInfo.name,
    title: employerInfo.position,
    businessRegistrationNumber: employerInfo.businessNumber,
    birthDate: personalInfo.birthDate,
    bankName,
    accountNumber,
  };
};
