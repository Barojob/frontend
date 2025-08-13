import React from "react";
import { SignupContext } from "../providers/SignupProvider";
import { assert } from "../utils/assert";

const useSignupContext = () => {
  const context = React.useContext(SignupContext);
  assert(!!context, "useSignupContext must be used within a SignupProvider");

  return context;
};

export default useSignupContext;
