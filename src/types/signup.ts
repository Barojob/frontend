import { CheckItem } from "@/pages/Signup/SignUpTerms";
import { Nullable } from "@/types/misc";
import React from "react";

export enum SignupStep {
  TERMS,
  PERSONAL_INFO,
  PHONE_VERIFICATION,
  PHONE_VERIFICATION_SUCCESS,
  USER_TYPE_SELECTION,
  ALREADY_REGISTERED,
  EMPLOYER_INFO,
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

export type PersonalInfo = {
  name: string;
  birthDate: string;
  phoneNumber: string;
  carrier: Nullable<Carrier>;
};

export type VerificationInfo = {
  code: string;
  requestedAt: Nullable<Date>;
  verifiedAt: Nullable<Date>;
};

export type UserTypeInfo = {
  userType: "employer" | "worker" | "";
};

export type EmployerInfo = {
  position: string;
  email: string;
  businessNumber: string;
};

export type SignUpContextType = {
  termsState: [CheckItem[], React.Dispatch<React.SetStateAction<CheckItem[]>>];
  stepState: [SignupStep, React.Dispatch<React.SetStateAction<SignupStep>>];
  personalInfoState: [
    PersonalInfo,
    React.Dispatch<React.SetStateAction<PersonalInfo>>,
  ];
  verificationState: [
    VerificationInfo,
    React.Dispatch<React.SetStateAction<VerificationInfo>>,
  ];
  userTypeState: [
    UserTypeInfo,
    React.Dispatch<React.SetStateAction<UserTypeInfo>>,
  ];
  employerInfoState: [
    EmployerInfo,
    React.Dispatch<React.SetStateAction<EmployerInfo>>,
  ];
};
