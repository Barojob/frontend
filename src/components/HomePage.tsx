import MainCarousel from "@/components/MainCarousel";
import NavBar from "@/components/NavBar";
import BrandIcon from "@/svgs/BrandIcon";
import { cn } from "@/utils/classname";
import {
  BellIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

type UserType = "worker" | "employer";

interface HomePageProps {
  userType: UserType;
}

const HomePage: React.FC<HomePageProps> = ({ userType }) => {
  const getMainButtonConfig = () => {
    if (userType === "worker") {
      return {
        text: "일자리 요청하기",
        path: "/job-post-location",
      };
    } else {
      return {
        text: "근로자 요청하기",
        path: "/job-post-location",
      };
    }
  };

  const mainButtonConfig = getMainButtonConfig();

  // 테스트용 사용자 타입 변경 함수
  const toggleUserType = () => {
    const newUserType = userType === "worker" ? "employer" : "worker";
    console.log(`🔄 사용자 타입 변경: ${userType} → ${newUserType}`);
    localStorage.setItem("userType", newUserType);
    console.log("💾 localStorage에 저장됨:", localStorage.getItem("userType"));
    window.location.reload();
  };

  return (
    <div className="bg-main-1 safe-area-top h-full px-6">
      <div className="flex items-center justify-between py-4">
        <BrandIcon className="max-w-37" />
        <BellIcon className="size-7.5 text-blue-1" />
      </div>

      <MainCarousel className="h-33 -mx-6" />

      {/* 테스트용 사용자 타입 변경 버튼 */}
      <div className="mt-3">
        <button
          onClick={toggleUserType}
          className="w-full rounded-lg bg-gray-200 py-3 text-sm font-medium text-gray-700"
        >
          🧪 현재: {userType} | {userType === "worker" ? "구인자" : "근로자"}로
          변경
        </button>
      </div>

      <div className="safe-area-top">
        <MainHeading className="mx-2" title="경기 포천시" />
        <Link to={mainButtonConfig.path}>
          <div className={cn("bg-blue-1 mt-3 h-28 rounded-2xl")}>
            <section className="flex h-full flex-col items-center justify-center">
              <div className="flex items-center gap-x-3">
                <span className="text-2xl font-bold text-white">
                  {mainButtonConfig.text}
                </span>
                <MagnifyingGlassIcon className="size-4.5 text-[#C5D6EF]" />
              </div>

              <span className="whitespace-pre-wrap text-xs font-medium">
                <span className="text-[#C5D6EF]">{`지금 찾으면 `}</span>
                <span className="text-[#FFAD9C]">3시간 뒤</span>
                <span className="text-[#C5D6EF]">에 공고를 받아요!</span>
              </span>
            </section>
          </div>
        </Link>
      </div>

      {/* 기존 디자인 섹션 카드 */}
      {/* {userType === "worker" && (
        <div className="mt-8">
          <MainHeading title="채용 공고" />
          <Link to="/job-request">
            <JobRequestCard className="mt-3" />
          </Link>
        </div>
      )} */}

      {/* {userType === "employer" && (
        <div className="mt-8">
          <MainHeading title="매칭 결과" />
          <Link to="/matching-results">
            <JobRequestCard className="mt-3" />
          </Link>
        </div>
      )} */}

      <NavBar className="fixed bottom-0 left-0 right-0" />
    </div>
  );
};

const MainHeading: React.FC<{ className?: string; title: string }> = ({
  className,
  title,
}) => {
  return (
    <div className={cn("flex items-center gap-x-1", className)}>
      <h2 className="font-['Noto_Sans_KR'] text-xl font-bold leading-tight text-[#494B4F]">
        {title}
      </h2>
      <ChevronRightIcon className="stroke-4 size-3 text-[#6B7684]" />
    </div>
  );
};

export default HomePage;
