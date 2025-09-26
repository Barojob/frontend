import { EmployerState, PersonalInfoState } from "@/types/signup";
import { formatBirthDate } from "@/utils/formatters";

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
    phoneNumber: personalInfo.phoneNumber.replace(/[^0-9]/g, ""), // 하이픈 제거
    name: personalInfo.name,
    companyName: employerInfo.companyName,
    title: employerInfo.position,
    businessRegistrationNumber: employerInfo.businessNumber,
    birthDate: formatBirthDate(personalInfo.birthDate),
    bankName,
    accountNumber,
  };
};
