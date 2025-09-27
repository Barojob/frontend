import { PersonalInfoState } from "@/types/signup";
import { formatBirthDate } from "@/utils/formatters";

// 작업명을 백엔드 Enum 값으로 매핑 (프론트엔드 작업명 → 백엔드 한국어 Enum 값)
export function mapExperienceCategoryToId(jobName: string): string {
  const jobNameMap: Record<string, string> = {
    // 보통인부 카테고리 작업들
    "보통 인부": "일반",
    신호수: "차량_지게차_신호수",
    양중: "양중경량자재",
    곰방: "곰방_경량자재",
    철거: "철거",
  };

  return jobNameMap[jobName] || "일반";
}

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
  // 한글 카테고리를 백엔드 Enum 값으로 변환
  const mappedCategories = experienceCategories.map(mapExperienceCategoryToId);

  return {
    phoneNumber: personalInfo.phoneNumber.replace(/[^0-9]/g, ""), // 하이픈 제거
    name: personalInfo.name,
    experienceCategories: mappedCategories,
    equipmentTypes,
    bankName,
    AccountNumber: accountNumber, // 백엔드와 일치하도록 대문자로 수정
    birthDate: formatBirthDate(personalInfo.birthDate),
  };
};
