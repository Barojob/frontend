import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import HomeIntroCarousel from "../components/HomeIntroCarousel";

const IntroPage: React.FC = () => {
  return (
    <div className="flex h-dvh flex-col justify-between gap-y-5 pb-4">
      <HomeIntroCarousel className="flex-1" />

      <section>
        <div className="flex justify-center gap-x-3.5">
          <Link className="flex-1" to="/login">
            <Button theme="primary" size="md" block>
              로그인
            </Button>
          </Link>

          <Link className="flex-1" to="/signup">
            <Button theme="secondary" size="md" block>
              회원가입
            </Button>
          </Link>
        </div>

        <div className="space-x-2 pt-5 text-center text-sm">
          <span>계정이 기억나지 않나요?</span>
          {/* TODO: implement this route */}
          <Link to="/find-account" className="border-b border-black font-bold">
            계정 찾기
          </Link>
        </div>
      </section>
    </div>
  );
};

export default IntroPage;
