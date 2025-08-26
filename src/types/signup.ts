import React from "react";
import { CheckItem } from "../pages/SignUp/SignUpTerms";

export enum SignupStep {
  TERMS,
  PERSONAL_INFO, // 인적사항 입력 (이름, 생년월일, 휴대폰번호, 통신사)
  PHONE_VERIFICATION, // 인증번호 입력
  PHONE_VERIFICATION_SUCCESS,
  USER_TYPE_SELECTION,
  ALREADY_REGISTERED,
  EMPLOYER_INFO,
  WORKER_INFO,
  WORKER_EXPERIENCE,
  WORKER_LICENSE, // 이수증 등록
  WORKER_ACCOUNT, // 계좌 등록
  PROFILE_SETUP,
  SIGNUP_SUCCESS, // 회원가입 완료
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
