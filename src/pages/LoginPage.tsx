import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import NavigationHeader from "@/components/NavigationHeader";
import { useAuth } from "@/hooks/useAuth";
import { useSendLogin } from "@/hooks/useSendLogin";
import WarningIcon from "@/svgs/WarningIcon";
import { cn } from "@/utils/classname";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  className?: string;
};

const LoginPage: React.FC<Props> = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [timer, setTimer] = useState(300);
  const [verificationCode, setVerificationCode] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  // API 훅들
  const { mutateAsync: sendLoginAsync, isPending: isSendingLogin } =
    useSendLogin();
  const { signIn, isSigningIn } = useAuth();

  // 컴포넌트 마운트 시 최근 회원가입한 번호가 있다면 자동 입력
  React.useEffect(() => {
    const recentSignupPhone = localStorage.getItem("recentSignupPhone");
    const recentSignupUserType = localStorage.getItem("recentSignupUserType");

    if (recentSignupPhone) {
      setPhoneNumber(recentSignupPhone);
      console.log(
        "최근 회원가입한 번호 자동 입력:",
        recentSignupPhone,
        "타입:",
        recentSignupUserType,
      );

      // 사용한 후 localStorage에서 제거
      localStorage.removeItem("recentSignupPhone");
      localStorage.removeItem("recentSignupUserType");
    }
  }, []);

  const handleBack = () => {
    if (verificationSent) {
      // 인증 상태를 초기화하여 휴대폰 번호 입력 화면으로 돌아감
      setVerificationSent(false);
      setVerificationCode("");
      setTimer(300);
    } else {
      // 초기 상태에서는 홈으로 이동
      navigate("/");
    }
  };

  useEffect(() => {
    let countdown: ReturnType<typeof setInterval>;
    if (verificationSent && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setVerificationSent(false);
    }
    return () => clearInterval(countdown);
  }, [verificationSent, timer]);

  const handleLogin = async () => {
    if (!verificationSent) {
      // 첫 번째 클릭: 사용자 확인 및 인증번호 발송
      if (phoneNumber.length !== 13) return;

      console.log("로그인 시도:", phoneNumber);

      try {
        // 1단계: 로그인용 인증번호 발송
        console.log("인증번호 발송 중...");
        const loginResult = await sendLoginAsync({ phoneNumber });
        console.log("인증번호 발송 결과:", loginResult);

        // 인증번호 발송이 성공했다면 사용자가 존재한다는 의미
        setVerificationSent(true);
        setTimer(120);
        setVerificationCode("");
      } catch (error) {
        console.error("로그인 처리 중 오류:", error);
        setErrorMessage("로그인 중 오류가 발생했습니다.");
        setShowErrorModal(true);
      }
    } else {
      // 두 번째 클릭: 로그인 처리 (인증번호 확인)
      if (verificationCode.length >= 4) {
        try {
          // EMPLOYER로 먼저 시도 (일반적으로 구인자가 더 적을 것으로 예상)
          console.log("EMPLOYER로 로그인 시도...");
          try {
            await signIn({
              verificationCode,
              phoneNumber,
              role: "EMPLOYER",
            });
            console.log("EMPLOYER 로그인 성공");
            navigate("/login-success");
            return;
          } catch (error) {
            console.log("EMPLOYER 로그인 실패, WORKER로 시도...");
          }

          // EMPLOYER 실패 시 WORKER로 시도
          await signIn({
            verificationCode,
            phoneNumber,
            role: "WORKER",
          });
          console.log("WORKER 로그인 성공");
          navigate("/login-success");
        } catch (error) {
          console.error("모든 역할로 로그인 실패:", error);
          setErrorMessage("인증번호가 올바르지 않습니다.");
          setShowErrorModal(true);
        }
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const isPhoneNumberValid = phoneNumber.length === 13;
  const isVerificationCodeValid = verificationCode.length >= 4;
  const isLoading = isSendingLogin || isSigningIn;
  const isLoginButtonEnabled = !verificationSent
    ? isPhoneNumberValid && !isLoading
    : isVerificationCodeValid && !isLoading;

  // 입력 필드가 focus될 때 자동 스크롤
  useEffect(() => {
    const handleFocus = () => {
      setTimeout(() => {
        inputRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center", // 중앙으로 스크롤
        });
      }, 300); // 약간의 딜레이를 주어 부드럽게 스크롤
    };

    // inputRef.current가 null이 아닐 때만 이벤트 리스너 추가
    const currentInput = inputRef.current;
    if (currentInput) {
      currentInput.addEventListener("focus", handleFocus);
    }

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      if (currentInput) {
        currentInput.removeEventListener("focus", handleFocus);
      }
    };
  }, [verificationSent]); // verificationSent가 바뀔 때 리스너 다시 설정 (inputRef가 나타날 때)

  return (
    <div className="safe-area-top safe-area-bottom flex w-full flex-col justify-start px-6">
      {/* NavigationHeader는 그대로 유지 */}
      <NavigationHeader
        title={!verificationSent ? "로그인" : "휴대폰 인증"}
        onBack={handleBack}
        showBackButton={verificationSent}
      />

      <div className={cn("flex-1")}>
        <div className="mt-6 text-2xl font-bold text-neutral-600">
          {!verificationSent ? (
            <>
              휴대폰 번호로
              <br />
              로그인해주세요.
            </>
          ) : (
            <>
              문자로 온
              <br />
              인증번호를 입력해주세요.
            </>
          )}
        </div>

        {/* 휴대폰 번호 입력란 - 인증번호 입력 단계에서는 숨김 */}
        {!verificationSent && (
          <div className="mt-14">
            <div className="text-sm font-semibold text-neutral-600">
              휴대폰 번호 <span className="text-red-400">*</span>
            </div>
            <Input
              type="tel"
              placeholder=" - 없이 숫자만 입력"
              value={phoneNumber}
              onValueChange={setPhoneNumber}
              rounded={"lg"}
              className="mt-1 border border-gray-100 bg-gray-100 font-normal placeholder-gray-500 focus:border-gray-100"
            />
          </div>
        )}

        {/* 인증번호 입력 단계 */}
        {verificationSent && (
          <div className="mt-14 flex flex-col items-center">
            {/* 4자리 인증번호 입력칸 */}
            <div className="mb-3 flex justify-center gap-3">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={verificationCode[index] || ""}
                  onChange={(e) => {
                    const newCode = verificationCode.split("");
                    newCode[index] = e.target.value;
                    const updatedCode = newCode.join("");
                    setVerificationCode(updatedCode);

                    // 자동으로 다음 칸으로 이동
                    if (e.target.value && index < 3) {
                      const target = e.target as HTMLInputElement;
                      const nextInput = target.parentElement?.children[
                        index + 1
                      ] as HTMLInputElement;
                      nextInput?.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    // 백스페이스 시 이전 칸으로 이동
                    if (
                      e.key === "Backspace" &&
                      !verificationCode[index] &&
                      index > 0
                    ) {
                      const target = e.target as HTMLInputElement;
                      const prevInput = target.parentElement?.children[
                        index - 1
                      ] as HTMLInputElement;
                      prevInput?.focus();
                    }
                  }}
                  className="w-17 h-19 rounded-[0.625rem] border border-gray-100 bg-gray-100 text-center text-2xl font-bold focus:border-blue-500 focus:outline-none"
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              ))}
            </div>

            {/* 인증번호 다시 받기 - 작은 텍스트 형식 */}
            <button
              onClick={async () => {
                try {
                  console.log("인증번호 재발송 중...");
                  await sendLoginAsync({ phoneNumber });
                  setTimer(120);
                  setVerificationCode("");
                } catch (error) {
                  console.error("인증번호 재발송 실패:", error);
                  setErrorMessage("인증번호 재발송에 실패했습니다.");
                  setShowErrorModal(true);
                }
              }}
              className="text-xs text-neutral-500 underline"
            >
              인증번호 다시 받기 ({formatTime(timer)})
            </button>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-10 w-full bg-white px-6 pb-10 pt-4 shadow-md">
        <Button
          size="md"
          theme="primary"
          onClick={handleLogin}
          disabled={!isLoginButtonEnabled}
          loading={isLoading}
          className={cn(
            "w-full rounded-[0.625rem] border text-base font-normal transition-colors",
            isLoginButtonEnabled
              ? "border-blue-600 bg-blue-600 text-white"
              : "cursor-not-allowed border-blue-600 bg-blue-600 text-white opacity-30",
          )}
        >
          {!verificationSent ? "로그인" : "다음 단계"}
        </Button>
      </div>

      {/* 에러 모달 */}
      <Modal
        visible={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        className="flex flex-col items-center px-5 py-8"
      >
        <WarningIcon />

        <div className="mb-4 text-center text-[1.375rem] font-bold text-neutral-600">
          앗!
          <br />
          오류가 발생했어요
        </div>

        <div className="mb-4 text-center text-xs text-neutral-400">
          {errorMessage || "다시 시도해주세요."}
        </div>

        <Button
          size="md"
          theme="primary"
          onClick={() => {
            setShowErrorModal(false);
            setVerificationCode("");
            setErrorMessage("");
          }}
          className="w-fit rounded-[0.625rem] border-blue-600 bg-violet-200 px-5 text-sm text-blue-600"
        >
          확인
        </Button>
      </Modal>
    </div>
  );
};

export default LoginPage;
