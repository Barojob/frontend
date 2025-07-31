import NavBar from "@/components/NavBar";
import { BellIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";
import JobPostCard from "../components/JobPostCard";
import JobRequestCard from "../components/JobRequestCard";
import MainCarousel from "../components/MainCarousel";
import UrgentRecruitmentCard from "../components/UrgentRecruitmentCard";
import { useUserType } from "../hooks/useUserType";
import BrandIcon from "../svgs/BrandIcon";
import { cn } from "../utils/classname";

const MainPage: React.FC = () => {
  const { userType, isEmployer, isWorker, isLoading } = useUserType();

  // 로딩 중일 때 스켈레톤 UI 표시
  if (isLoading) {
    return (
      <div className="bg-main-1 h-full px-6">
        <div className="flex items-center justify-between py-6">
          <BrandIcon className="max-w-37" />
          <BellIcon className="size-7.5 text-blue-1" />
        </div>
        <div className="animate-pulse">
          <div className="h-33 -mx-6 mb-8 rounded-lg bg-gray-200"></div>
          <div className="mb-8 h-20 rounded-lg bg-gray-200"></div>
          <div className="h-30 rounded-lg bg-gray-200"></div>
        </div>
        <NavBar className="fixed bottom-0 left-0 right-0" />
      </div>
    );
  }

  return (
    <div className="bg-main-1 h-full px-6">
      <div className="flex items-center justify-between py-6">
        <BrandIcon className="max-w-37" />
        <BellIcon className="size-7.5 text-blue-1" />
      </div>

      <MainCarousel className="h-33 -mx-6" />

      {/* 근로자용 컨텐츠 */}
      {isWorker && (
        <>
          <div className="mt-8">
            <MainHeading title="경기 포천시" />
            <Link to="/job-request">
              <JobRequestCard className="mt-3" />
            </Link>
          </div>

          <div className="mt-8">
            <MainHeading title="긴급 모집중" />
            <UrgentRecruitmentCard className="h-30 mt-3" />
          </div>
        </>
      )}

      {/* 고용주용 컨텐츠 */}
      {isEmployer && (
        <>
          <div className="mt-8">
            <MainHeading title="경기 포천시" />
            <Link to="/location-selector">
              <JobPostCard className="mt-3" />
            </Link>
          </div>
        </>
      )}

      {/* 유저 타입이 없는 경우 (로그인 필요) */}
      {!userType && (
        <div className="mt-8">
          <div className="rounded-lg border border-gray-100 bg-white p-6 text-center shadow-sm">
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              로그인이 필요합니다
            </h3>
            <p className="mb-4 text-gray-600">
              더 많은 서비스를 이용하려면 로그인하세요
            </p>
            <Link
              to="/login"
              className="inline-block rounded-lg bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
            >
              로그인하기
            </Link>
          </div>
        </div>
      )}

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
