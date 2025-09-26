import { PersonalInfoState } from "@/types/signup";
import { formatBirthDate } from "@/utils/formatters";

export type WorkerSignUpData = {
  personalInfo: PersonalInfoState;
  bankName: string;
  accountNumber: string;
  experienceCategories?: string[];
  equipmentTypes?: string[];
};

export const createWorkerSignUpRequest = ({
  personalInfo,
  bankName,
  accountNumber,
  experienceCategories = [],
  equipmentTypes = [],
}: WorkerSignUpData) => {
  return {
    phoneNumber: personalInfo.phoneNumber,
    name: personalInfo.name,
    experienceCategories,
    equipmentTypes,
    bankName,
    accountNumber, // API 스웨거에서는 accountNumber이지만 기존 코드는 AccountNumber
    birthDate: formatBirthDate(personalInfo.birthDate),
  };
};
