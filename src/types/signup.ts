import { CheckItem } from "@/components/SignUpTerms";
import { Nullable } from "@/types/misc";
import { type UserType } from "@/types/user";
import React from "react";

export enum SignupStep {
  USER_TYPE_SELECTION,
  TERMS,
  PERSONAL_INFO,
  PHONE_VERIFICATION,
  PHONE_VERIFICATION_SUCCESS,
  ALREADY_REGISTERED,
  EMPLOYER_INFO,
  EMPLOYER_ACCOUNT,
  WORKER_INFO,
  WORKER_EXPERIENCE,
  WORKER_LICENSE,
  WORKER_ACCOUNT,
  PROFILE_SETUP,
  SIGNUP_SUCCESS,
}

export enum Carrier {
  KT = "KT",
  LG_U_PLUS = "LG U+",
  SKT = "SKT",
  KT_ALIM = "KT 알뜰폰",
  LG_U_PLUS_ALIM = "LG U+ 알뜰폰",
  SKT_ALIM = "SKT 알뜰폰",
}

export type UserTypeState = Nullable<UserType>;

export type PersonalInfoState = {
  name: string;
  birthDate: string;
  phoneNumber: string;
  carrier: Nullable<Carrier>;
};

export type VerificationState = {
  code: string;
  requestedAt: Nullable<Date>;
  verifiedAt: Nullable<Date>;
};

export type EmployerState = {
  companyName: string;
  position: string;
  email: string;
  businessNumber: string;
};

export type WorkerExperienceState = {
  experienceCategories: string[];
};

export type SignUpContextType = {
  termsState: [CheckItem[], React.Dispatch<React.SetStateAction<CheckItem[]>>];
  stepState: [SignupStep, React.Dispatch<React.SetStateAction<SignupStep>>];
  personalInfoState: [
    PersonalInfoState,
    React.Dispatch<React.SetStateAction<PersonalInfoState>>,
  ];
  verificationState: [
    VerificationState,
    React.Dispatch<React.SetStateAction<VerificationState>>,
  ];
  signUpKeyState: [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>,
  ];
  userTypeState: [
    UserTypeState,
    React.Dispatch<React.SetStateAction<UserTypeState>>,
  ];
  employerInfoState: [
    EmployerState,
    React.Dispatch<React.SetStateAction<EmployerState>>,
  ];
  workerExperienceState: [
    WorkerExperienceState,
    React.Dispatch<React.SetStateAction<WorkerExperienceState>>,
  ];
};
