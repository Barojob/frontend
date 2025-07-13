import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button/Button";
import HomeIntroCarousel from "../components/HomeIntroCarousel";

const IntroPage: React.FC = () => {
  return (
    <div className="flex h-dvh flex-col justify-between gap-y-5 pb-4">
      <HomeIntroCarousel className="flex-1" />

      <section>
        <div className="flex justify-center gap-x-4">
          <Link to="/login">
            <Button variant="primary" size="md">
              로그인
            </Button>
          </Link>

          <Link to="/signup">
            <Button variant="secondary" size="md">
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
