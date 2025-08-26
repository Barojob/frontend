import React, { PropsWithChildren } from "react";
import TERMS_FIXTURE from "../fixtures/terms.json";
import { CheckItem } from "../pages/SignUp/SignUpTerms";
import { Nullable } from "../types/misc";
import {
  EmployerInfo,
  PersonalInfo,
  SignUpContextType,
  SignupStep,
  UserTypeInfo,
  VerificationInfo,
} from "../types/signup";

export const SignupContext =
  React.createContext<Nullable<SignUpContextType>>(null);

const SignupProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const termsState = React.useState<CheckItem[]>(TERMS_FIXTURE);
  const stepState = React.useState<SignupStep>(SignupStep.TERMS);
  const personalInfoState = React.useState<PersonalInfo>({
    name: "",
    birthDate: "",
    phoneNumber: "",
    carrier: "",
  });
  const verificationState = React.useState<VerificationInfo>({
    verificationCode: "",
    verificationSent: false,
    isVerified: false,
  });
  const userTypeState = React.useState<UserTypeInfo>({
    userType: "",
  });
  const employerInfoState = React.useState<EmployerInfo>({
    position: "",
    email: "",
    businessNumber: "",
  });

  return (
    <SignupContext.Provider
      value={{
        termsState,
        stepState,
        personalInfoState,
        verificationState,
        userTypeState,
        employerInfoState,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
};

export default SignupProvider;
