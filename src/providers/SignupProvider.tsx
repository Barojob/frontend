import React, { PropsWithChildren } from "react";
import { CheckItem } from "../components/SignUpTerms";
import TERMS_FIXTURE from "../fixtures/terms.json";
import { Nullable } from "../types/misc";
import { SignUpContextType } from "../types/signup";

export const SignupContext =
  React.createContext<Nullable<SignUpContextType>>(null);

const SignupProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const termsState = React.useState<CheckItem[]>(TERMS_FIXTURE);

  return (
    <SignupContext.Provider
      value={{
        termsState,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
};

export default SignupProvider;
