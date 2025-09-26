import { useAuth } from "@/hooks/useAuth";
import { useCheckUser } from "@/hooks/useCheckUser";
import { useSendLogin } from "@/hooks/useSendLogin";
import { useState } from "react";

export const useLoginFlow = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [timer, setTimer] = useState(300);

  const { mutateAsync: checkUserAsync, isPending: isCheckingUser } =
    useCheckUser();
  const { mutateAsync: sendLoginAsync, isPending: isSendingLogin } =
    useSendLogin();
  const { signIn, isSigningIn } = useAuth();

  return {
    phoneNumber,
    setPhoneNumber,
    verificationSent,
    setVerificationSent,
    verificationCode,
    setVerificationCode,
    timer,
    setTimer,
    userRole,
    setUserRole,
    checkUserAsync,
    sendLoginAsync,
    signIn,
    isCheckingUser,
    isSendingLogin,
    isSigningIn,
    isLoading: isCheckingUser || isSendingLogin || isSigningIn,
  };
};
