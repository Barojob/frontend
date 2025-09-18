import Button from "@/components/Button";
import JobRequestCard from "@/components/JobRequestCard";
import MainCarousel from "@/components/MainCarousel";
import NavBar from "@/components/NavBar";
import UrgentRecruitmentCard from "@/components/UrgentRecruitmentCard";
import AlertIcon from "@/svgs/AlertIcon";
import BrandIcon from "@/svgs/BrandIcon";
import { cn } from "@/utils/classname";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

const MainPage: React.FC = () => {
  return (
    <div className="bg-main-1 safe-area-top safe-area-bottom h-full">
      {/* 고정 헤더 */}
      <div className="safe-area-top bg-main-1 fixed left-0 right-0 top-0 z-20 px-6 backdrop-blur-sm">
        <div className="flex items-center justify-between py-6">
          <BrandIcon className="max-w-37" />
          <AlertIcon isAlert={true} />
        </div>
      </div>

      {/* 스크롤 가능한 콘텐츠 영역 */}
      <div className="px-6 pb-20 pt-20">
        <MainCarousel className="h-33 -mx-6" />

        {/* 테스트용 Intro 페이지 이동 버튼 */}
        <div className="mt-6">
          <Link to="/intro">
            <Button theme="primary" size="sm" block>
              🧪 테스트: Intro 페이지로 이동
            </Button>
          </Link>
        </div>

        <div className="mt-6">
          <Link to="/worker-detail">
            <Button theme="primary" size="sm" block>
              🧪 테스트: 출퇴근 범위 설정 페이지로 이동
            </Button>
          </Link>
        </div>

        <div className="mt-8">
          <MainHeading title="경기 포천시" />
          <Link to="/job-request">
            <JobRequestCard className="mt-3" />
          </Link>
        </div>

        <div className="mt-8">
          <MainHeading title="채용 공고" />
          <Link to="/job-post-location">
            <JobRequestCard className="mt-3" />
          </Link>
        </div>

        <div className="mt-8">
          <MainHeading title="긴급 모집중" />
          <UrgentRecruitmentCard className="h-30 mt-3" />
        </div>
      </div>

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
      <h2 className="font-bold text-[#494B4F]">{title}</h2>
      <ChevronRightIcon className="stroke-4 size-3 text-[#6B7684]" />
    </div>
  );
};

export default MainPage;
