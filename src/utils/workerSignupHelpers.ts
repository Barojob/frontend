import { PersonalInfoState } from "@/types/signup";

export type WorkerSignUpData = {
  personalInfo: PersonalInfoState;
  experienceCategories: string[];
  bankName: string;
  accountNumber: string;
};

export const createWorkerSignUpRequest = ({
  personalInfo,
  experienceCategories,
  bankName,
  accountNumber,
}: WorkerSignUpData) => {
  return {
    email: "", // 근로자는 이메일 없음
    nickname: personalInfo.name, // 임시: 이름을 닉네임으로 사용
    phoneNumber: personalInfo.phoneNumber,
    name: personalInfo.name,
    experienceCategories:
      experienceCategories.length > 0 ? experienceCategories.join(",") : "일반",
    equipmentTypes: "없음", // 기본값
    bankName,
    accountNumber,
  };
};
