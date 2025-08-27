import React from "react";
import { CheckItem } from "../components/SignUpTerms";

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

export type PersonalInfo = {
  name: string;
  birthDate: string;
  phoneNumber: string;
  carrier: string;
};

export type VerificationInfo = {
  verificationCode: string;
  verificationSent: boolean;
  isVerified: boolean;
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
