import { CheckItem } from "@/components/SignUpTerms";
import TERMS_FIXTURE from "@/fixtures/terms.json";
import { Nullable } from "@/types/misc";
import {
  EmployerState,
  PersonalInfoState,
  SignUpContextType,
  SignupStep,
  VerificationState,
  WorkerExperienceState,
} from "@/types/signup";
import { type UserType } from "@/types/user";
import React, { PropsWithChildren } from "react";

export const SignupContext =
  React.createContext<Nullable<SignUpContextType>>(null);

const SignupProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const userTypeState = React.useState<UserType>(null);
  const termsState = React.useState<CheckItem[]>(TERMS_FIXTURE);
  const stepState = React.useState<SignupStep>(SignupStep.USER_TYPE_SELECTION);
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
  const signUpKeyState = React.useState<string | null>(null);

  const employerInfoState = React.useState<EmployerState>({
    companyName: "",
    position: "",
    email: "",
    businessNumber: "",
  });

  const workerExperienceState = React.useState<WorkerExperienceState>({
    experienceCategories: [],
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
        workerExperienceState,
        signUpKeyState,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
};

export default SignupProvider;
