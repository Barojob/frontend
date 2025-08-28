import { SignupContext } from "@/providers/SignupProvider";
import { assert } from "@/utils/assert";
import { useContext } from "react";

const useSignupContext = () => {
  const context = useContext(SignupContext);
  assert(!!context, "useSignupContext must be used within a SignupProvider");

  return context;
};

export default useSignupContext;
