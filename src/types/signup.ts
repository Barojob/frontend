import { CheckItem } from "@/components/SignUpTerms";
import { Nullable } from "@/types/misc";
import { type UserType } from "@/types/user";
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
  position: string;
  email: string;
  businessNumber: string;
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
  userTypeState: [
    UserTypeState,
    React.Dispatch<React.SetStateAction<UserTypeState>>,
  ];
  employerInfoState: [
    EmployerState,
    React.Dispatch<React.SetStateAction<EmployerState>>,
  ];
};
