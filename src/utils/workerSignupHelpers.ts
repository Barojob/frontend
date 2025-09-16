import { PersonalInfoState } from "@/types/signup";

export type WorkerSignUpData = {
  personalInfo: PersonalInfoState;
  bankName: string;
  accountNumber: string;
};

export const createWorkerSignUpRequest = ({
  personalInfo,
  bankName,
  accountNumber,
}: WorkerSignUpData) => {
  return {
    phoneNumber: personalInfo.phoneNumber,
    name: personalInfo.name,
    bankName,
    AccountNumber: accountNumber,
    birthDate: personalInfo.birthDate,
  };
};
