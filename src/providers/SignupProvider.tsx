import TERMS_FIXTURE from "@/fixtures/terms.json";
import { CheckItem } from "@/pages/Signup/SignUpTerms";
import { Nullable } from "@/types/misc";
import {
  EmployerState,
  PersonalInfoState,
  SignUpContextType,
  SignupStep,
  VerificationState,
} from "@/types/signup";
import { type UserType } from "@/types/user";
import React, { PropsWithChildren } from "react";

export const SignupContext =
  React.createContext<Nullable<SignUpContextType>>(null);

const SignupProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const userTypeState = React.useState<UserType>(null);
  const termsState = React.useState<CheckItem[]>(TERMS_FIXTURE);
  const stepState = React.useState<SignupStep>(SignupStep.TERMS);
  const personalInfoState = React.useState<PersonalInfoState>({
    name: "",
    birthDate: "",
    phoneNumber: "",
    carrier: null,
  });
  const verificationState = React.useState<VerificationState>({
    code: "",
    requestedAt: null,
    verifiedAt: null,
  });

  const employerInfoState = React.useState<EmployerState>({
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
