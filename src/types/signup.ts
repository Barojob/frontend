import React from "react";
import { CheckItem } from "../components/SignUpTerms";

export enum SignupStep {
  TERMS,
  PHONE_VERIFICATION,
  PHONE_VERIFICATION_SUCCESS,
  USER_TYPE_SELECTION,
  ALREADY_REGISTERED,
  EMPLOYER_INFO,
  WORKER_INFO,
  WORKER_EXPERIENCE,
  PROFILE_SETUP,
}

export type SignUpContextType = {
  termsState: [CheckItem[], React.Dispatch<React.SetStateAction<CheckItem[]>>];
};
