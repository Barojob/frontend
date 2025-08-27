import Button from "@/components/Button";
import IntroIcon from "@/svgs/IntroIcon";
import React from "react";
import { Link } from "react-router-dom";

const IntroPage: React.FC = () => {
  return (
    <div className="bg-blue-1 flex h-dvh flex-col">
      <div className="flex flex-1 items-center justify-center px-6 pt-8">
        <IntroIcon className="max-w-51.5 md:max-w-90 w-full" />
      </div>

      <section className="pb-11.5 px-6">
        <p className="whitespace-pre-line text-center text-2xl font-bold text-white">
          {`가까운 일자리,\n인력특공대로 1분 안에`}
        </p>

        <div className="max-w-100 mt-19.5 mx-auto flex justify-center gap-x-3.5">
          <Link className="flex-1" to="/login">
            <Button theme="tertiary" size="md" block>
              로그인
            </Button>
          </Link>

          <Link className="flex-1" to="/signup">
            <Button theme="secondary" size="md" block>
              회원가입
            </Button>
          </Link>
        </div>

        <div className="mt-5 space-x-2 text-center text-sm text-white">
          <span className="font-medium">계정이 기억나지 않나요?</span>
          {/* TODO: implement this route */}
          <Link className="font-bold underline" to="/find-account">
            계정 찾기
          </Link>
        </div>
      </section>
    </div>
  );
};

export default IntroPage;
