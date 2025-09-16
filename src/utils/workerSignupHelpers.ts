import { PersonalInfoState } from "@/types/signup";
import { formatBirthDate } from "@/utils/formatters";

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
    birthDate: formatBirthDate(personalInfo.birthDate),
  };
};
